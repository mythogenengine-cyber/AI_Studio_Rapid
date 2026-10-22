import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  onOpenMethodology: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenMethodology }) => {
  const t = getTranslation(lang);

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-700">
            {t.appTitle} · Global Income & Wealth Percentile Calculator
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {lang === 'zh'
              ? '數據基準鎖定：2026 年 10 月 21 日 · 100% 純本機計量演算法 · 免 API Key · 零 AI 調用費用'
              : 'Data Benchmark Locked: October 21, 2026 · 100% Local Econometric Math · No API Key Required · Zero AI Cost'}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {lang === 'zh'
              ? '基礎來源：World Inequality Database (WID.world), World Bank PIP, OECD & UBS Global Wealth Report.'
              : 'Data benchmarks: World Inequality Database (WID.world), World Bank PIP, OECD & UBS Global Wealth Report.'}
          </p>
        </div>

        <div className="flex items-center gap-6 text-slate-600">
          <button
            onClick={onOpenMethodology}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            {t.methodologyBtn}
          </button>
          <a
            href="https://wid.world"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-slate-900 transition-colors"
          >
            WID.world
          </a>
          <a
            href="https://pip.worldbank.org"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-slate-900 transition-colors"
          >
            World Bank PIP
          </a>
        </div>
      </div>
    </footer>
  );
};
