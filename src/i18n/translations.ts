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
    oecdScaleNote: '依 WID 規範：家庭收入平均分攤給家中所有成年人，兒童不計入分攤',
    singleIndividualNote: '單身個人計算：1 位成人',
    
    methodLabel: '比較標準',
    methodPpp: '購買力平價 (PPP) · 推薦',
    methodPppDesc: '調整各國物價差異，反映實質生活水平',
    methodNominal: '名目市場匯率 (粗略估算，僅供參考)',
    methodNominalDesc: '按純外匯兌換美元計算國際金融力（欠缺權威全球分布統計，僅供粗略參考）',
    
    presetLabel: '快速帶入範例',
    
    // Results
    resultHeading: '全球排名分析',
    youAreInTop: '您位列全球前',
    ofGlobalEarners: '收入群體 (以全球成年人口計)',
    ofGlobalWealth: '財富群體 (以全球成年人口計)',
    rankSummaryPre: '在全球',
    totalPopulationUnit: '成年人口中，約有',
    richerThanYou: '人收入高於您',
    richerWealthThanYou: '人財富高於您',
    poorerThanYou: '人的所得不及您',
    poorerWealthThanYou: '人的財富不及您',
    
    // Key Stats Grid
    statVsMedianTitle: '全球收入基準倍數',
    statVsMedianSub: '相對於全球最低 50% 成人平均收入 €5,100（WIR 2026）',
    statVsMedianWealthSub: '全球成年人淨資產中位數為 $9,000 USD',
    statVsPovertyTitle: '超越極端貧窮線',
    statVsPovertySub: '世界銀行貧窮線 $3.00/天 ($1,095/年，2021 PPP)',
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
    insight1Desc: '已開發國家（如台灣、日本、歐美）擁有高生產力與健全基礎設施。全球一半人口每天生活費非常低。因此只要在成熟經濟體具備穩定全職工作，往往即落在全球前 10%～20% 之內。',
    insight2Title: '購買力平價 (PPP) 的限制與注意事項',
    insight2Desc: '購買力平價按全國平均消費籃子計算。如果你收入中租金或外食佔比較高，實際購買力會比換算結果低。',
    insight3Title: '如果將收入換算成工時',
    insight3Desc: '全球最低 50% 平均收入的成年人需要全職工作約 {years} 年，才能賺取您一年的所得。',
    
    // Unmeasured Box (這個排名量不到的事)
    unmeasuredTitle: '這個排名量不到的事',
    unmeasured1: '1. 排名只比較收入，不比較生活。全球一半人收入很低，所以已發展地區的打工仔幾乎一定排得高。',
    unmeasured2: '2. 購買力平價用平均物價，租金和外食的比重偏低。',
    unmeasured3: '3. 量不到質素下降：份量變小、預製化，都不會算成加價。',
    unmeasured4: '4. 量不到樓價。收入排名高，不代表買得起居所。',
    unmeasured5: '5. 這是單一時點的排名，不代表你比十年前過得好。',
    
    // Distribution Curve
    curveTitle: '全球收入分布曲線 (Log-Pareto Distribution)',
    curveSubtitle: '觀察世界人口的收入累積狀況，即時移動標記試算',
    curveXAxis: '年收入 (EUR PPP)',
    curveYAxis: '人口密度',
    curveYourPosition: '您目前的位置',
    curveMedianLabel: '底層 50% 均值 €5,100',
    curveTop10Label: '前 10% 門檻 €65.5k',
    curveTop1Label: '前 1% 門檻 €250.3k',
    curveInteractivePrompt: '點擊或滑動曲線上的任意點，查看不同收入對應的全球排名：',
    simulatedIncome: '模擬年薪：',
    simulatedPercentile: '對應全球名次：',
    
    // Country Benchmarks Table
    tableTitle: '跨國所得對比看板',
    tableSubtitle: '您的年收入在不同國家相當於什麼水準？',
    colCountry: '國家／地區',
    colMedianIncome: '該國中位數年薪／收入',
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
    sourceWID: '1. 世界不平等資料庫 (World Inequality Database, WID.world) / 世界不平等報告 2026：提供全球成人稅前國民收入（購買力平價歐元，2025 年價格）最新百分位數據，全球前 10% 門檻為 €65,500 PPP，前 1% 門檻為 €250,300 PPP。',
    sourceWB: '2. 世界銀行貧窮與不平等平台 (World Bank PIP)：提供各國國際購買力平價 (PPP) 係數與極端貧窮線基準（$3.00/天，2021 PPP）。',
    sourceUBS: '3. 瑞銀全球財富報告 (UBS Global Wealth Report)：提供世界各國成年人淨資產分布與百萬美元富翁人數統計。',
    sourceOECD: '4. WID 成人平等分攤原則：家庭收入由家中成年人人數平均分攤，兒童不計入分攤。',
    methodologyNotice: '注意：結果為依公開報告數字插值的粗略估算，誤差可以很大。',
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
    oecdScaleNote: 'Per WID methodology: household income is split equally among adults only; children are not counted',
    singleIndividualNote: 'Single adult calculation: 1 adult',
    
    methodLabel: 'Comparison Standard',
    methodPpp: 'Purchasing Power Parity (PPP) · Recommended',
    methodPppDesc: 'Accounts for local cost of living to reflect real purchasing power',
    methodNominal: 'Market FX (Rough Estimate, For Reference Only)',
    methodNominalDesc: 'Direct currency conversion to USD (Rough estimate, for reference only)',
    
    presetLabel: 'Quick Scenarios',
    
    // Results
    resultHeading: 'Global Percentile Analysis',
    youAreInTop: 'You are in the top',
    ofGlobalEarners: 'of global income earners (among global adults)',
    ofGlobalWealth: 'of global wealth holders (among global adults)',
    rankSummaryPre: 'Out of',
    totalPopulationUnit: 'adults worldwide, approximately',
    richerThanYou: 'people earn more than you',
    richerWealthThanYou: 'people own more wealth than you',
    poorerThanYou: 'people earn less than you',
    poorerWealthThanYou: 'people own less wealth than you',
    
    // Key Stats Grid
    statVsMedianTitle: 'vs Global Income Benchmark',
    statVsMedianSub: 'vs Bottom 50% average income: €5,100 (WIR 2026)',
    statVsMedianWealthSub: 'Global adult net wealth median is $9,000 USD',
    statVsPovertyTitle: 'vs Extreme Poverty Line',
    statVsPovertySub: 'World Bank threshold: $3.00/day ($1,095/yr, 2021 PPP)',
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
    insight1Desc: 'Advanced economies feature advanced productivity, stable institutions, and high capital. Half of the world lives on very low income. A stable wage in a developed economy almost always lands in the global top 10%–20%.',
    insight2Title: 'Purchasing Power Parity (PPP) Caveats',
    insight2Desc: 'Purchasing power parity is calculated based on a national average consumption basket. If rent or eating out accounts for a high share of your spending, your actual purchasing power will be lower than the converted result.',
    insight3Title: 'Earnings over a lifetime',
    insight3Desc: 'An adult earning the global bottom 50% average would need to work for {years} years to earn your annual income.',
    
    // Unmeasured Box (這個排名量不到的事)
    unmeasuredTitle: 'What this ranking cannot measure',
    unmeasured1: '1. The ranking only compares income, not quality of life. Half the world earns very little, so workers in developed economies almost always rank high.',
    unmeasured2: '2. PPP uses national average price baskets; weights for rent and dining out are often understated for urban workers.',
    unmeasured3: '3. Cannot measure quality shrinkflation: smaller portions and processed ingredients do not show up as price increases.',
    unmeasured4: '4. Cannot measure housing property prices. A high income rank does not mean you can afford a home.',
    unmeasured5: '5. This is a point-in-time cross-sectional ranking; it does not mean your life is better than ten years ago.',
    
    // Distribution Curve
    curveTitle: 'Global Income Distribution Curve (Log-Pareto)',
    curveSubtitle: 'Explore the population distribution and simulate custom income levels',
    curveXAxis: 'Annual Income (EUR PPP)',
    curveYAxis: 'Population Density',
    curveYourPosition: 'Your Position',
    curveMedianLabel: 'Bottom 50% Avg €5,100',
    curveTop10Label: 'Top 10% €65.5k',
    curveTop1Label: 'Top 1% €250.3k',
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
    sourceWID: '1. World Inequality Database (WID.world) / World Inequality Report 2026: Adult pre-tax national income (EUR PPP, 2025 prices). Global top 10% threshold: €65,500 PPP; top 1% threshold: €250,300 PPP.',
    sourceWB: '2. World Bank Poverty & Inequality Platform (PIP): Purchasing Power Parity (PPP) conversion indices and extreme poverty line ($3.00/day, 2021 PPP).',
    sourceUBS: '3. UBS Global Wealth Report: Global adult net wealth percentiles and millionaire population counts.',
    sourceOECD: '4. WID Equal Adult Sharing: Household income is divided equally among adults only; children are not counted.',
    methodologyNotice: 'Notice: Results are rough estimates interpolated from published report benchmarks; margins of error can be significant.',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.en;

export function getTranslation(lang: Language) {
  return TRANSLATIONS[lang];
}
