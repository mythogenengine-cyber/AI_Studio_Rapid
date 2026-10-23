import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { METHODOLOGY_ROWS, MethodologyRow } from '../data/methodologyData';
import { BookOpen, ExternalLink, Filter, HelpCircle, History, Search, ShieldAlert, X } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(lang);

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRows = METHODOLOGY_ROWS.filter((row) => {
    const matchesCategory = categoryFilter === 'all' || row.category === categoryFilter;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchText =
      row.value.toLowerCase().includes(query) ||
      row.unit.toLowerCase().includes(query) ||
      (lang === 'zh' ? row.sourceNameZh : row.sourceNameEn).toLowerCase().includes(query) ||
      (lang === 'zh' ? row.definitionZh : row.definitionEn).toLowerCase().includes(query) ||
      (lang === 'zh' ? row.statusLabelZh : row.statusLabelEn).toLowerCase().includes(query);

    return matchesCategory && matchText;
  });

  const getStatusBadge = (row: MethodologyRow) => {
    if (row.status === 'official') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          {lang === 'zh' ? '官方數據' : 'Official Data'}
        </span>
      );
    }
    if (row.status === 'approx') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
          {lang === 'zh' ? '近似值，待核實' : 'Approximate, Pending'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
        {lang === 'zh' ? '插值估算' : 'Interpolated Estimate'}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'zh' ? '資料來源與計量模型全覽表' : 'Sources & Methodology Matrix'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'zh'
                  ? '本系統所有運算常數與數據來源清單（100% 離線純本機運算，免 API Key）'
                  : 'Comprehensive parameters and data sources audit (100% offline, zero AI cost)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters bar */}
        <div className="p-4 sm:px-6 bg-slate-50/80 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'zh' ? '全部項目' : 'All'} ({METHODOLOGY_ROWS.length})
            </button>
            <button
              onClick={() => setCategoryFilter('global')}
              className={`px-3 py-1.5 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === 'global'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'zh' ? '全球收入基準' : 'Global Benchmarks'}
            </button>
            <button
              onClick={() => setCategoryFilter('wir_spline')}
              className={`px-3 py-1.5 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === 'wir_spline'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'zh' ? 'WIR 收入曲線' : 'WIR Spline'}
            </button>
            <button
              onClick={() => setCategoryFilter('country')}
              className={`px-3 py-1.5 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === 'country'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'zh' ? '各國中位數' : 'Country Medians'}
            </button>
            <button
              onClick={() => setCategoryFilter('currency')}
              className={`px-3 py-1.5 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === 'currency'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'zh' ? '貨幣 PPP 與匯率' : 'Currencies'}
            </button>
            <button
              onClick={() => setCategoryFilter('wealth')}
              className={`px-3 py-1.5 rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                categoryFilter === 'wealth'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'zh' ? '瑞銀財富' : 'UBS Wealth'}
            </button>
          </div>

          {/* Search box */}
          <div className="relative shrink-0 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'zh' ? '搜尋數值、來源、國家...' : 'Search constants, sources...'}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Scrollable Table Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3.5 whitespace-nowrap">{lang === 'zh' ? '數值' : 'Value'}</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">{lang === 'zh' ? '單位 / 項目' : 'Unit / Metric'}</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">{lang === 'zh' ? '來源（附連結）' : 'Source & Reference'}</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">{lang === 'zh' ? '年份' : 'Year'}</th>
                  <th className="py-3 px-3.5 whitespace-nowrap text-center">{lang === 'zh' ? '狀態' : 'Status'}</th>
                  <th className="py-3 px-3.5 min-w-[200px]">{lang === 'zh' ? '定義與說明' : 'Definition & Notes'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Value */}
                    <td className="py-3 px-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {row.value}
                    </td>

                    {/* Unit / Metric */}
                    <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                      {row.unit}
                    </td>

                    {/* Source & Link */}
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                      {row.sourceUrl ? (
                        <a
                          href={row.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 font-medium"
                        >
                          <span>{lang === 'zh' ? row.sourceNameZh : row.sourceNameEn}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span>{lang === 'zh' ? row.sourceNameZh : row.sourceNameEn}</span>
                      )}
                    </td>

                    {/* Year */}
                    <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                      {row.year}
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-3.5 text-center whitespace-nowrap">
                      {getStatusBadge(row)}
                    </td>

                    {/* Definition */}
                    <td className="py-3 px-3.5 text-slate-600 leading-relaxed text-[11px]">
                      {lang === 'zh' ? row.definitionZh : row.definitionEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section: Known Limitations */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm">
            <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{lang === 'zh' ? '已知限制與統計口徑注意事項' : 'Known Limitations & Methodological Constraints'}</span>
            </h4>
            <ul className="space-y-2 text-amber-900/90 leading-relaxed list-none text-xs">
              <li className="flex items-start gap-1.5">
                <span className="font-bold shrink-0">(a)</span>
                <span>
                  {lang === 'zh'
                    ? 'WIR 量度的是稅前國民收入（Pre-tax national income），包含僱主社保供款、企業未分配留存利潤等宏觀經濟要素，與個人銀行實領工資或全職員工薪資並非完全同一個概念。'
                    : 'WIR measures pre-tax national income, which includes macro components such as employer social contributions and retained corporate profits, differing from net take-home salary or basic wage slips.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold shrink-0">(b)</span>
                <span>
                  {lang === 'zh'
                    ? '跨國比較表中各國中位數的官方統計口徑並不一致（例如：香港為就業人士每月就業收入、美國為全職員工週薪換算、台灣為受僱員工總薪資中位數），僅供大概相對水準參考。'
                    : 'Definitions across national median earnings differ across jurisdictions (e.g. HK employment earnings vs. US usual weekly earnings vs. Taiwan DGBAS total earnings), providing an approximate reference only.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold shrink-0">(c)</span>
                <span>
                  {lang === 'zh'
                    ? '購買力平價 (PPP) 是按全國平均消費籃子計算。如果您收入中房租支出或大城市外食佔比較高，大城市實際購買力往往會低於全國平均換算結果。'
                    : 'Purchasing Power Parity (PPP) indices are calculated based on national average consumption baskets. Actual purchasing power in high-rent urban areas is typically lower than national averages.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Section: Revision History */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1.5">
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '修訂紀錄 (Revision History)' : 'Revision History'}</span>
            </h4>
            <p className="leading-relaxed text-slate-600 text-[11px]">
              {lang === 'zh'
                ? '2026-10-22 修訂：初版把 WIR 的購買力平價歐元誤當美元，並混用不同口徑的數據，令排名普遍偏高（例如：香港月薪 HK$22,000 的單身成人，由全球前 8.7% 修正為前 25.8%）。'
                : '2026-10-22 Revision: The initial version incorrectly treated WIR Purchasing Power Parity Euros as USD and mixed divergent survey bases, inflating relative standings (e.g., a single HK worker earning HK$22,000/mo was corrected from Top 8.7% to Top 25.8%).'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <span className="text-[11px] text-slate-400">
            {lang === 'zh' ? '資料鎖定基準日：2026 年 10 月 21 日 · 純靜態代碼庫' : 'Data Locked: October 21, 2026 · Static Offline Engine'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
