import React, { useState } from 'react';
import { Language } from '../types';
import { COUNTRIES, CURRENCIES } from '../data/economicData';
import { calculateDomesticPercentile, formatCurrency } from '../utils/calculator';
import { getTranslation } from '../i18n/translations';
import { ArrowUpDown, Globe2 } from 'lucide-react';

interface CountryComparisonSectionProps {
  lang: Language;
  userAnnualUsdPpp: number;
}

export const CountryComparisonSection: React.FC<CountryComparisonSectionProps> = ({
  lang,
  userAnnualUsdPpp,
}) => {
  const t = getTranslation(lang);
  const [sortBy, setSortBy] = useState<'percentile' | 'median'>('percentile');

  const countryKeys = Object.keys(COUNTRIES);

  const countryRows = countryKeys.map((code) => {
    const country = COUNTRIES[code];
    const curr = CURRENCIES[country.currency] || CURRENCIES.USD;

    // Local equivalent based on PPP: userAnnualUsdPpp * country.pppRate
    const localEquivalent = userAnnualUsdPpp * country.pppRate;
    const domesticPercentile = calculateDomesticPercentile(localEquivalent, country);
    const domesticTopPercent = Math.max(0.01, 100 - domesticPercentile);

    let levelLabel: string = t.levelMedian;
    let levelColor = 'text-slate-700 bg-slate-100';

    if (domesticTopPercent <= 10) {
      levelLabel = t.levelVeryHigh;
      levelColor = 'text-indigo-800 bg-indigo-50 border-indigo-100';
    } else if (domesticTopPercent <= 30) {
      levelLabel = t.levelHigh;
      levelColor = 'text-sky-800 bg-sky-50 border-sky-100';
    } else if (domesticTopPercent <= 60) {
      levelLabel = t.levelMedian;
      levelColor = 'text-slate-700 bg-slate-100 border-slate-200';
    } else {
      levelLabel = t.levelModest;
      levelColor = 'text-amber-800 bg-amber-50 border-amber-100';
    }

    return {
      country,
      currency: curr,
      localEquivalent,
      domesticPercentile,
      domesticTopPercent,
      levelLabel,
      levelColor,
    };
  });

  const sortedRows = [...countryRows].sort((a, b) => {
    if (sortBy === 'percentile') {
      return a.domesticTopPercent - b.domesticTopPercent;
    }
    return b.country.medianAnnualIncomeLocal / b.country.pppRate - a.country.medianAnnualIncomeLocal / a.country.pppRate;
  });

  return (
    <div id="benchmarks" className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {t.tableTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.tableSubtitle}
          </p>
        </div>

        {/* Sort Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSortBy('percentile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              sortBy === 'percentile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'zh' ? '依排名排序' : 'Sort by Rank'}
          </button>
          <button
            type="button"
            onClick={() => setSortBy('median')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              sortBy === 'median'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'zh' ? '依物價中位數' : 'Sort by Median'}
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">{t.colCountry}</th>
              <th className="py-3 px-4 text-right">{t.colMedianIncome}</th>
              <th className="py-3 px-4 text-right">{t.colYourEquivalent}</th>
              <th className="py-3 px-4 text-right">{t.colDomesticPercentile}</th>
              <th className="py-3 px-4 text-center">{t.colLivingStandard}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {sortedRows.map((row) => {
              const formattedTop =
                row.domesticTopPercent < 1.0
                  ? row.domesticTopPercent.toFixed(2)
                  : row.domesticTopPercent.toFixed(1);

              return (
                <tr
                  key={row.country.code}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {lang === 'zh' ? row.country.nameZh : row.country.nameEn}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs tabular-nums text-slate-600 whitespace-nowrap">
                    {formatCurrency(row.country.medianAnnualIncomeLocal, row.country.currency)}
                    <span className="text-[10px] text-slate-400 ml-1">/年</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs font-semibold tabular-nums text-slate-900 whitespace-nowrap">
                    {formatCurrency(Math.round(row.localEquivalent), row.country.currency)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs font-bold tabular-nums text-indigo-700 whitespace-nowrap">
                    {lang === 'zh' ? '前 ' : 'Top '}
                    {formattedTop}%
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border ${row.levelColor}`}
                    >
                      {row.levelLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
        {lang === 'zh'
          ? '註：各國中位數年薪／每月就業收入取材自各國官方統計處（如香港政府統計處每月就業收入、行政院主計總處、美國勞工統計局、日本厚生勞動省等）及 OECD 數據庫。換算金額已透過 World Bank 實質購買力平價 (PPP) 係數平準。'
          : 'Note: National median earnings/income are sourced from official statistical bureaus (e.g. HK Census Monthly Employment Earnings, Taiwan DGBAS, US BLS, Japan MHLW) and OECD databases, normalized via World Bank PPP factors.'}
      </div>
    </div>
  );
};
