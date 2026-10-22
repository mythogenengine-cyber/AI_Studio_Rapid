import { CountryData, CurrencyInfo, PresetScenario } from '../types';

export const DATA_LOCKED_DATE = '2026-10-21';
export const DATA_LOCKED_LABEL_ZH = '資料鎖定基準：2026 年 10 月 · 離線靜態計量演算法 (免 API Key，零 AI 費用)';
export const DATA_LOCKED_LABEL_EN = 'Data Locked As Of: October 2026 · Offline Econometric Model (No API Key Required, Zero AI Cost)';

export const GLOBAL_TOTAL_POPULATION = 8_150_000_000;
export const GLOBAL_ADULT_POPULATION = 5_480_000_000;

// World Bank Global Poverty Lines (USD PPP per year per person)
export const GLOBAL_POVERTY_EXTREME_ANNUAL = 2.15 * 365; // ~$785/yr
export const GLOBAL_POVERTY_LOWER_MIDDLE_ANNUAL = 3.65 * 365; // ~$1,332/yr
export const GLOBAL_POVERTY_UPPER_MIDDLE_ANNUAL = 6.85 * 365; // ~$2,500/yr

// Global Median Income (World Inequality Database WID & World Bank PIP in USD PPP)
export const GLOBAL_MEDIAN_ANNUAL_INCOME_PPP = 3920; // ~$10.74/day
export const GLOBAL_AVERAGE_ANNUAL_INCOME_PPP = 18600;

// Global Wealth Benchmarks (UBS Global Wealth Report in USD nominal)
export const GLOBAL_MEDIAN_NET_WEALTH = 9000;
export const GLOBAL_AVERAGE_NET_WEALTH = 89000;

/**
 * Currencies list with FX rates (market exchange rate local currency per 1 USD)
 * and World Bank PPP factor (local currency units per 1 USD PPP).
 */
