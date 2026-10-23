export type Language = 'zh' | 'en';

export type CalculationMode = 'income' | 'wealth';

export type Period = 'year' | 'month' | 'hour';

export type ComparisonMethod = 'ppp' | 'nominal';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  nameZh: string;
  nameEn: string;
  rateToUsd: number; // units of local currency per 1 USD (market FX)
  pppFactorToUsd: number; // units of local currency per 1 USD (World Bank PPP)
}

export interface CountryData {
  code: string;
  nameZh: string;
  nameEn: string;
  currency: string;
  pppRate: number; // local currency per USD PPP
  fxRate: number; // local currency per USD FX
  isOfficial: boolean; // 官方數據 vs 估算
  medianDefinitionZh: string;
  medianDefinitionEn: string;
  sourceNameZh: string;
  sourceNameEn: string;
  sourceYear: string;
  sourceUrl?: string;
  // Annual income percentiles in local currency
  percentiles: {
    p10: number;
    p25: number;
    p50: number; // median
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
  medianAnnualIncomeLocal: number;
  averageAnnualIncomeLocal: number;
}

export interface PresetScenario {
  id: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  amount: number;
  currency: string;
  period: Period;
  country: string;
  adults: number;
  children: number;
}

export interface CalculationResult {
  // Global
  globalPercentile: number; // 0 to 100 (e.g., 98.6 = top 1.4%)
  topPercent: number; // 100 - globalPercentile (e.g., 1.4%)
  richerCountEstimate: number; // people richer
  poorerCountEstimate: number; // people poorer
  totalWorldPopulation: number;
  
  // Normalized values
  annualLocal: number;
  annualUsdNominal: number;
  annualUsdPpp: number;
  annualEurPpp: number;
  individualEquivalentLocal: number;
  individualEquivalentUsdPpp: number;
  
  // Multipliers
  multiplierVsGlobalMedian: number;
  multiplierVsPovertyLine: number;
  dailyEarningsUsdPpp: number;
  hourlyEarningsUsdPpp: number;
  dailyEarningsEurPpp: number;
  hourlyEarningsEurPpp: number;
  
  // Domestic
  domesticPercentile: number; // 0 to 100 in selected country
  domesticTopPercent: number;
  
  // Tier info
  tierKey: 'ultra_rich' | 'top_1' | 'top_5' | 'top_10' | 'top_20' | 'middle_class' | 'lower_middle' | 'base';
}
