import { calculateRanking } from '../src/utils/calculator';

const scenarios = [
  {
    name: '1. 香港，月薪 22,000 港元，單身（收入模式，PPP）',
    params: {
      amount: 22000,
      currencyCode: 'HKD',
      countryCode: 'HK',
      period: 'month' as const,
      adults: 1,
      children: 0,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
  {
    name: '2. 香港，月薪 23,600 港元，單身（收入模式，PPP）',
    params: {
      amount: 23600,
      currencyCode: 'HKD',
      countryCode: 'HK',
      period: 'month' as const,
      adults: 1,
      children: 0,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
  {
    name: '3. 香港，家庭月收入 18,000 港元，2 成人 2 兒童（收入模式，PPP）',
    params: {
      amount: 18000,
      currencyCode: 'HKD',
      countryCode: 'HK',
      period: 'month' as const,
      adults: 2,
      children: 2,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
  {
    name: '4. 歐元區，年薪 65,500 歐元，單身（收入模式，PPP）',
    params: {
      amount: 65500,
      currencyCode: 'EUR',
      countryCode: 'DE',
      period: 'year' as const,
      adults: 1,
      children: 0,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
  {
    name: '5. 歐元區，年薪 250,300 歐元，單身（收入模式，PPP）',
    params: {
      amount: 250300,
      currencyCode: 'EUR',
      countryCode: 'DE',
      period: 'year' as const,
      adults: 1,
      children: 0,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
  {
    name: '6. 歐元區，年薪 5,100 歐元，單身（收入模式，PPP）',
    params: {
      amount: 5100,
      currencyCode: 'EUR',
      countryCode: 'DE',
      period: 'year' as const,
      adults: 1,
      children: 0,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
  {
    name: '7. 美國，年薪 93,600 美元，單身（收入模式，PPP）',
    params: {
      amount: 93600,
      currencyCode: 'USD',
      countryCode: 'US',
      period: 'year' as const,
      adults: 1,
      children: 0,
      method: 'ppp' as const,
      mode: 'income' as const,
    },
  },
];

console.log('=== 驗收測試結果 ===');
for (const s of scenarios) {
  const res = calculateRanking(s.params);
  console.log(s.name);
  console.log(`  折合 PPP 歐元: €${res.annualEurPpp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  console.log(`  全球百分位: ${res.globalPercentile.toFixed(2)}% (位列全球前 ${res.topPercent.toFixed(2)}%)`);
  console.log(`  超越人口: ${res.poorerCountEstimate.toLocaleString()} / 高於人數: ${res.richerCountEstimate.toLocaleString()}`);
  console.log(`  底層50%均值倍數: ${res.multiplierVsGlobalMedian.toFixed(2)}x`);
  console.log(`  貧窮線倍數: ${res.multiplierVsPovertyLine.toFixed(2)}x`);
  console.log('');
}