export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', nameZh: '美元 (USD)', nameEn: 'US Dollar (USD)', rateToUsd: 1.0, pppFactorToUsd: 1.0 },
  TWD: { code: 'TWD', symbol: 'NT$', nameZh: '新台幣 (TWD)', nameEn: 'New Taiwan Dollar (TWD)', rateToUsd: 32.2, pppFactorToUsd: 13.8 },
  EUR: { code: 'EUR', symbol: '€', nameZh: '歐元 (EUR)', nameEn: 'Euro (EUR)', rateToUsd: 0.92, pppFactorToUsd: 0.78 },
  GBP: { code: 'GBP', symbol: '£', nameZh: '英鎊 (GBP)', nameEn: 'British Pound (GBP)', rateToUsd: 0.78, pppFactorToUsd: 0.69 },
  JPY: { code: 'JPY', symbol: '¥', nameZh: '日圓 (JPY)', nameEn: 'Japanese Yen (JPY)', rateToUsd: 154.0, pppFactorToUsd: 104.0 },
  CNY: { code: 'CNY', symbol: '¥', nameZh: '人民幣 (CNY)', nameEn: 'Chinese Yuan (CNY)', rateToUsd: 7.24, pppFactorToUsd: 4.18 },
  HKD: { code: 'HKD', symbol: 'HK$', nameZh: '港幣 (HKD)', nameEn: 'Hong Kong Dollar (HKD)', rateToUsd: 7.78, pppFactorToUsd: 6.15 },
  SGD: { code: 'SGD', symbol: 'S$', nameZh: '新加坡元 (SGD)', nameEn: 'Singapore Dollar (SGD)', rateToUsd: 1.34, pppFactorToUsd: 1.08 },
  CAD: { code: 'CAD', symbol: 'CA$', nameZh: '加拿大元 (CAD)', nameEn: 'Canadian Dollar (CAD)', rateToUsd: 1.39, pppFactorToUsd: 1.25 },
  AUD: { code: 'AUD', symbol: 'A$', nameZh: '澳元 (AUD)', nameEn: 'Australian Dollar (AUD)', rateToUsd: 1.54, pppFactorToUsd: 1.42 },
  KRW: { code: 'KRW', symbol: '₩', nameZh: '韓元 (KRW)', nameEn: 'South Korean Won (KRW)', rateToUsd: 1380.0, pppFactorToUsd: 915.0 },
  CHF: { code: 'CHF', symbol: 'CHF', nameZh: '瑞士法郎 (CHF)', nameEn: 'Swiss Franc (CHF)', rateToUsd: 0.88, pppFactorToUsd: 1.12 },
  INR: { code: 'INR', symbol: '₹', nameZh: '印度盧比 (INR)', nameEn: 'Indian Rupee (INR)', rateToUsd: 84.5, pppFactorToUsd: 24.5 },
  MYR: { code: 'MYR', symbol: 'RM', nameZh: '馬來西亞令吉 (MYR)', nameEn: 'Malaysian Ringgit (MYR)', rateToUsd: 4.45, pppFactorToUsd: 1.72 },
  THB: { code: 'THB', symbol: '฿', nameZh: '泰銖 (THB)', nameEn: 'Thai Baht (THB)', rateToUsd: 36.5, pppFactorToUsd: 13.4 },
  VND: { code: 'VND', symbol: '₫', nameZh: '越南盾 (VND)', nameEn: 'Vietnamese Dong (VND)', rateToUsd: 25400.0, pppFactorToUsd: 8400.0 },
  PHP: { code: 'PHP', symbol: '₱', nameZh: '菲律賓披索 (PHP)', nameEn: 'Philippine Peso (PHP)', rateToUsd: 58.2, pppFactorToUsd: 20.8 },
  NZD: { code: 'NZD', symbol: 'NZ$', nameZh: '紐西蘭元 (NZD)', nameEn: 'New Zealand Dollar (NZD)', rateToUsd: 1.68, pppFactorToUsd: 1.52 },
  BRL: { code: 'BRL', symbol: 'R$', nameZh: '巴西雷亞爾 (BRL)', nameEn: 'Brazilian Real (BRL)', rateToUsd: 5.75, pppFactorToUsd: 3.05 },
  MXN: { code: 'MXN', symbol: 'MX$', nameZh: '墨西哥披索 (MXN)', nameEn: 'Mexican Peso (MXN)', rateToUsd: 19.8, pppFactorToUsd: 10.9 },
};

/**
 * Benchmark Countries with local annual individual adult equivalent disposable income distribution.
 * Sources: OECD Income Distribution Database, National Bureau of Statistics (e.g. Taiwan DGBAS, US Census, UK ONS, Japan MHLW).
 */
