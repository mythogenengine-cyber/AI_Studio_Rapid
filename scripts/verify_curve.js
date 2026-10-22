// Optimization & verification script for WIR 2026 curve
function getIncomeAtPercentile(p, spline, key = 'incomeEurPpp') {
  if (p <= spline[0].percentile) return spline[0][key];
  if (p >= spline[spline.length - 1].percentile) {
    const last = spline[spline.length - 1];
    const prev = spline[spline.length - 2];
    const alpha = 1.6;
    const tailPercent = 100 - last.percentile;
    const currentTail = 100 - p;
    if (currentTail <= 0) return last[key];
    return last[key] * Math.pow(tailPercent / currentTail, 1 / alpha);
  }

  for (let i = 0; i < spline.length - 1; i++) {
    const k1 = spline[i];
    const k2 = spline[i + 1];
    if (p >= k1.percentile && p <= k2.percentile) {
      if (k1[key] <= 0) {
        const frac = (p - k1.percentile) / (k2.percentile - k1.percentile);
        return k1[key] + frac * (k2[key] - k1[key]);
      }
      const logV1 = Math.log(k1[key]);
      const logV2 = Math.log(k2[key]);
      const frac = (p - k1.percentile) / (k2.percentile - k1.percentile);
      const logV = logV1 + frac * (logV2 - logV1);
      return Math.exp(logV);
    }
  }
  return 0;
}

function evaluateCurve(spline) {
  const N = 100000;
  const maxP = 99.99; // exclude above 99.99 as instructed
  const dp = maxP / N;
  let totalIncome = 0;
  let bottom50Income = 0;
  let top10Income = 0;
  let top1Income = 0;

  for (let i = 0; i < N; i++) {
    const p = (i + 0.5) * dp;
    const inc = getIncomeAtPercentile(p, spline);
    totalIncome += inc * dp;
    if (p < 50) {
      bottom50Income += inc * dp;
    }
    if (p >= 90) {
      top10Income += inc * dp;
    }
    if (p >= 99) {
      top1Income += inc * dp;
    }
  }

  const avgBottom50 = bottom50Income / 50;
  const avgTop10 = top10Income / 10;
  const avgOverall = totalIncome / maxP;
  const p50 = getIncomeAtPercentile(50, spline);
  const bottom50Share = (bottom50Income / totalIncome) * 100;
  const top10Share = (top10Income / totalIncome) * 100;
  const top1Share = (top1Income / totalIncome) * 100;

  return {
    avgBottom50,
    p50,
    avgTop10,
    top10Share,
    bottom50Share,
    top1Share,
    avgOverall,
  };
}

// Target specifications from user:
// (a) Strictly monotonic increasing
// (b) Lowest 50% average income ≈ €5,100 (±5%, i.e., 4,845 - 5,355)
// (c) Top 10% share ≈ 53%, Bottom 50% share ≈ 8%
// (d) Top 10% average income ≈ €159,300
// (e) p90 = 65,500, p99 = 250,300 fixed
const candidateSpline = [
  { percentile: 0.0, incomeEurPpp: 0 },
  { percentile: 1.0, incomeEurPpp: 320 },
  { percentile: 5.0, incomeEurPpp: 850 },
  { percentile: 10.0, incomeEurPpp: 1450 },
  { percentile: 20.0, incomeEurPpp: 2500 },
  { percentile: 30.0, incomeEurPpp: 3800 },
  { percentile: 40.0, incomeEurPpp: 5500 },
  { percentile: 50.0, incomeEurPpp: 7950 },
  { percentile: 60.0, incomeEurPpp: 12200 },
  { percentile: 70.0, incomeEurPpp: 19500 },
  { percentile: 75.0, incomeEurPpp: 25500 },
  { percentile: 80.0, incomeEurPpp: 34500 },
  { percentile: 85.0, incomeEurPpp: 47500 },
  { percentile: 90.0, incomeEurPpp: 65500 }, // WIR 2026 fixed
  { percentile: 92.0, incomeEurPpp: 85000 },
  { percentile: 95.0, incomeEurPpp: 128000 },
  { percentile: 97.0, incomeEurPpp: 172000 },
  { percentile: 98.0, incomeEurPpp: 208000 },
  { percentile: 99.0, incomeEurPpp: 250300 }, // WIR 2026 fixed
  { percentile: 99.5, incomeEurPpp: 420000 },
  { percentile: 99.9, incomeEurPpp: 880000 },
  { percentile: 99.99, incomeEurPpp: 2850000 },
  { percentile: 100.0, incomeEurPpp: 50000000 },
];

console.log(JSON.stringify(evaluateCurve(candidateSpline), null, 2));
