import {
  COUNTRIES,
  CURRENCIES,
  EUR_PPP_PER_USD_PPP,
  GLOBAL_ADULT_POPULATION,
  GLOBAL_BOTTOM_50_AVERAGE_INCOME_EUR_PPP,
  GLOBAL_INCOME_SPLINE_NOMINAL,
  GLOBAL_INCOME_SPLINE_PPP,
  GLOBAL_MEDIAN_ANNUAL_INCOME_EUR_PPP,
  GLOBAL_POVERTY_EXTREME_ANNUAL,
  GLOBAL_TOTAL_POPULATION,
  GLOBAL_WEALTH_SPLINE,
} from '../data/economicData';
import {
  CalculationMode,
  CalculationResult,
  ComparisonMethod,
  CountryData,
  Period,
} from '../types';

/**
 * Computes household equivalent denominator using OECD modified scale:
 * Denominator = 1 + 0.5 * (adults - 1) + 0.3 * children
 */
export function calculateOecdEquivalenceScale(adults: number, children: number): number {
  const safeAdults = Math.max(1, Math.floor(adults || 1));
  const safeChildren = Math.max(0, Math.floor(children || 0));
  return 1 + 0.5 * (safeAdults - 1) + 0.3 * safeChildren;
}

/**
 * Normalizes input amount to Annual amount based on period.
 */
export function normalizeToAnnual(amount: number, period: Period): number {
  if (amount <= 0 || isNaN(amount)) return 0;
  switch (period) {
    case 'hour':
      // 40 hours/week * 52 weeks = 2,080 hours/year
      return amount * 2080;
    case 'month':
      return amount * 12;
    case 'year':
    default:
      return amount;
  }
}

/**
 * Log-linear percentile interpolation along an empirical spline.
 */
export function interpolatePercentile(
  value: number,
  spline: Array<{ percentile: number; [key: string]: number }>,
  valueKey: string
): number {
  if (value <= 0) return 0;
  
  const minKnot = spline[0];
  const maxKnot = spline[spline.length - 1];
  
  if (value <= minKnot[valueKey]) {
    return minKnot.percentile;
  }
  
  // Above highest knot: Pareto tail extrapolation
  if (value >= maxKnot[valueKey]) {
    // Pareto alpha ~ 1.6
    const alpha = 1.6;
    const tailPercent = 100 - maxKnot.percentile; // e.g. 0.001
    const ratio = maxKnot[valueKey] / value;
    const extrapolatedTail = tailPercent * Math.pow(ratio, alpha);
    return Math.min(99.9999, Math.max(0, 100 - extrapolatedTail));
  }
  
  // Find enclosing interval
  for (let i = 0; i < spline.length - 1; i++) {
    const k1 = spline[i];
    const k2 = spline[i + 1];
    const v1 = k1[valueKey];
    const v2 = k2[valueKey];
    
    if (value >= v1 && value <= v2) {
      if (v1 <= 0) {
        // Linear interpolation when lower bound is zero
        const fraction = (value - v1) / (v2 - v1);
        return k1.percentile + fraction * (k2.percentile - k1.percentile);
      }
      
      // Logarithmic interpolation
      const logV = Math.log(value);
      const logV1 = Math.log(Math.max(1, v1));
      const logV2 = Math.log(Math.max(1, v2));
      const fraction = (logV - logV1) / (logV2 - logV1);
      
      return k1.percentile + Math.max(0, Math.min(1, fraction)) * (k2.percentile - k1.percentile);
    }
  }
  
  return 50.0;
}

/**
 * Calculates domestic country income percentile based on country distribution.
 */