export const COUNTRIES: Record<string, CountryData> = {
  TW: {
    code: 'TW',
    nameZh: '台灣 (Taiwan)',
    nameEn: 'Taiwan',
    currency: 'TWD',
    pppRate: 13.8,
    fxRate: 32.2,
    percentiles: {
      p10: 240_000,
      p25: 390_000,
      p50: 520_000, // Median annual salary ~52萬 TWD
      p75: 780_000,
      p90: 1_220_000,
      p95: 1_680_000,
      p99: 3_150_000,
    },
    medianAnnualIncomeLocal: 520_000,
    averageAnnualIncomeLocal: 695_000,
  },
  US: {
    code: 'US',
    nameZh: '美國 (United States)',
    nameEn: 'United States',
    currency: 'USD',
    pppRate: 1.0,
    fxRate: 1.0,
    percentiles: {
      p10: 15_800,
      p25: 28_500,
      p50: 48_000, // Individual median
      p75: 82_000,
      p90: 138_000,
      p95: 195_000,
      p99: 410_000,
    },
    medianAnnualIncomeLocal: 48_000,
    averageAnnualIncomeLocal: 63_200,
  },
  JP: {
    code: 'JP',
    nameZh: '日本 (Japan)',
    nameEn: 'Japan',
    currency: 'JPY',
    pppRate: 104.0,
    fxRate: 154.0,
    percentiles: {
      p10: 1_850_000,
      p25: 2_900_000,
      p50: 4_200_000, // Median annual income ~420萬 JPY
      p75: 6_200_000,
      p90: 9_100_000,
      p95: 12_500_000,
      p99: 22_000_000,
    },
    medianAnnualIncomeLocal: 4_200_000,
    averageAnnualIncomeLocal: 4_600_000,
  },
  GB: {
    code: 'GB',
    nameZh: '英國 (United Kingdom)',
    nameEn: 'United Kingdom',
    currency: 'GBP',
    pppRate: 0.69,
    fxRate: 0.78,
    percentiles: {
      p10: 13_500,
      p25: 22_000,
      p50: 34_500,
      p75: 52_000,
      p90: 78_000,
      p95: 105_000,
      p99: 210_000,
    },
    medianAnnualIncomeLocal: 34_500,
    averageAnnualIncomeLocal: 41_000,
  },
  DE: {
    code: 'DE',
    nameZh: '德國 (Germany)',
    nameEn: 'Germany',
    currency: 'EUR',
    pppRate: 0.78,
    fxRate: 0.92,
    percentiles: {
      p10: 16_000,
      p25: 26_000,
      p50: 42_000,
      p75: 62_000,
      p90: 90_000,
      p95: 120_000,
      p99: 230_000,
    },
    medianAnnualIncomeLocal: 42_000,
    averageAnnualIncomeLocal: 49_000,
  },
  CA: {
    code: 'CA',
    nameZh: '加拿大 (Canada)',
    nameEn: 'Canada',
    currency: 'CAD',
    pppRate: 1.25,
    fxRate: 1.39,
    percentiles: {
      p10: 18_000,
      p25: 32_000,
      p50: 54_000,
      p75: 86_000,
      p90: 135_000,
      p95: 185_000,
      p99: 360_000,
    },
    medianAnnualIncomeLocal: 54_000,
    averageAnnualIncomeLocal: 65_000,
  },
  AU: {
    code: 'AU',
    nameZh: '澳洲 (Australia)',
    nameEn: 'Australia',
    currency: 'AUD',
    pppRate: 1.42,
    fxRate: 1.54,
    percentiles: {
      p10: 22_000,
      p25: 41_000,
      p50: 68_000,
      p75: 105_000,
      p90: 155_000,
      p95: 215_000,
      p99: 410_000,
    },
    medianAnnualIncomeLocal: 68_000,
    averageAnnualIncomeLocal: 82_000,
  },
  SG: {
    code: 'SG',
    nameZh: '新加坡 (Singapore)',
    nameEn: 'Singapore',
    currency: 'SGD',
    pppRate: 1.08,
    fxRate: 1.34,
    percentiles: {
      p10: 22_000,
      p25: 38_000,
      p50: 62_000, // Median monthly wage ~5,190 SGD
      p75: 104_000,
      p90: 168_000,
      p95: 240_000,
      p99: 480_000,
    },
    medianAnnualIncomeLocal: 62_000,
    averageAnnualIncomeLocal: 76_000,
  },
  HK: {
    code: 'HK',
    nameZh: '香港 (Hong Kong)',
    nameEn: 'Hong Kong',
    currency: 'HKD',
    pppRate: 6.15,
    fxRate: 7.78,
    percentiles: {
      p10: 110_000,
      p25: 180_000,
      p50: 260_000, // Median monthly HK$21,000
      p75: 420_000,
      p90: 720_000,
      p95: 1_100_000,
      p99: 2_400_000,
    },
    medianAnnualIncomeLocal: 260_000,
    averageAnnualIncomeLocal: 340_000,
  },
  KR: {
    code: 'KR',
    nameZh: '南韓 (South Korea)',
    nameEn: 'South Korea',
    currency: 'KRW',
    pppRate: 915.0,
    fxRate: 1380.0,
    percentiles: {
      p10: 14_000_000,
      p25: 24_000_000,
      p50: 38_000_000,
      p75: 58_000_000,
      p90: 88_000_000,
      p95: 120_000_000,
      p99: 220_000_000,
    },
    medianAnnualIncomeLocal: 38_000_000,
    averageAnnualIncomeLocal: 45_000_000,
  },
  CN: {
    code: 'CN',
    nameZh: '中國 (China)',
    nameEn: 'China',
    currency: 'CNY',
    pppRate: 4.18,
    fxRate: 7.24,
    percentiles: {
      p10: 9_200,
      p25: 18_000,
      p50: 36_000, // Urban/rural blended median
      p75: 72_000,
      p90: 140_000,
      p95: 220_000,
      p99: 580_000,
    },
    medianAnnualIncomeLocal: 36_000,
    averageAnnualIncomeLocal: 52_000,
  },
  IN: {
    code: 'IN',
    nameZh: '印度 (India)',
    nameEn: 'India',
    currency: 'INR',
    pppRate: 24.5,
    fxRate: 84.5,
    percentiles: {
      p10: 42_000,
      p25: 85_000,
      p50: 165_000,
      p75: 350_000,
      p90: 720_000,
      p95: 1_250_000,
      p99: 3_800_000,
    },
    medianAnnualIncomeLocal: 165_000,
    averageAnnualIncomeLocal: 260_000,
  },
  FR: {
    code: 'FR',
    nameZh: '法國 (France)',
    nameEn: 'France',
    currency: 'EUR',
    pppRate: 0.81,
    fxRate: 0.92,
    percentiles: {
      p10: 14_500,
      p25: 21_000,
      p50: 31_000,
      p75: 45_000,
      p90: 68_000,
      p95: 90_000,
      p99: 175_000,
    },
    medianAnnualIncomeLocal: 31_000,
    averageAnnualIncomeLocal: 38_000,
  },
  CH: {
    code: 'CH',
    nameZh: '瑞士 (Switzerland)',
    nameEn: 'Switzerland',
    currency: 'CHF',
    pppRate: 1.12,
    fxRate: 0.88,
    percentiles: {
      p10: 38_000,
      p25: 58_000,
      p50: 84_000,
      p75: 125_000,
      p90: 185_000,
      p95: 260_000,
      p99: 520_000,
    },
    medianAnnualIncomeLocal: 84_000,
    averageAnnualIncomeLocal: 98_000,
  },
  MY: {
    code: 'MY',
    nameZh: '馬來西亞 (Malaysia)',
    nameEn: 'Malaysia',
    currency: 'MYR',
    pppRate: 1.72,
    fxRate: 4.45,
    percentiles: {
      p10: 14_400,
      p25: 25_000,
      p50: 42_000,
      p75: 75_000,
      p90: 135_000,
      p95: 195_000,
      p99: 420_000,
    },
    medianAnnualIncomeLocal: 42_000,
    averageAnnualIncomeLocal: 56_000,
  },
  VN: {
    code: 'VN',
    nameZh: '越南 (Vietnam)',
    nameEn: 'Vietnam',
    currency: 'VND',
    pppRate: 8400.0,
    fxRate: 25400.0,
    percentiles: {
      p10: 28_000_000,
      p25: 52_000_000,
      p50: 98_000_000,
      p75: 180_000_000,
      p90: 320_000_000,
      p95: 480_000_000,
      p99: 1_100_000_000,
    },
    medianAnnualIncomeLocal: 98_000_000,
    averageAnnualIncomeLocal: 125_000_000,
  },
};

