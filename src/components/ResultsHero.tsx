import React from 'react';
import { CalculationMode, CalculationResult, Language } from '../types';
import { COUNTRIES, CURRENCIES } from '../data/economicData';
import { formatCurrency, formatPopulationCount } from '../utils/calculator';
import { getTranslation } from '../i18n/translations';
import {
  Award,
  Calendar,
  Clock,
  Compass,
  MapPin,
  Share2,
  TrendingUp,
} from 'lucide-react';

interface ResultsHeroProps {
  lang: Language;
  mode: CalculationMode;
  result: CalculationResult;
  currencyCode: string;
  countryCode: string;
  onOpenShare: () => void;
}

export const ResultsHero: React.FC<ResultsHeroProps> = ({
  lang,
  mode,
  result,
  currencyCode,
  countryCode,
  onOpenShare,
}) => {
  const t = getTranslation(lang);
  const country = COUNTRIES[countryCode] || COUNTRIES.TW;
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  // Format top percent: if < 0.1%, show up to 3 decimals, otherwise 1-2 decimals
  const formattedTopPercent =
    result.topPercent < 0.1
      ? result.topPercent.toFixed(3)
      : result.topPercent < 1.0
      ? result.topPercent.toFixed(2)
      : result.topPercent.toFixed(1);

  const formattedDomesticTop =
    result.domesticTopPercent < 1.0
      ? result.domesticTopPercent.toFixed(2)
      : result.domesticTopPercent.toFixed(1);

  const tierText = t[`tier_${result.tierKey}` as keyof typeof t] || t.tier_top_10;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
      {/* Top Header Row with Tier & Share */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>{tierText}</span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="text-slate-500 lowercase">
            {lang === 'zh'
              ? mode === 'income'
                ? `折合年收入 €${Math.round(result.annualEurPpp).toLocaleString()} EUR PPP`
                : `折合淨資產 $${Math.round(result.annualUsdPpp).toLocaleString()} USD`
              : mode === 'income'
                ? `€${Math.round(result.annualEurPpp).toLocaleString()} EUR PPP equiv.`
                : `$${Math.round(result.annualUsdPpp).toLocaleString()} USD equiv.`}
          </span>
        </div>

        <button
          onClick={onOpenShare}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t.shareBtn}</span>
        </button>
      </div>

      {/* Hero Rank Headline */}
      <div className="pt-6 pb-8 text-center sm:text-left">
        <p className="text-sm font-medium text-slate-500 mb-1">
          {t.resultHeading}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            {t.youAreInTop}{' '}
            <span className="text-indigo-600 tabular-nums">
              {formattedTopPercent}%
            </span>
          </h1>
          <span className="text-lg sm:text-xl font-medium text-slate-600">
            {mode === 'income' ? t.ofGlobalEarners : t.ofGlobalWealth}
          </span>
        </div>

        {/* Narrative summary */}
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.rankSummaryPre}{' '}
          <strong className="text-slate-900 font-semibold tabular-nums">
            {formatPopulationCount(result.totalWorldPopulation, lang)}
          </strong>{' '}
          {t.totalPopulationUnit}{' '}
          <strong className="text-indigo-700 font-semibold tabular-nums">
            {formatPopulationCount(result.richerCountEstimate, lang)}
          </strong>{' '}
          {mode === 'income' ? t.richerThanYou : t.richerWealthThanYou}
          ，
          <strong className="text-slate-900 font-semibold tabular-nums">
            {formatPopulationCount(result.poorerCountEstimate, lang)}
          </strong>{' '}
          {mode === 'income' ? t.poorerThanYou : t.poorerWealthThanYou}。
        </p>
      </div>

      {/* Global Percentile Bar Visualizer */}
      <div className="mb-8 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
          <span>0% ({lang === 'zh' ? '底層' : 'Lowest'})</span>
          <span>50% ({lang === 'zh' ? '底層50%均值 €5.1k' : 'Bottom 50% Avg €5.1k'})</span>
          <span>90% ({lang === 'zh' ? '前 10% €65.5k' : 'Top 10% €65.5k'})</span>
          <span className="text-indigo-700 font-bold">99% ({lang === 'zh' ? '前 1% €250.3k' : 'Top 1% €250.3k'})</span>
        </div>

        {/* Percentile track */}
        <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-slate-400 via-indigo-500 to-indigo-600 transition-all duration-700 rounded-full"
            style={{ width: `${Math.min(100, Math.max(1, result.globalPercentile))}%` }}
          />
        </div>

        {/* Position marker tag */}
        <div className="relative w-full mt-2 h-6">
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-700"
            style={{
              left: `${Math.min(96, Math.max(4, result.globalPercentile))}%`,
            }}
          >
            <div className="w-2.5 h-2.5 rotate-45 bg-indigo-600 rounded-xs mb-0.5"></div>
            <span className="text-xs font-bold text-indigo-700 whitespace-nowrap tabular-nums">
              {lang === 'zh' ? '你的位置：' : 'You: '}
              {result.globalPercentile.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* 4 Key Statistical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: vs Global Median / Bottom 50% Avg */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t.statVsMedianTitle}</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {result.multiplierVsGlobalMedian.toFixed(1)}×
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            {mode === 'income' ? t.statVsMedianSub : t.statVsMedianWealthSub}
          </p>
        </div>

        {/* Card 2: vs Extreme Poverty Line */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.statVsPovertyTitle}</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {result.multiplierVsPovertyLine.toFixed(1)}×
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            {t.statVsPovertySub}
          </p>
        </div>

        {/* Card 3: Daily / Hourly Equivalent */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.statDailyRateTitle}</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {mode === 'income' ? (
              <>
                €{Math.round(result.dailyEarningsEurPpp).toLocaleString()}
                <span className="text-xs font-normal text-slate-500 ml-1">PPP/天</span>
              </>
            ) : (
              <>
                ${Math.round(result.dailyEarningsUsdPpp).toLocaleString()}
                <span className="text-xs font-normal text-slate-500 ml-1">USD</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>
              {mode === 'income'
                ? `€${result.hourlyEarningsEurPpp.toFixed(1)} EUR PPP / ${lang === 'zh' ? '小時' : 'hr'}`
                : `$${result.hourlyEarningsUsdPpp.toFixed(1)} USD / ${lang === 'zh' ? '小時' : 'hr'}`}
            </span>
          </p>
        </div>

        {/* Card 4: Domestic Country Rank */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {lang === 'zh' ? `${country.nameZh} 排名` : `${country.nameEn} Rank`}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {lang === 'zh' ? '前 ' : 'Top '}
            {formattedDomesticTop}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            {lang === 'zh'
              ? `在該國超越 ${(result.domesticPercentile).toFixed(1)}% 勞動人口`
              : `Above ${(result.domesticPercentile).toFixed(1)}% of local earners`}
          </p>
        </div>
      </div>

      {/* 這個排名量不到的事 (What this ranking cannot measure) */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm">
        <h3 className="font-bold text-amber-950 text-sm mb-2.5 flex items-center gap-1.5">
          <span>⚠️</span>
          <span>{t.unmeasuredTitle}</span>
        </h3>
        <ul className="space-y-1.5 text-amber-900/95 leading-relaxed list-none">
          <li>{t.unmeasured1}</li>
          <li>{t.unmeasured2}</li>
          <li>{t.unmeasured3}</li>
          <li>{t.unmeasured4}</li>
          <li>{t.unmeasured5}</li>
        </ul>
      </div>
    </div>
  );
};
