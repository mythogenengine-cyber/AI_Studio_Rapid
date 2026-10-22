import { Language } from '../types';

export const TRANSLATIONS = {
  zh: {
    // Header & Brand
    appTitle: '全球收入排名計算器',
    appBadge: '資料鎖定基準：2026年10月 · 純靜態離線演算法 (免 API Key / 零 AI 調用)',
    noApiKeyBadge: '免 API KEY · 純本機運算',
    subtitle: '探索你的收入與財富在全世界 81 億人口中的精確百分位坐標（已鎖定最新經濟學標竿，絕不消耗 AI Token）',
    switchLang: 'English',
    
    // Modes & Tabs
    modeIncome: '個人／家庭收入',
    modeWealth: '淨資產財富',
    incomeTabDesc: '評估年度工作報酬與家庭可支配所得',
    wealthTabDesc: '評估個人總資產扣除負債後的淨值',
    
    // Form Inputs
    amountLabel: '金額',
    enterAmountPlaceholder: '請輸入金額...',
    currencyLabel: '計價幣別',
    periodLabel: '計算週期',
    periodYear: '年薪 (Yearly)',
    periodMonth: '月薪 (Monthly)',
    periodHour: '時薪 (Hourly)',
    
    countryLabel: '居住國家／地區',
    countryHelp: '用於計算該國在地所得百分位與購買力平價 (PPP) 係數',
    
    householdTypeLabel: '人口配置',
    singleIndividual: '個人單身',
    householdFamily: '家庭戶',
    adultsCount: '成人人數 (18歲以上)',
    childrenCount: '孩童人數 (18歲以下)',
    oecdScaleNote: '採用 OECD 等效規模標準化：首位成人 1.0，其他成人 0.5，孩童 0.3',
    
    methodLabel: '比較標準',
    methodPpp: '購買力平價 (PPP) · 推薦',
    methodPppDesc: '調整各國物價差異，反映實質生活水平',
    methodNominal: '名目市場匯率',
    methodNominalDesc: '按純外匯兌換美元計算國際金融力',
    
    presetLabel: '快速帶入範例',
    
    // Results
    resultHeading: '全球排名分析',
    youAreInTop: '您位列全球前',
    ofGlobalEarners: '收入群體',
    ofGlobalWealth: '財富群體',
    rankSummaryPre: '在全球',
    totalPopulationUnit: '人口中，約有',
    richerThanYou: '人收入高於您',
    richerWealthThanYou: '人財富高於您',
    poorerThanYou: '人的所得不及您',
    poorerWealthThanYou: '人的財富不及您',
    
    // Key Stats Grid
    statVsMedianTitle: '全球中位數倍數',
    statVsMedianSub: '全球成年人收入中位數為 $3,920 PPP/年',
    statVsMedianWealthSub: '全球成年人淨資產中位數為 $9,000 USD',
    statVsPovertyTitle: '超越極端貧窮線',
    statVsPovertySub: '世界銀行貧窮線 $2.15/天 ($785/年)',
    statDailyRateTitle: '每日等效所得',
    statHourlyRateTitle: '每小時等效所得',
    statDomesticRankTitle: '在地國家排名',
    statDomesticRankSub: '在所選居住地的所得百分位',
    
    // Tiers
    tier_ultra_rich: '全球超富豪階層 (Top 0.05%)',
    tier_top_1: '全球前 1% 菁英階層 (The Global 1%)',
    tier_top_5: '全球高收入階層 (Top 5%)',
    tier_top_10: '全球前 10% 富裕層 (Global Top Decile)',
    tier_top_20: '全球前五分之一 (Upper Tier)',
    tier_middle_class: '全球中產階級 (Global Middle Tier)',
    tier_lower_middle: '新興經濟體中堅 (Lower Middle)',
    tier_base: '基礎收入群體 (Global Base Tier)',
    
    // Insights & Perspective
    insightsTitle: '全球不平等觀察視角',
    insight1Title: '為什麼收入在國內感覺普通，在全球卻名列前茅？',
    insight1Desc: '已開發國家（如台灣、日本、歐美）擁有高生產力與健全基礎設施。全球 81 億人口中，約一半人口每天生活費低於 10.7 美元。因此只要在成熟經濟體具備穩定全職工作，往往即落在全球前 10%～15% 之內。',
    insight2Title: '購買力平價 (PPP) 如何影響你的名次？',
    insight2Desc: '在台灣或東南亞，餐飲、醫療與日常服務價格低於歐美，同等金額能在當地買到更多物資。世界銀行 PPP 係數將各國物價平準化為國際美元，還原您的實質生活富足度。',
    insight3Title: '如果將收入換算成工時',
    insight3Desc: '全球中位數工人需要全職工作約 {years} 年，才能賺取您一年的所得。',
    
    // Distribution Curve
    curveTitle: '全球收入分布曲線 (Log-Pareto Distribution)',
    curveSubtitle: '觀察世界人口的收入累積狀況，即時移動標記試算',
    curveXAxis: '年收入 (USD PPP)',
    curveYAxis: '人口密度',
    curveYourPosition: '您目前的位置',
    curveMedianLabel: '全球中位數 $3,920',
    curveTop10Label: '前 10% 門檻 $38k',
    curveTop1Label: '前 1% 門檻 $130k',
    curveInteractivePrompt: '點擊或滑動曲線上的任意點，查看不同收入對應的全球排名：',
    simulatedIncome: '模擬年薪：',
    simulatedPercentile: '對應全球名次：',
    
    // Country Benchmarks Table
    tableTitle: '跨國所得對比看板',
    tableSubtitle: '您的年收入在不同國家相當於什麼水準？',
    colCountry: '國家／地區',
    colMedianIncome: '該國中位數年薪',
    colYourEquivalent: '您的換算收入',
    colDomesticPercentile: '在該國預估百分位',
    colLivingStandard: '相對水準評估',
    levelVeryHigh: '高收入階層 (Top 10%)',
    levelHigh: '中上階層 (Top 25%)',
    levelMedian: '中位數水準 (Around Median)',
    levelModest: '中低階層 (Below Median)',
    
    // Wealth Pyramid
    pyramidTitle: '全球財富分配金字塔',
    pyramidSubtitle: '根據 UBS / Credit Suisse 全球財富報告最新數據',
    pyramidTop1: '頂層 1% (資產 > $1,150,000 USD)',
    pyramidTop1Share: '掌握全球約 43% 的總財富，佔成年人口 1%',
    pyramidTop10: '富裕層 9% (資產 $140,000 ~ $1,150,000 USD)',
    pyramidTop10Share: '掌握全球約 32% 的財富，合計前 10% 囊括 75%',
    pyramidMiddle: '中產階級 40% (資產 $9,000 ~ $140,000 USD)',
    pyramidMiddleShare: '掌握全球約 24% 的財富',
    pyramidBottom: '基層 50% (資產 < $9,000 USD)',
    pyramidBottomShare: '僅掌握全球不足 1% 的財富',
    
    // Actions & Modals
    shareBtn: '分享結果卡片',
    methodologyBtn: '資料來源與計算方法',
    copySuccess: '已複製分析摘要到剪貼簿！',
    copyBtn: '複製文字結果',
    closeBtn: '關閉',
    
    // Methodology Content
    methodologyTitle: '資料來源與經濟學模型說明 (100% 離線純本機運算)',
    sourceNoApiKey: '⚡ 零 API KEY 保證：本系統所有百分位與國別對照皆為 100% 本地 JavaScript 計量經濟學插值運算，所有 WID、世界銀行、OECD 與各國匯率係數已完整鎖定於前端靜態數據庫（基準日：2026 年 10 月 21 日），完全不調用任何後端 AI 模型或付費 API，不會產生任何 AI Token 費用。',
    sourceWID: '1. 世界不平等資料庫 (World Inequality Database, WID.world)：提供全球所得與財富分配的最新百分位數據（2022-2026 年監測）。',
    sourceWB: '2. 世界銀行貧窮與不平等平台 (World Bank PIP)：提供各國國際購買力平價 (PPP) 係數、極端貧窮線 ($2.15/天) 與各階層中位數基準。',
    sourceUBS: '3. 瑞銀全球財富報告 (UBS Global Wealth Report)：提供世界各國成年人淨資產分布與百萬美元富翁人數統計。',
    sourceOECD: '4. OECD 修改型等效規模 (Modified OECD Scale)：計算家庭戶每人實質享有的規模經濟消費力。',
    methodologyNotice: '注意：全球統計因部分低所得國家普查數據間隔可能有些微抽樣誤差，本計算器採用最新平滑對數與帕累托分布 (Pareto Tail) 插值模型，結果為學術與政策研究界公認的高精度宏觀估算。',
  },
  
  en: {
    // Header & Brand
    appTitle: 'Global Income Rank Calculator',
    appBadge: 'Data As Of: Oct 2026 · 100% Offline Algorithm (No API Key / Zero AI Calls)',
    noApiKeyBadge: 'NO API KEY · 100% Local Math',
    subtitle: 'Discover where your income and wealth place you among 8.1 billion people (Frozen benchmarks, zero AI token cost)',
    switchLang: '繁體中文',
    
    // Modes & Tabs
    modeIncome: 'Income Rank',
    modeWealth: 'Net Wealth Rank',
    incomeTabDesc: 'Assess annual salary and household disposable earnings',
    wealthTabDesc: 'Assess net assets after subtracting debts and liabilities',
    
    // Form Inputs
    amountLabel: 'Amount',
    enterAmountPlaceholder: 'Enter your amount...',
    currencyLabel: 'Currency',
    periodLabel: 'Payment Frequency',
    periodYear: 'Yearly',
    periodMonth: 'Monthly',
    periodHour: 'Hourly',
    
    countryLabel: 'Country of Residence',
    countryHelp: 'Used for domestic income rank and Purchasing Power Parity (PPP) adjustment',
    
    householdTypeLabel: 'Household Composition',
    singleIndividual: 'Single Adult',
    householdFamily: 'Household',
    adultsCount: 'Adults (18+)',
    childrenCount: 'Children (<18)',
    oecdScaleNote: 'Adjusted with OECD equivalence scale: 1.0 for first adult, 0.5 for extra adult, 0.3 per child',
    
    methodLabel: 'Comparison Standard',
    methodPpp: 'Purchasing Power Parity (PPP) · Recommended',
    methodPppDesc: 'Accounts for local cost of living to reflect real purchasing power',
    methodNominal: 'Market FX (Nominal USD)',
    methodNominalDesc: 'Direct currency conversion to USD for international purchasing',
    
    presetLabel: 'Quick Scenarios',
    
    // Results
    resultHeading: 'Global Percentile Analysis',
    youAreInTop: 'You are in the top',
    ofGlobalEarners: 'of global income earners',
    ofGlobalWealth: 'of global wealth holders',
    rankSummaryPre: 'Out of',
    totalPopulationUnit: 'people worldwide, approximately',
    richerThanYou: 'people earn more than you',
    richerWealthThanYou: 'people own more wealth than you',
    poorerThanYou: 'people earn less than you',
    poorerWealthThanYou: 'people own less wealth than you',
    
    // Key Stats Grid
    statVsMedianTitle: 'vs Global Median',
    statVsMedianSub: 'Global adult median is $3,920 PPP/yr',
    statVsMedianWealthSub: 'Global adult net wealth median is $9,000 USD',
    statVsPovertyTitle: 'vs Extreme Poverty Line',
    statVsPovertySub: 'World Bank threshold: $2.15/day ($785/yr)',
    statDailyRateTitle: 'Daily Equivalent',
    statHourlyRateTitle: 'Hourly Equivalent',
    statDomesticRankTitle: 'Domestic Rank',
    statDomesticRankSub: 'Income percentile in your country',
    
    // Tiers
    tier_ultra_rich: 'Global Ultra-Elite (Top 0.05%)',
    tier_top_1: 'The Global 1% Elite',
    tier_top_5: 'Global Upper Tier (Top 5%)',
    tier_top_10: 'Global Top Decile (Top 10%)',
    tier_top_20: 'Upper Middle Tier (Top 20%)',
    tier_middle_class: 'Global Middle Class',
    tier_lower_middle: 'Developing Base (Lower Middle)',
    tier_base: 'Global Base Tier',
    
    // Insights & Perspective
    insightsTitle: 'Global Inequality Perspective',
    insight1Title: 'Why do average local earnings rank so high globally?',
    insight1Desc: 'Advanced economies feature advanced productivity, stable institutions, and high capital. Half of the world lives on less than $10.70 a day. A median wage in an OECD economy consistently lands in the global top 10%–15%.',
    insight2Title: 'How does Purchasing Power Parity (PPP) work?',
    insight2Desc: 'Goods and services cost substantially less in many regions. The World Bank PPP factor converts earnings into international dollars to benchmark what your money actually buys in local lifestyle terms.',
    insight3Title: 'Earnings over a lifetime',
    insight3Desc: 'A typical global median worker would need to work for {years} years to earn your annual income.',
    
    // Distribution Curve
    curveTitle: 'Global Income Distribution Curve (Log-Pareto)',
    curveSubtitle: 'Explore the population distribution and simulate custom income levels',
    curveXAxis: 'Annual Income (USD PPP)',
    curveYAxis: 'Population Density',
    curveYourPosition: 'Your Position',
    curveMedianLabel: 'Global Median $3,920',
    curveTop10Label: 'Top 10% $38k',
    curveTop1Label: 'Top 1% $130k',
    curveInteractivePrompt: 'Click or drag along the curve to see the global percentile at any income level:',
    simulatedIncome: 'Simulated Annual Income: ',
    simulatedPercentile: 'Global Standing: ',
    
    // Country Benchmarks Table
    tableTitle: 'Cross-Country Comparison Matrix',
    tableSubtitle: 'Where would your earnings place you in other nations?',
    colCountry: 'Country / Region',
    colMedianIncome: 'National Median Annual',
    colYourEquivalent: 'Your Income in Local FX',
    colDomesticPercentile: 'Estimated National Rank',
    colLivingStandard: 'Relative Classification',
    levelVeryHigh: 'Upper Class (Top 10%)',
    levelHigh: 'Upper Middle (Top 25%)',
    levelMedian: 'Around Median Level',
    levelModest: 'Below National Median',
    
    // Wealth Pyramid
    pyramidTitle: 'Global Wealth Pyramid',
    pyramidSubtitle: 'Calibrated with UBS / Credit Suisse Global Wealth Data',
    pyramidTop1: 'The Top 1% (Assets > $1,150,000 USD)',
    pyramidTop1Share: 'Controls ~43% of total global assets',
    pyramidTop10: 'The Wealthy 9% (Assets $140k ~ $1.15M USD)',
    pyramidTop10Share: 'Controls ~32% of total wealth (Top 10% owns 75%)',
    pyramidMiddle: 'Middle Class 40% (Assets $9,000 ~ $140,000 USD)',
    pyramidMiddleShare: 'Controls ~24% of global wealth',
    pyramidBottom: 'Bottom 50% (Assets < $9,000 USD)',
    pyramidBottomShare: 'Controls less than 1% of total world wealth',
    
    // Actions & Modals
    shareBtn: 'Share Summary Card',
    methodologyBtn: 'Sources & Methodology',
    copySuccess: 'Copied ranking summary to clipboard!',
    copyBtn: 'Copy Summary Text',
    closeBtn: 'Close',
    
    // Methodology Content
    methodologyTitle: 'Data Sources & Econometric Modeling (100% Offline Local Engine)',
    sourceNoApiKey: '⚡ ZERO API KEY GUARANTEE: All percentiles, purchasing power parity adjustments, and country benchmarks run 100% locally in your browser via econometric interpolation. All WID, World Bank, OECD, and FX exchange rates are permanently frozen in the local frontend bundle (as of October 21, 2026). Zero backend AI model calls, zero API keys required, and zero token costs.',
    sourceWID: '1. World Inequality Database (WID.world): Provides latest empirical percentile thresholds and global income distribution curves.',
    sourceWB: '2. World Bank Poverty & Inequality Platform (PIP): Provides Purchasing Power Parity (PPP) conversion indices, poverty lines ($2.15/day), and international median benchmarks.',
    sourceUBS: '3. UBS Global Wealth Report: Global adult net wealth percentiles and millionaire population counts.',
    sourceOECD: '4. Modified OECD Equivalence Scale: Normalizes household earnings for economy of scale (1.0 first adult, 0.5 extra adult, 0.3 child).',
    methodologyNotice: 'Notice: Calculations use continuous log-splines and Pareto tail extrapolation calibrated to 2024-2026 international economic data. Figures are macroscopic estimates designed for educational and comparative analysis.',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.en;

export function getTranslation(lang: Language) {
  return TRANSLATIONS[lang];
}