/**
 * Global Income Curve Spline Points (Percentile 0 to 100 vs Annual Income in USD PPP).
 * Calibrated against World Inequality Database (WID.world 2024-2026 update) & World Bank PIP.
 * Notes:
 * - p50 = $3,920
 * - p90 = $38,000 PPP ($65,500 nominal individual)
 * - p95 = $62,000 PPP
 * - p99 = $130,000 PPP ($250,300 nominal individual)
 * - p99.9 = $390,000 PPP
 * - p99.99 = $1,350,000 PPP
 */
export const GLOBAL_INCOME_SPLINE_PPP: Array<{ percentile: number; incomeUsdPpp: number }> = [
  { percentile: 0.0, incomeUsdPpp: 0 },
  { percentile: 1.0, incomeUsdPpp: 190 },
  { percentile: 2.0, incomeUsdPpp: 280 },
  { percentile: 5.0, incomeUsdPpp: 460 },
  { percentile: 10.0, incomeUsdPpp: 780 }, // extreme poverty line ~$785/yr ($2.15/day)
  { percentile: 15.0, incomeUsdPpp: 1080 },
  { percentile: 20.0, incomeUsdPpp: 1350 }, // lower-middle poverty line ~$3.65/day
  { percentile: 30.0, incomeUsdPpp: 1950 },
  { percentile: 40.0, incomeUsdPpp: 2750 },
  { percentile: 50.0, incomeUsdPpp: 3920 }, // Global Median
  { percentile: 60.0, incomeUsdPpp: 5800 },
  { percentile: 70.0, incomeUsdPpp: 9600 },
  { percentile: 75.0, incomeUsdPpp: 12800 },
  { percentile: 80.0, incomeUsdPpp: 17500 },
  { percentile: 85.0, incomeUsdPpp: 24500 },
  { percentile: 90.0, incomeUsdPpp: 38000 }, // Global Top 10%
  { percentile: 92.0, incomeUsdPpp: 46000 },
  { percentile: 94.0, incomeUsdPpp: 56000 },
  { percentile: 95.0, incomeUsdPpp: 62500 }, // Global Top 5%
  { percentile: 96.0, incomeUsdPpp: 71000 },
  { percentile: 97.0, incomeUsdPpp: 83000 },
  { percentile: 98.0, incomeUsdPpp: 101000 }, // Global Top 2%
  { percentile: 99.0, incomeUsdPpp: 130000 }, // Global Top 1% threshold (~$127,000 - $135,000 PPP)
  { percentile: 99.2, incomeUsdPpp: 145000 },
  { percentile: 99.5, incomeUsdPpp: 195000 }, // Global Top 0.5%
  { percentile: 99.8, incomeUsdPpp: 290000 },
  { percentile: 99.9, incomeUsdPpp: 395000 }, // Global Top 0.1%
  { percentile: 99.95, incomeUsdPpp: 680000 },
  { percentile: 99.99, incomeUsdPpp: 1350000 }, // Global Top 0.01%
  { percentile: 99.999, incomeUsdPpp: 4800000 },
  { percentile: 100.0, incomeUsdPpp: 25000000 },
];

