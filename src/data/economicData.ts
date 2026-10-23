import { CountryData, CurrencyInfo, PresetScenario } from '../types';

export const DATA_LOCKED_DATE = '2026-10-21';
export const DATA_LOCKED_LABEL_ZH = '資料鎖定基準：2026 年 10 月 · 離線靜態計量演算法 (免 API Key，零 AI 費用)';
export const DATA_LOCKED_LABEL_EN = 'Data Locked As Of: October 2026 · Offline Econometric Model (No API Key Required, Zero AI Cost)';

export const GLOBAL_TOTAL_POPULATION = 8_150_000_000;
export const GLOBAL_ADULT_POPULATION = 5_480_000_000;

// 每 1 國際元（美元 PPP）折合購買力平價歐元係數（OECD/Eurostat 係數，近似值，待核實）
export const EUR_PPP_PER_USD_PPP = 0.70;

// World Bank Global Poverty Lines (USD PPP per year per person, World Bank June 2025 standard, 2021 PPP)
export const GLOBAL_POVERTY_EXTREME_ANNUAL = 3.00 * 365; // $1,095/yr ($3.00/day, 2021 PPP 美元)
export const GLOBAL_POVERTY_LOWER_MIDDLE_ANNUAL = 3.65 * 365; // ~$1,332/yr
export const GLOBAL_POVERTY_UPPER_MIDDLE_ANNUAL = 6.85 * 365; // ~$2,500/yr

// Global Income Benchmarks (World Inequality Report 2026 / WID.world，單位：PPP 歐元，2025年價格，成人稅前國民收入)
export const GLOBAL_BOTTOM_50_AVERAGE_INCOME_EUR_PPP = 5100; // 最低 50% 成人平均收入約 €5,100 PPP 歐元 (WIR 2026)
export const GLOBAL_MEDIAN_ANNUAL_INCOME_EUR_PPP = 11400; // 曲線 p50 中位數插值估算 (€11,400 PPP 歐元)

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
  EUR: { code: 'EUR', symbol: '€', nameZh: '歐元 (EUR)', nameEn: 'Euro (EUR)', rateToUsd: 0.92, pppFactorToUsd: EUR_PPP_PER_USD_PPP },
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
 * Benchmark Countries with local annual individual adult equivalent income distribution.
 * Sources: National statistical offices (e.g., HK C&SD, Taiwan DGBAS, US BLS, Japan MHLW, UK ONS, Statistics Korea).
 */
