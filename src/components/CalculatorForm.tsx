import React from 'react';
import {
  CalculationMode,
  ComparisonMethod,
  Language,
  Period,
  PresetScenario,
} from '../types';
import { COUNTRIES, CURRENCIES, PRESET_SCENARIOS } from '../data/economicData';
import { getTranslation } from '../i18n/translations';
import {
  Coins,
  DollarSign,
  Info,
  Minus,
  Plus,
  Sparkles,
  Users,
} from 'lucide-react';

interface CalculatorFormProps {
  lang: Language;
  mode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
  amount: number;
  onAmountChange: (val: number) => void;
  currencyCode: string;
  onCurrencyChange: (curr: string) => void;
  countryCode: string;
  onCountryChange: (country: string) => void;
  period: Period;
  onPeriodChange: (p: Period) => void;
  adults: number;
  onAdultsChange: (count: number) => void;
  children: number;
  onChildrenChange: (count: number) => void;
  method: ComparisonMethod;
  onMethodChange: (m: ComparisonMethod) => void;
  onSelectPreset: (preset: PresetScenario) => void;
  isHousehold: boolean;
  onHouseholdToggle: (val: boolean) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  lang,
  mode,
  onModeChange,
  amount,
  onAmountChange,
  currencyCode,
  onCurrencyChange,
  countryCode,
  onCountryChange,
  period,
  onPeriodChange,
  adults,
  onAdultsChange,
  children,
  onChildrenChange,
  method,
  onMethodChange,
  onSelectPreset,
  isHousehold,
  onHouseholdToggle,
}) => {
  const t = getTranslation(lang);
  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    onAmountChange(isNaN(num) ? 0 : num);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
      {/* Top Mode Segmented Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit">
            <button
              type="button"
              onClick={() => onModeChange('income')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                mode === 'income'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coins className="w-4 h-4 text-indigo-600" />
              <span>{t.modeIncome}</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('wealth')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                mode === 'wealth'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>{t.modeWealth}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {mode === 'income' ? t.incomeTabDesc : t.wealthTabDesc}
          </p>
        </div>

        {/* Quick presets picker */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {t.presetLabel}:
          </span>
          {PRESET_SCENARIOS.slice(0, 4).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPreset(p)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              {lang === 'zh' ? p.titleZh : p.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
        {/* Currency & Amount Input Block */}
        <div className="md:col-span-8 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 tracking-wide">
            {t.amountLabel} ({currentCurrency.code})
          </label>
          <div className="flex rounded-xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all overflow-hidden bg-white">
            {/* Currency selector inside input */}
            <div className="relative border-r border-slate-200 bg-slate-50/70">
              <select
                value={currencyCode}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="h-full pl-3 pr-8 py-3 bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer appearance-none"
                aria-label="Currency"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Amount input text */}
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-mono text-base font-semibold">
                {currentCurrency.symbol}
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={amount === 0 ? '' : amount.toLocaleString('en-US')}
                onChange={handleAmountInput}
                placeholder={t.enterAmountPlaceholder}
                className="w-full pl-10 pr-4 py-3 text-lg sm:text-xl font-bold font-mono text-slate-900 placeholder:text-slate-300 focus:outline-hidden tabular-nums"
              />
            </div>
          </div>
          
          {/* Quick amount increment adjustments */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
            <span className="self-center text-slate-400 font-medium">
              {lang === 'zh' ? '微調：' : 'Adjust:'}
            </span>
            {[10000, 50000, 100000, 500000].map((step) => {
              const displayStep =
                currencyCode === 'TWD' || currencyCode === 'JPY' || currencyCode === 'KRW'
                  ? step * 5
                  : step / 10;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => onAmountChange(Math.max(0, amount + displayStep))}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-mono cursor-pointer"
                >
                  +{displayStep.toLocaleString()}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => onAmountChange(0)}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              {lang === 'zh' ? '清空' : 'Clear'}
            </button>
          </div>
        </div>

        {/* Period Selector (Only in Income mode) */}
        {mode === 'income' ? (
          <div className="md:col-span-4 flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700 tracking-wide">
              {t.periodLabel}
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl h-[48px] items-center">
              {(['year', 'month', 'hour'] as Period[]).map((p) => {
                const label =
                  p === 'year'
                    ? lang === 'zh' ? '年薪' : 'Yearly'
                    : p === 'month'
                    ? lang === 'zh' ? '月薪' : 'Monthly'
                    : lang === 'zh' ? '時薪' : 'Hourly';
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onPeriodChange(p)}
                    className={`h-[40px] text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      period === p
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {period === 'hour'
                ? lang === 'zh' ? '以每年 2,080 工作小時標準折算' : 'Based on 2,080 work hours/year'
                : period === 'month'
                ? lang === 'zh' ? '以每年 12 個月計算' : 'Multiplied by 12 months'
                : lang === 'zh' ? '全年度個人所得' : 'Total annual earnings'}
            </p>
          </div>
        ) : (
          <div className="md:col-span-4 flex flex-col gap-2 justify-center">
            <span className="text-xs font-semibold text-slate-700">
              {lang === 'zh' ? '資產項目' : 'Net Asset Calculation'}
            </span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              {lang === 'zh'
                ? '含房地產、金融資產、銀行存款，扣除房貸與個人信貸總額。'
                : 'Includes real estate, investments, savings, minus mortgage and debts.'}
            </div>
          </div>
        )}

        {/* Country Selector */}
        <div className="md:col-span-6 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 tracking-wide">
            {t.countryLabel}
          </label>
          <div className="relative">
            <select
              value={countryCode}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer appearance-none"
            >
              {Object.values(COUNTRIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {lang === 'zh' ? c.nameZh : c.nameEn}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs">
              ▼
            </div>
          </div>
          <p className="text-[11px] text-slate-500">{t.countryHelp}</p>
        </div>

        {/* Household Configuration */}
        <div className="md:col-span-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 tracking-wide">
              {t.householdTypeLabel}
            </label>
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => onHouseholdToggle(false)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  !isHousehold
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.singleIndividual}
              </button>
              <button
                type="button"
                onClick={() => onHouseholdToggle(true)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  isHousehold
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {t.householdFamily}
                </span>
              </button>
            </div>
          </div>

          {isHousehold ? (
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              {/* Adults stepper */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-600">
                  {t.adultsCount}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-sm font-bold text-slate-900 min-w-4 text-center">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAdultsChange(adults + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Children stepper */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-600">
                  {t.childrenCount}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onChildrenChange(Math.max(0, children - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-sm font-bold text-slate-900 min-w-4 text-center">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={() => onChildrenChange(children + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="col-span-2 text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                {t.oecdScaleNote}
              </div>
            </div>
          ) : (
            <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>
                {lang === 'zh'
                  ? '單身個人計算：1 位成人等效所得權重 1.0'
                  : 'Single earner calculation: 1.0 adult equivalent weight'}
              </span>
            </div>
          )}
        </div>

        {/* Method Toggle: PPP vs Nominal FX */}
        <div className="md:col-span-12 pt-2 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  {t.methodLabel}
                </span>
                <span className="text-xs text-slate-500">
                  {method === 'ppp' ? t.methodPppDesc : t.methodNominalDesc}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => onMethodChange('ppp')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  method === 'ppp'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'zh' ? '購買力平價 (PPP)' : 'Purchasing Power (PPP)'}
              </button>
              <button
                type="button"
                onClick={() => onMethodChange('nominal')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  method === 'nominal'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'zh' ? '名目匯率 (Nominal)' : 'Nominal FX'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