/**
 * Global Income Curve Spline in Nominal USD (market exchange rates).
 */
export const GLOBAL_INCOME_SPLINE_NOMINAL: Array<{ percentile: number; incomeUsdNominal: number }> = [
  { percentile: 0.0, incomeUsdNominal: 0 },
  { percentile: 5.0, incomeUsdNominal: 160 },
  { percentile: 10.0, incomeUsdNominal: 380 },
  { percentile: 20.0, incomeUsdNominal: 850 },
  { percentile: 30.0, incomeUsdNominal: 1350 },
  { percentile: 40.0, incomeUsdNominal: 2050 },
  { percentile: 50.0, incomeUsdNominal: 3100 }, // Global median nominal
  { percentile: 60.0, incomeUsdNominal: 5200 },
  { percentile: 70.0, incomeUsdNominal: 9800 },
  { percentile: 80.0, incomeUsdNominal: 21000 },
  { percentile: 85.0, incomeUsdNominal: 35000 },
  { percentile: 90.0, incomeUsdNominal: 65500 }, // Top 10% nominal
  { percentile: 95.0, incomeUsdNominal: 115000 },
  { percentile: 98.0, incomeUsdNominal: 185000 },
  { percentile: 99.0, incomeUsdNominal: 250300 }, // Top 1% nominal
  { percentile: 99.5, incomeUsdNominal: 390000 },
  { percentile: 99.9, incomeUsdNominal: 890000 },
  { percentile: 99.99, incomeUsdNominal: 3200000 },
  { percentile: 100.0, incomeUsdNominal: 45000000 },
];

/**
 * Global Net Wealth Curve Spline (UBS Global Wealth Report in USD).
 */