export const COUNTRIES: Record<string, CountryData> = {
  TW: {
    code: 'TW',
    nameZh: '台灣 (Taiwan)',
    nameEn: 'Taiwan',
    currency: 'TWD',
    pppRate: 13.8,
    fxRate: 32.2,
    isOfficial: true,
    medianDefinitionZh: '受僱員工全年總薪資中位數（含經常性薪資與非經常性獎金）',
    medianDefinitionEn: 'Median Annual Total Earnings of Employed Staff (incl. bonuses)',
    sourceNameZh: '行政院主計總處',
    sourceNameEn: 'Directorate-General of Budget, Accounting and Statistics (DGBAS)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.stat.gov.tw/',
    percentiles: {
      p10: 240_000,
      p25: 390_000,
      p50: 520_000, // 薪資中位數 52 萬 TWD
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
    isOfficial: true,
    medianDefinitionZh: '全職薪資勞工週薪換算年額中位數 (Usual Weekly Earnings × 52)',
    medianDefinitionEn: 'Median Annualized Weekly Earnings of Full-Time Wage and Salary Workers',
    sourceNameZh: '美國勞工統計局 (BLS)',
    sourceNameEn: 'U.S. Bureau of Labor Statistics (BLS)',
    sourceYear: '2024',
    sourceUrl: 'https://www.bls.gov/cps/',
    percentiles: {
      p10: 15_800,
      p25: 28_500,
      p50: 48_000,
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
    isOfficial: true,
    medianDefinitionZh: '民間企業全職就業者所定給與加計獎金年額中位數',
    medianDefinitionEn: 'Median Annual Earnings of Full-Time Workers (Basic Wages + Bonuses)',
    sourceNameZh: '厚生勞動省《賃金構造基本統計調査》',
    sourceNameEn: 'Ministry of Health, Labour and Welfare (MHLW)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.mhlw.go.jp/',
    percentiles: {
      p10: 1_850_000,
      p25: 2_900_000,
      p50: 4_200_000,
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
    isOfficial: true,
    medianDefinitionZh: '全職員工年度總工資中位數 (Gross Annual Earnings for Full-time)',
    medianDefinitionEn: 'Median Gross Annual Earnings for Full-Time Employees',
    sourceNameZh: '英國國家統計局 (ONS) ASHE',
    sourceNameEn: 'Office for National Statistics (ONS) - Annual Survey of Hours and Earnings',
    sourceYear: '2024',
    sourceUrl: 'https://www.ons.gov.uk/',
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
    isOfficial: true,
    medianDefinitionZh: '全職員工年度總工資中位數 (Bruttojahresverdienst Vollzeit)',
    medianDefinitionEn: 'Median Gross Annual Earnings of Full-Time Employees',
    sourceNameZh: '德國聯邦統計局 (Destatis)',
    sourceNameEn: 'Federal Statistical Office of Germany (Destatis)',
    sourceYear: '2024',
    sourceUrl: 'https://www.destatis.de/',
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
    isOfficial: true,
    medianDefinitionZh: '全年全職就業者稅前就業收入中位數',
    medianDefinitionEn: 'Median Total Employment Income of Full-Year Full-Time Workers',
    sourceNameZh: '加拿大統計局 (StatCan)',
    sourceNameEn: 'Statistics Canada (StatCan)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.statcan.gc.ca/',
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
    isOfficial: true,
    medianDefinitionZh: '成年全職僱員週薪換算年額中位數 (Full-time Adult Total Earnings × 52)',
    medianDefinitionEn: 'Median Annualized Weekly Earnings of Full-Time Adult Employees',
    sourceNameZh: '澳洲統計局 (ABS)',
    sourceNameEn: 'Australian Bureau of Statistics (ABS)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.abs.gov.au/',
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
    isOfficial: true,
    medianDefinitionZh: '全職受僱公民與永久居民每月薪資中位數 (S$5,190) × 12（含僱主公積金 CPF 供款）',
    medianDefinitionEn: 'Median Gross Monthly Wage of Full-Time Employed Residents (S$5,190) × 12 (incl. employer CPF)',
    sourceNameZh: '新加坡人力部 (MOM) 勞動力報告',
    sourceNameEn: 'Ministry of Manpower (MOM) Singapore',
    sourceYear: '2024',
    sourceUrl: 'https://stats.mom.gov.sg/',
    percentiles: {
      p10: 22_000,
      p25: 38_000,
      p50: 62_000,
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
    isOfficial: true,
    medianDefinitionZh: '就業人士每月就業收入中位數 HK$23,600 × 12（年額 283,200；不含外籍家庭傭工）',
    medianDefinitionEn: 'Median Monthly Employment Earnings of Employed Persons HK$23,600 × 12 (excl. foreign domestic helpers)',
    sourceNameZh: '香港政府統計處《綜合住戶統計調查按季統計報告》',
    sourceNameEn: 'Census and Statistics Department of Hong Kong',
    sourceYear: '2024',
    sourceUrl: 'https://www.censtatd.gov.hk/',
    percentiles: {
      p10: 120_000, // 估算（基層就業收入）
      p25: 195_000, // 估算
      p50: 283_200, // 官方中位數：每月就業收入 HK$23,600 × 12
      p75: 480_000, // 估算
      p90: 780_000, // 估算
      p95: 1_150_000, // 估算
      p99: 2_400_000, // 估算
    },
    medianAnnualIncomeLocal: 283_200,
    averageAnnualIncomeLocal: 350_000,
  },
  KR: {
    code: 'KR',
    nameZh: '南韓 (South Korea)',
    nameEn: 'South Korea',
    currency: 'KRW',
    pppRate: 915.0,
    fxRate: 1380.0,
    isOfficial: true,
    medianDefinitionZh: '全職薪資勞動者月均所得（約 317 萬韓元）換算年薪中位數（全職常僱口徑；若計入臨時與非正規職，整體薪資中位數約 3,400 萬韓元）',
    medianDefinitionEn: 'Median Annual Earnings of Full-Time Wage Workers (approx. KRW 3.17M/mo × 12; all wage workers median is approx. KRW 34M)',
    sourceNameZh: '韓國統計廳 (KOSTAT) 薪資勞動者所得統計 / 僱傭勞動部 (MOEL)',
    sourceNameEn: 'Statistics Korea (KOSTAT) / Ministry of Employment and Labor (MOEL)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://kosis.kr/',
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
    isOfficial: false,
    medianDefinitionZh: '全國城鄉綜合人均收入與城鎮私營/非私營單位工資綜合估算中位數',
    medianDefinitionEn: 'Estimated Blended National Median Income (Urban & Rural Blended)',
    sourceNameZh: '國家統計局國民經濟統計（綜合估算）',
    sourceNameEn: 'National Bureau of Statistics of China (Blended Estimate)',
    sourceYear: '2024',
    sourceUrl: 'http://www.stats.gov.cn/',
    percentiles: {
      p10: 9_200,
      p25: 18_000,
      p50: 36_000,
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
    isOfficial: false,
    medianDefinitionZh: '常規領薪僱員（Regular Wage/Salaried）所得估算中位數',
    medianDefinitionEn: 'Estimated Median Income of Regular Wage/Salaried Workers',
    sourceNameZh: '印度統計與計劃執行部 PLFS 調查（估算）',
    sourceNameEn: 'Ministry of Statistics & Programme Implementation (PLFS Estimate)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://mospi.gov.in/',
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
    isOfficial: true,
    medianDefinitionZh: '私營部門全職相當就業者年度就業工資中位數 (Salaire net en EQTP)',
    medianDefinitionEn: 'Median Annual Net Wage for Full-Time Equivalent Private Sector Employees',
    sourceNameZh: '法國國家統計局 (INSEE)',
    sourceNameEn: 'National Institute of Statistics and Economic Studies (INSEE)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.insee.fr/',
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
    isOfficial: true,
    medianDefinitionZh: '全職標準化每月總工資中位數 (CHF 7,000) × 12',
    medianDefinitionEn: 'Median Standardized Gross Monthly Wage of Full-Time Employees (CHF 7,000) × 12',
    sourceNameZh: '瑞士聯邦統計局 (FSO)',
    sourceNameEn: 'Federal Statistical Office of Switzerland (FSO)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.bfs.admin.ch/',
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
    isOfficial: true,
    medianDefinitionZh: '全職受薪僱員每月工資中位數 (RM 3,500) × 12',
    medianDefinitionEn: 'Median Monthly Wages of Paid Employees (RM 3,500) × 12',
    sourceNameZh: '馬來西亞統計局 (DOSM) 薪資報告',
    sourceNameEn: 'Department of Statistics Malaysia (DOSM)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.dosm.gov.my/',
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
    isOfficial: false,
    medianDefinitionZh: '受僱勞工平均工資中位數換算年額估算',
    medianDefinitionEn: 'Estimated Median Annual Wage of Employed Workers',
    sourceNameZh: '越南統計總局 (GSO) 勞動就業報告（估算）',
    sourceNameEn: 'General Statistics Office of Vietnam (GSO Estimate)',
    sourceYear: '2023/2024',
    sourceUrl: 'https://www.gso.gov.vn/',
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
 * Global Income Curve Spline Points (Percentile 0 to 100 vs Annual Income in EUR PPP).
 * 基準來源：世界不平等報告 2026（World Inequality Report 2026, WIR 2026 / WID.world）。
 * 統計口徑：20歲以上成人稅前國民收入，購買力平價歐元 (PPP €，2025年價格)，夫婦平分收入。
 * 核心標竿（WIR 2026）：
 * - 最低 50% 成人平均收入：約 €5,100 PPP 歐元（佔總收入約 8.5%）
 * - p50 中位數：約 €11,400 PPP 歐元 (插值估算)
 * - p90 前 10% 門檻：€65,500 PPP 歐元（前 10% 平均收入約 €159,300，佔總收入約 53%）
 * - p99 前 1% 門檻：€250,300 PPP 歐元
 */
export const GLOBAL_INCOME_SPLINE_PPP: Array<{ percentile: number; incomeEurPpp: number }> = [
  { percentile: 0.0, incomeEurPpp: 0 }, // 起始點
  { percentile: 1.0, incomeEurPpp: 650 }, // 插值估算
  { percentile: 5.0, incomeEurPpp: 1500 }, // 插值估算
  { percentile: 10.0, incomeEurPpp: 2400 }, // 插值估算
  { percentile: 20.0, incomeEurPpp: 3950 }, // 插值估算
  { percentile: 30.0, incomeEurPpp: 5700 }, // 插值估算
  { percentile: 40.0, incomeEurPpp: 8100 }, // 插值估算
  { percentile: 50.0, incomeEurPpp: 11400 }, // 插值估算（令最低 50% 平均收入符合 WIR 2026 之約 €5,100）
  { percentile: 60.0, incomeEurPpp: 17200 }, // 插值估算
  { percentile: 70.0, incomeEurPpp: 25500 }, // 插值估算
  { percentile: 75.0, incomeEurPpp: 31000 }, // 插值估算
  { percentile: 80.0, incomeEurPpp: 39500 }, // 插值估算
  { percentile: 85.0, incomeEurPpp: 50500 }, // 插值估算
  { percentile: 90.0, incomeEurPpp: 65500 }, // WIR 2026 基準：全球前 10% 門檻 (PPP €/成人)
  { percentile: 92.0, incomeEurPpp: 80500 }, // 插值估算
  { percentile: 95.0, incomeEurPpp: 115000 }, // 插值估算
  { percentile: 97.0, incomeEurPpp: 154000 }, // 插值估算
  { percentile: 98.0, incomeEurPpp: 190000 }, // 插值估算
  { percentile: 99.0, incomeEurPpp: 250300 }, // WIR 2026 基準：全球前 1% 門檻 (PPP €/成人)
  { percentile: 99.5, incomeEurPpp: 390000 }, // 插值估算
  { percentile: 99.9, incomeEurPpp: 750000 }, // 插值估算 (全球前 0.1% 門檻)
  { percentile: 99.99, incomeEurPpp: 2300000 }, // 插值估算 (全球前 0.01% 門檻)
  { percentile: 100.0, incomeEurPpp: 50000000 }, // 插值估算上限
];

/**
 * Global Income Curve Spline in Nominal USD (market exchange rates).
 * 說明：市場匯率所得分配欠缺單一官方權威全球統計，以下曲線為粗略估算，僅供參考。
 */
export const GLOBAL_INCOME_SPLINE_NOMINAL: Array<{ percentile: number; incomeUsdNominal: number }> = [
  { percentile: 0.0, incomeUsdNominal: 0 }, // 粗略估算，僅供參考
  { percentile: 5.0, incomeUsdNominal: 160 }, // 粗略估算，僅供參考
  { percentile: 10.0, incomeUsdNominal: 380 }, // 粗略估算，僅供參考
  { percentile: 20.0, incomeUsdNominal: 850 }, // 粗略估算，僅供參考
  { percentile: 30.0, incomeUsdNominal: 1350 }, // 粗略估算，僅供參考
  { percentile: 40.0, incomeUsdNominal: 2050 }, // 粗略估算，僅供參考
  { percentile: 50.0, incomeUsdNominal: 3100 }, // 粗略估算，僅供參考
  { percentile: 60.0, incomeUsdNominal: 5200 }, // 粗略估算，僅供參考
  { percentile: 70.0, incomeUsdNominal: 9800 }, // 粗略估算，僅供參考
  { percentile: 80.0, incomeUsdNominal: 21000 }, // 粗略估算，僅供參考
  { percentile: 85.0, incomeUsdNominal: 35000 }, // 粗略估算，僅供參考
  { percentile: 90.0, incomeUsdNominal: 65500 }, // 粗略估算，僅供參考
  { percentile: 95.0, incomeUsdNominal: 115000 }, // 粗略估算，僅供參考
  { percentile: 98.0, incomeUsdNominal: 185000 }, // 粗略估算，僅供參考
  { percentile: 99.0, incomeUsdNominal: 250300 }, // 粗略估算，僅供參考
  { percentile: 99.5, incomeUsdNominal: 390000 }, // 粗略估算，僅供參考
  { percentile: 99.9, incomeUsdNominal: 890000 }, // 粗略估算，僅供參考
  { percentile: 99.99, incomeUsdNominal: 3200000 }, // 粗略估算，僅供參考
  { percentile: 100.0, incomeUsdNominal: 45000000 }, // 粗略估算，僅供參考
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
    titleZh: '全球底層 50% 平均收入',
    titleEn: 'Global Bottom 50% Avg',
    subtitleZh: '年收入 €5,100 PPP (WIR 2026)',
    subtitleEn: '€5,100/yr PPP (WIR 2026)',
    amount: 5100,
    currency: 'EUR',
    period: 'year',
    country: 'DE',
    adults: 1,
    children: 0,
  },
  {
    id: 'global_top_1',
    titleZh: '全球收入前 1% 門檻',
    titleEn: 'Global Top 1% Threshold',
    subtitleZh: '年收入 €250,300 PPP (WIR 2026)',
    subtitleEn: '€250,300/yr PPP (WIR 2026)',
    amount: 250300,
    currency: 'EUR',
    period: 'year',
    country: 'DE',
    adults: 1,
    children: 0,
  },
];
