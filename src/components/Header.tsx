import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { Globe, Languages } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenMethodology: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenMethodology,
}) => {
  const t = getTranslation(lang);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Globe className="w-4 h-4 text-white" />
          </span>
          <span>{t.appTitle}</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#calculator"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'zh' ? '試算表單' : 'Calculator'}
          </a>
          <a
            href="#distribution"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'zh' ? '全球分布曲線' : 'Distribution Curve'}
          </a>
          <a
            href="#benchmarks"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'zh' ? '跨國對照' : 'Country Matrix'}
          </a>
          <a
            href="#pyramid"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'zh' ? '財富金字塔' : 'Wealth Pyramid'}
          </a>
          <button
            onClick={onOpenMethodology}
            className="text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'zh' ? '資料模型' : 'Methodology'}
          </button>
        </nav>

        {/* Zone 3: Primary action + No API Key assurance */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {t.noApiKeyBadge}
          </span>
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{t.switchLang}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
