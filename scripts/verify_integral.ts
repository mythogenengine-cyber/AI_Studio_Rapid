import { GLOBAL_INCOME_SPLINE_PPP } from '../src/data/economicData';

// Log-linear interpolation
function getIncomeAtP(p: number, spline: Array<{ percentile: number; incomeEurPpp: number }>): number {
  if (p <= 0) return 0;
  if (p >= spline[spline.length - 1].percentile) {
    return spline[spline.length - 1].incomeEurPpp;
  }
  for (let i = 0; i < spline.length - 1; i++) {
    const k1 = spline[i];
    const k2 = spline[i + 1];
    if (p >= k1.percentile && p <= k2.percentile) {
      if (k1.incomeEurPpp <= 0) {
        const frac = (p - k1.percentile) / (k2.percentile - k1.percentile);
        return k1.incomeEurPpp + frac * (k2.incomeEurPpp - k1.incomeEurPpp);
      }
      const frac = (p - k1.percentile) / (k2.percentile - k1.percentile);
      const logV1 = Math.log(k1.incomeEurPpp);
      const logV2 = Math.log(k2.incomeEurPpp);
      return Math.exp(logV1 + frac * (logV2 - logV1));
    }
  }
  return 0;
}

const N = 100000;
const pMax = 99.99; // 排除 p99.99 以上
const dp = pMax / N;

let sumTotal = 0;
let sumBottom50 = 0;
let countBottom50 = 0;
let sumTop10 = 0;
let countTop10 = 0;
let sumTop1 = 0;
let countTop1 = 0;

for (let i = 0; i < N; i++) {
  const p = (i + 0.5) * dp;
  const inc = getIncomeAtP(p, GLOBAL_INCOME_SPLINE_PPP);
  sumTotal += inc;
  if (p <= 50) {
    sumBottom50 += inc;
    countBottom50++;
  }
  if (p >= 90) {
    sumTop10 += inc;
    countTop10++;
  }
  if (p >= 99) {
    sumTop1 += inc;
    countTop1++;
  }
}

const avgOverall = sumTotal / N;
const avgBottom50 = sumBottom50 / countBottom50;
const avgTop10 = sumTop10 / countTop10;
const p50Value = getIncomeAtP(50, GLOBAL_INCOME_SPLINE_PPP);

const bottom50Share = (sumBottom50 / sumTotal) * 100;
const top10Share = (sumTop10 / sumTotal) * 100;
const top1Share = (sumTop1 / sumTotal) * 100;

console.log('=== 10 萬等份數值積分檢驗結果 (排除 p99.99 以上) ===');
console.log(`- 最低 50% 平均收入: €${avgBottom50.toFixed(2)} (目標約 €5,100 ±5%，誤差: ${(((avgBottom50 - 5100)/5100)*100).toFixed(2)}%)`);
console.log(`- p50 數值: €${p50Value.toFixed(2)}`);
console.log(`- 前 10% 的平均收入: €${avgTop10.toFixed(2)} (目標約 €159,300，誤差: ${(((avgTop10 - 159300)/159300)*100).toFixed(2)}%)`);
console.log(`- 前 10% 收入佔比: ${top10Share.toFixed(2)}% (目標約 53%)`);
console.log(`- 最低 50% 收入佔比: ${bottom50Share.toFixed(2)}% (目標約 8%)`);
console.log(`- 前 1% 收入佔比: ${top1Share.toFixed(2)}% (約 16%~19%)`);
console.log(`- 全球平均收入（排除 p99.99 以上）: €${avgOverall.toFixed(2)}`);
