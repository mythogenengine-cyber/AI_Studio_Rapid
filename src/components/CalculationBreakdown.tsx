import React from 'react';
import {
  CalculationMode,
  CalculationResult,
  ComparisonMethod,
  Language,
  Period,
} from '../types';
import { COUNTRIES, CURRENCIES, EUR_PPP_PER_USD_PPP } from '../data/economicData';
import { getTranslation } from '../i18n/translations';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CalculationBreakdownProps {
  lang: Language;
  mode: CalculationMode;
  method: ComparisonMethod;
  amount: number;
  currencyCode: string;
  countryCode: string;
  period: Period;
  adults: number;
  children: number;
  result: CalculationResult;
}

export const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({
  lang,
  mode,
  method,
  amount,
  currencyCode,
  countryCode,
  period,
  adults,
  result,
}) => {
  const t = getTranslation(lang);
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const country = COUNTRIES[countryCode] || COUNTRIES.TW;
  const safeAdults = Math.max(1, Math.floor(adults || 1));
  const pppRate = currency.pppFactorToUsd || country.pppRate || 1.0;
  const fxRate = currency.rateToUsd || 1.0;

  const formattedTopPercent =
    result.topPercent < 0.1
      ? result.topPercent.toFixed(3)
      : result.topPercent < 1.0
      ? result.topPercent.toFixed(2)
      : result.topPercent.toFixed(1);

  // Currency clean name
  const currNameZh = currency.nameZh.replace(/\s*\(.*?\)/, '');
  const currNameEn = currency.nameEn.replace(/\s*\(.*?\)/, '');

  let step1TextZh = '';
  let step1TextEn = '';
  if (mode === 'wealth') {
    step1TextZh = `家庭淨資產 ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()} ÷ ${safeAdults} 名成人 = 每名成人 ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()}（財富為存量資產，兒童不計）`;
    step1TextEn = `Household net wealth ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()} ÷ ${safeAdults} adult(s) = ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()} per adult (stock asset, children not counted)`;
  } else {
    if (period === 'month') {
      step1TextZh = `月收入 ${currency.symbol}${Math.round(amount).toLocaleString()} × 12 = 年收入 ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()}；÷ ${safeAdults} 名成人 = 每名成人 ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()}（WID 做法：成人平分，兒童不計）`;
      step1TextEn = `Monthly income ${currency.symbol}${Math.round(amount).toLocaleString()} × 12 = Annual income ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()}; ÷ ${safeAdults} adult(s) = ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()} per adult (WID methodology: split equally among adults, children not counted)`;
    } else if (period === 'hour') {
      step1TextZh = `時薪 ${currency.symbol}${Math.round(amount).toLocaleString()} × 2,080 工時 = 年收入 ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()}；÷ ${safeAdults} 名成人 = 每名成人 ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()}（WID 做法：成人平分，兒童不計）`;
      step1TextEn = `Hourly wage ${currency.symbol}${Math.round(amount).toLocaleString()} × 2,080 hours = Annual income ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()}; ÷ ${safeAdults} adult(s) = ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()} per adult (WID methodology: split equally among adults, children not counted)`;
    } else {
      step1TextZh = `年收入 ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()} ÷ ${safeAdults} 名成人 = 每名成人 ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()}（WID 做法：成人平分，兒童不計）`;
      step1TextEn = `Annual income ${currency.symbol}${Math.round(result.annualLocal).toLocaleString()} ÷ ${safeAdults} adult(s) = ${currency.symbol}${Math.round(result.individualEquivalentLocal).toLocaleString()} per adult (WID methodology: split equally among adults, children not counted)`;
    }
  }

  let step2TextZh = '';
  let step2TextEn = '';
  if (mode === 'wealth') {
    step2TextZh = `÷ ${fxRate}（${currNameZh}市場匯率）= $${Math.round(result.annualUsdNominal).toLocaleString()} 美元淨資產`;
    step2TextEn = `÷ ${fxRate} (${currNameEn} FX rate) = $${Math.round(result.annualUsdNominal).toLocaleString()} USD Net Wealth`;
  } else if (method === 'nominal') {
    step2TextZh = `÷ ${fxRate}（${currNameZh}市場匯率）= $${Math.round(result.annualUsdNominal).toLocaleString()} 美元`;
    step2TextEn = `÷ ${fxRate} (${currNameEn} FX rate) = $${Math.round(result.annualUsdNominal).toLocaleString()} USD (Nominal)`;
  } else {
    step2TextZh = `÷ ${pppRate}（${currNameZh}購買力平價系數）= ${Math.round(result.annualUsdPpp).toLocaleString()} 國際元`;
    step2TextEn = `÷ ${pppRate} (${currNameEn} PPP Factor) = ${Math.round(result.annualUsdPpp).toLocaleString()} International Dollars`;
  }

  let step3TextZh = '';
  let step3TextEn = '';
  if (mode === 'wealth') {
    step3TextZh = `對齊瑞銀《全球財富報告 2024》個人淨資產美元口徑`;
    step3TextEn = `Aligned with UBS Global Wealth Report 2024 adult net wealth USD benchmark`;
  } else if (method === 'nominal') {
    step3TextZh = `對齊名目市場匯率所得口徑（粗略估算，未平準物價）`;
    step3TextEn = `Aligned with nominal market FX benchmark (rough estimate, unadjusted for local price levels)`;
  } else {
    step3TextZh = `× ${EUR_PPP_PER_USD_PPP.toFixed(2)}（國際元折合購買力平價歐元，近似值）= €${Math.round(result.annualEurPpp).toLocaleString()}`;
    step3TextEn = `× ${EUR_PPP_PER_USD_PPP.toFixed(2)} (USD PPP to EUR PPP conversion factor, approx.) = €${Math.round(result.annualEurPpp).toLocaleString()}`;
  }

  let step4TextZh = '';
  let step4TextEn = '';
  if (mode === 'wealth') {
    step4TextZh = `放上瑞銀（UBS）全球成人淨資產分配曲線，在節點之間用對數插值 → 全球前 ${formattedTopPercent}%`;
    step4TextEn = `Mapped onto UBS Global Wealth Spline using log interpolation between knots → Top ${formattedTopPercent}% globally`;
  } else if (method === 'nominal') {
    step4TextZh = `放上全球名目市場匯率收入曲線，在節點之間用對數插值 → 全球前 ${formattedTopPercent}%`;
    step4TextEn = `Mapped onto Global Nominal Income Curve using log interpolation between knots → Top ${formattedTopPercent}% globally`;
  } else {
    step4TextZh = `放上 WIR 2026 全球收入曲線，在節點之間用對數插值 → 全球前 ${formattedTopPercent}%`;
    step4TextEn = `Mapped onto WIR 2026 Global Income Curve using log interpolation between knots → Top ${formattedTopPercent}% globally`;
  }

  const steps = [
    {
      num: 1,
      title: lang === 'zh' ? '第 1 步' : 'Step 1',
      desc: lang === 'zh' ? step1TextZh : step1TextEn,
    },
    {
      num: 2,
      title: lang === 'zh' ? '第 2 步' : 'Step 2',
      desc: lang === 'zh' ? step2TextZh : step2TextEn,
    },
    {
      num: 3,
      title: lang === 'zh' ? '第 3 步' : 'Step 3',
      desc: lang === 'zh' ? step3TextZh : step3TextEn,
    },
    {
      num: 4,
      title: lang === 'zh' ? '第 4 步' : 'Step 4',
      desc: lang === 'zh' ? step4TextZh : step4TextEn,
      isFinal: true,
    },
  ];

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 lg:p-7 shadow-xs">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200/80 mb-5">
        <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {t.breakdownTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.breakdownSubtitle}
          </p>
        </div>
      </div>

      <div className="space-y-3 font-mono text-xs sm:text-sm">
        {steps.map((step) => (
          <div
            key={step.num}
            className={`p-3.5 sm:p-4 rounded-xl border transition-colors flex items-start gap-3 ${
              step.isFinal
                ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-semibold'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step.isFinal
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {step.num}
            </div>

            <div className="flex-1 leading-relaxed">
              <span className="font-bold text-slate-500 mr-2 font-sans text-xs uppercase tracking-wider">
                {step.title}：
              </span>
              <span>{step.desc}</span>
            </div>

            {step.isFinal && (
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 self-center hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
        <span>
          {lang === 'zh'
            ? '💡 每一步的系數均從程式實際運算的常數直接讀取，完全透明開放。'
            : '💡 All conversion factors are dynamically referenced from economic constants.'}
        </span>
        <span className="text-indigo-600 font-medium">
          {lang === 'zh' ? '無黑箱 · 零 AI 調用' : 'Transparent Math · Zero AI'}
        </span>
      </div>
    </div>
  );
};