export function calculateDomesticPercentile(amountLocalAnnual: number, country: CountryData): number {
  if (amountLocalAnnual <= 0) return 0;
  
  const p = country.percentiles;
  const knots = [
    { p: 0, val: 0 },
    { p: 10, val: p.p10 },
    { p: 25, val: p.p25 },
    { p: 50, val: p.p50 },
    { p: 75, val: p.p75 },
    { p: 90, val: p.p90 },
    { p: 95, val: p.p95 },
    { p: 99, val: p.p99 },
    { p: 99.9, val: p.p99 * 2.5 },
  ];
  
  if (amountLocalAnnual >= knots[knots.length - 1].val) {
    // Upper Pareto tail
    const top = knots[knots.length - 1];
    const alpha = 1.7;
    const tail = 0.1 * Math.pow(top.val / amountLocalAnnual, alpha);
    return Math.min(99.99, Math.max(0, 100 - tail));
  }
  
  for (let i = 0; i < knots.length - 1; i++) {
    const k1 = knots[i];
    const k2 = knots[i + 1];
    if (amountLocalAnnual >= k1.val && amountLocalAnnual <= k2.val) {
      if (k1.val <= 0) {
        return k1.p + (amountLocalAnnual / k2.val) * (k2.p - k1.p);
      }
      const logV = Math.log(amountLocalAnnual);
      const logV1 = Math.log(k1.val);
      const logV2 = Math.log(k2.val);
      const f = (logV - logV1) / (logV2 - logV1);
      return k1.p + f * (k2.p - k1.p);
    }
  }
  
  return 50;
}

/**
 * Determine qualitative tier based on top percent.
 */
function getTierKey(topPercent: number): CalculationResult['tierKey'] {
  if (topPercent <= 0.05) return 'ultra_rich';
  if (topPercent <= 1.0) return 'top_1';
  if (topPercent <= 5.0) return 'top_5';
  if (topPercent <= 10.0) return 'top_10';
  if (topPercent <= 20.0) return 'top_20';
  if (topPercent <= 50.0) return 'middle_class';
  if (topPercent <= 80.0) return 'lower_middle';
  return 'base';
}

/**
 * Main calculation engine.
 */