export const GLOBAL_WEALTH_SPLINE: Array<{ percentile: number; wealthUsd: number }> = [
  { percentile: 0.0, wealthUsd: -50000 },
  { percentile: 5.0, wealthUsd: 0 },
  { percentile: 10.0, wealthUsd: 280 },
  { percentile: 20.0, wealthUsd: 1100 },
  { percentile: 30.0, wealthUsd: 2800 },
  { percentile: 40.0, wealthUsd: 5400 },
  { percentile: 50.0, wealthUsd: 9000 }, // Global Median Wealth ~$9,000
  { percentile: 60.0, wealthUsd: 16500 },
  { percentile: 70.0, wealthUsd: 34000 },
  { percentile: 80.0, wealthUsd: 75000 },
  { percentile: 85.0, wealthUsd: 102000 },
  { percentile: 90.0, wealthUsd: 140000 }, // Top 10% Wealth threshold
  { percentile: 95.0, wealthUsd: 310000 }, // Top 5%
  { percentile: 98.0, wealthUsd: 680000 }, // Top 2%
  { percentile: 99.0, wealthUsd: 1150000 }, // Top 1% Wealth (~$1.15M USD millionaire club)
  { percentile: 99.5, wealthUsd: 2300000 },
  { percentile: 99.9, wealthUsd: 5600000 }, // Top 0.1% Ultra-wealthy
  { percentile: 99.99, wealthUsd: 28000000 }, // Top 0.01% Centi-millionaire / Ultra High Net Worth
  { percentile: 100.0, wealthUsd: 250000000000 },
];

/**
 * Pre-configured presets for realistic quick testing.
 */
export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'tw_median',
    titleZh: '台灣薪資中位數',
    titleEn: 'Taiwan Median Salary',
    subtitleZh: '月薪約 4.3 萬 / 年薪 52 萬 TWD',
    subtitleEn: 'NT$43k/mo / NT$520k/yr',
    amount: 520000,
    currency: 'TWD',
    period: 'year',
    country: 'TW',
    adults: 1,
    children: 0,
  },
  {
    id: 'tw_tech',
    titleZh: '台灣竹科工程師',
    titleEn: 'Taiwan Tech Engineer',
    subtitleZh: '年薪 180 萬 TWD (含獎金)',
    subtitleEn: 'NT$1.8M/yr with bonus',
    amount: 1800000,
    currency: 'TWD',
    period: 'year',
    country: 'TW',
    adults: 1,
    children: 0,
  },
  {
    id: 'us_median',
    titleZh: '美國中位數全職員工',
    titleEn: 'US Full-time Median',
    subtitleZh: '年薪 48,000 美元 (約月薪 $4k)',
    subtitleEn: '$48,000/yr (~$4,000/mo)',
    amount: 48000,
    currency: 'USD',
    period: 'year',
    country: 'US',
    adults: 1,
    children: 0,
  },
  {
    id: 'jp_average',
    titleZh: '日本上班族平均',
    titleEn: 'Japan Average Salaryman',
    subtitleZh: '年薪 460 萬日圓',
    subtitleEn: '¥4.6M/yr',
    amount: 4600000,
    currency: 'JPY',
    period: 'year',
    country: 'JP',
    adults: 1,
    children: 0,
  },
  {
    id: 'global_median',
    titleZh: '全球人類所得中位數',
    titleEn: 'Global Human Median',
    subtitleZh: '年收入 3,920 美元 (PPP)',
    subtitleEn: '$3,920/yr (World Bank)',
    amount: 3920,
    currency: 'USD',
    period: 'year',
    country: 'US',
    adults: 1,
    children: 0,
  },
  {
    id: 'global_top_1',
    titleZh: '全球收入前 1% 門檻',
    titleEn: 'Global Top 1% Threshold',
    subtitleZh: '年收入 13 萬美元 PPP',
    subtitleEn: '$130,000/yr PPP (WID)',
    amount: 130000,
    currency: 'USD',
    period: 'year',
    country: 'US',
    adults: 1,
    children: 0,
  },
];