export function calculateRanking(params: {
  amount: number;
  currencyCode: string;
  countryCode: string;
  period: Period;
  adults: number;
  children: number;
  method: ComparisonMethod;
  mode: CalculationMode;
}): CalculationResult {
  const {
    amount,
    currencyCode,
    countryCode,
    period,
    adults,
    children,
    method,
    mode,
  } = params;

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const country = COUNTRIES[countryCode] || COUNTRIES.TW;
  const safeAdults = Math.max(1, Math.floor(adults || 1));

  // 1. Calculate individual equivalent in local currency
  let annualLocal = 0;
  let individualEquivalentLocal = 0;

  if (mode === 'wealth') {
    // 財富是存量：不按輸入期間乘以 12 或其他倍數，也不套用等值尺度。
    // 個人財富 = 家庭淨資產 ÷ 成人人數
    annualLocal = amount;
    individualEquivalentLocal = amount / safeAdults;
  } else {
    // 收入模式：WID 做法是將收入平均分給家中成人，兒童不計入分攤。
    // 個人收入 = 家庭年收入 ÷ 成人人數
    annualLocal = normalizeToAnnual(amount, period);
    individualEquivalentLocal = annualLocal / safeAdults;
  }
  
  // 2. Convert to USD Nominal
  const annualUsdNominal = individualEquivalentLocal / (currency.rateToUsd || 1.0);
  
  // 3. Convert to USD PPP
  const pppRate = currency.pppFactorToUsd || country.pppRate || 1.0;
  const annualUsdPpp = individualEquivalentLocal / pppRate;
  
  // 4. Convert USD PPP to EUR PPP (WIR 2026 統一採用購買力平價歐元，2025年價格)
  const annualEurPpp = annualUsdPpp * EUR_PPP_PER_USD_PPP;
  
  let globalPercentile = 0;
  
  if (mode === 'wealth') {
    // Wealth calculation uses nominal wealth distribution (UBS Report in USD)
    globalPercentile = interpolatePercentile(annualUsdNominal, GLOBAL_WEALTH_SPLINE, 'wealthUsd');
  } else {
    // Income mode (WIR 2026 pre-tax national income per adult, EUR PPP)
    if (method === 'ppp') {
      globalPercentile = interpolatePercentile(annualEurPpp, GLOBAL_INCOME_SPLINE_PPP, 'incomeEurPpp');
    } else {
      globalPercentile = interpolatePercentile(annualUsdNominal, GLOBAL_INCOME_SPLINE_NOMINAL, 'incomeUsdNominal');
    }
  }
  
  // Bound checks
  globalPercentile = Math.max(0.01, Math.min(99.999, globalPercentile));
  const topPercent = Math.max(0.001, 100 - globalPercentile);
  
  // Population estimates: 收入與財富模式一律採用 GLOBAL_ADULT_POPULATION（成人）
  const targetPopulation = GLOBAL_ADULT_POPULATION;
  const richerCountEstimate = Math.round((topPercent / 100) * targetPopulation);
  const poorerCountEstimate = targetPopulation - richerCountEstimate;
  
  // Multipliers
  // 相對全球最低 50% 成人平均收入 €5,100 (WIR 2026 PPP €)
  const multiplierVsGlobalMedian = annualEurPpp > 0 ? annualEurPpp / GLOBAL_BOTTOM_50_AVERAGE_INCOME_EUR_PPP : 0;
  // 例外：世界銀行貧窮線 $3.00/天為美元 PPP（2021年價格，年額 $1,095）。貧窮線倍數繼續用 annualUsdPpp 比較，不轉為歐元。
  const multiplierVsPovertyLine = annualUsdPpp > 0 ? annualUsdPpp / GLOBAL_POVERTY_EXTREME_ANNUAL : 0;
  
  const dailyEarningsUsdPpp = annualUsdPpp / 365;
  const hourlyEarningsUsdPpp = annualUsdPpp / 2080;
  const dailyEarningsEurPpp = annualEurPpp / 365;
  const hourlyEarningsEurPpp = annualEurPpp / 2080;
  
  // Domestic ranking
  const domesticPercentile = calculateDomesticPercentile(individualEquivalentLocal, country);
  const domesticTopPercent = Math.max(0.01, 100 - domesticPercentile);
  
  const tierKey = getTierKey(topPercent);
  
  return {
    globalPercentile,
    topPercent,
    richerCountEstimate,
    poorerCountEstimate,
    totalWorldPopulation: targetPopulation,
    annualLocal,
    annualUsdNominal,
    annualUsdPpp,
    annualEurPpp,
    individualEquivalentLocal,
    individualEquivalentUsdPpp: annualUsdPpp,
    multiplierVsGlobalMedian,
    multiplierVsPovertyLine,
    dailyEarningsUsdPpp,
    hourlyEarningsUsdPpp,
    dailyEarningsEurPpp,
    hourlyEarningsEurPpp,
    domesticPercentile,
    domesticTopPercent,
    tierKey,
  };
}

/**
 * Format currency with locale and sensible decimals.
 */
export function formatCurrency(
  val: number,
  currencyCode: string,
  compact = false
): string {
  if (isNaN(val)) return '0';
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  
  if (compact) {
    if (Math.abs(val) >= 1_000_000_000) {
      return `${currency.symbol}${(val / 1_000_000_000).toFixed(1)}B`;
    }
    if (Math.abs(val) >= 1_000_000) {
      return `${currency.symbol}${(val / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(val) >= 10_000 && currencyCode === 'TWD') {
      return `${currency.symbol}${(val / 10_000).toFixed(0)}萬`;
    }
    if (Math.abs(val) >= 1_000) {
      return `${currency.symbol}${(val / 1_000).toFixed(0)}k`;
    }
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: val >= 100 ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(val);
}

/**
 * Formats population count into readable human form (e.g. 5.5 億 or 5.5 Billion).
 */
export function formatPopulationCount(count: number, lang: 'zh' | 'en'): string {
  if (count <= 0) return '0';
  if (lang === 'zh') {
    if (count >= 100_000_000) {
      return `${(count / 100_000_000).toFixed(1)} 億`;
    }
    if (count >= 10_000) {
      return `${(count / 10_000).toFixed(0)} 萬`;
    }
    return count.toLocaleString();
  } else {
    if (count >= 1_000_000_000) {
      return `${(count / 1_000_000_000).toFixed(2)} Billion`;
    }
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)} Million`;
    }
    if (count >= 1_000) {
      return `${(count / 1_000).toFixed(0)}k`;
    }
    return count.toLocaleString();
  }
}
