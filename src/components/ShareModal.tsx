import React, { useState } from 'react';
import { CalculationMode, CalculationResult, Language } from '../types';
import { COUNTRIES, CURRENCIES } from '../data/economicData';
import { formatCurrency, formatPopulationCount } from '../utils/calculator';
import { getTranslation } from '../i18n/translations';
import { Check, Copy, Globe, Share2, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  mode: CalculationMode;
  result: CalculationResult;
  currencyCode: string;
  countryCode: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  lang,
  mode,
  result,
  currencyCode,
  countryCode,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(lang);
  const country = COUNTRIES[countryCode] || COUNTRIES.TW;
  const [copied, setCopied] = useState(false);

  const formattedTopPercent =
    result.topPercent < 0.1
      ? result.topPercent.toFixed(3)
      : result.topPercent < 1.0
      ? result.topPercent.toFixed(2)
      : result.topPercent.toFixed(1);

  const shareText =
    lang === 'zh'
      ? `🌍【全球收入排名計算器】
我目前的${mode === 'income' ? '年收入' : '淨資產'}位列全球前 ${formattedTopPercent}%！
· 超越全球約 ${formatPopulationCount(result.poorerCountEstimate, 'zh')} 人
· 全球收入中位數的 ${result.multiplierVsGlobalMedian.toFixed(1)} 倍
· 在 ${country.nameZh} 位列前 ${result.domesticTopPercent.toFixed(1)}%
數據校準自 WID 世界不平等資料庫與世界銀行。`
      : `🌍 [Global Income Rank Calculator]
My ${mode === 'income' ? 'annual income' : 'net worth'} ranks in the TOP ${formattedTopPercent}% globally!
· Above approx ${formatPopulationCount(result.poorerCountEstimate, 'en')} people worldwide
· ${result.multiplierVsGlobalMedian.toFixed(1)}x the global median
· Top ${result.domesticTopPercent.toFixed(1)}% in ${country.nameEn}
Calibrated with the World Inequality Database (WID.world) and World Bank.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t.shareBtn}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Card Visual Preview */}
        <div className="my-5 p-5 rounded-xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-indigo-200 mb-3">
            <span className="flex items-center gap-1.5 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              {t.appTitle}
            </span>
            <span className="opacity-80">WID.world</span>
          </div>

          <div className="py-2 text-center">
            <span className="text-xs text-indigo-300 block mb-1">
              {t.youAreInTop}
            </span>
            <div className="text-4xl font-black tracking-tight text-white font-mono tabular-nums">
              {formattedTopPercent}%
            </div>
            <span className="text-xs text-indigo-200 mt-1 block">
              {mode === 'income' ? t.ofGlobalEarners : t.ofGlobalWealth}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-800/80 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-indigo-300 block text-[10px]">
                {t.statVsMedianTitle}
              </span>
              <strong className="text-sm font-bold font-mono">
                {result.multiplierVsGlobalMedian.toFixed(1)}×
              </strong>
            </div>
            <div className="bg-white/5 p-2 rounded-lg">
              <span className="text-indigo-300 block text-[10px]">
                {country.nameEn}
              </span>
              <strong className="text-sm font-bold font-mono">
                Top {result.domesticTopPercent.toFixed(1)}%
              </strong>
            </div>
          </div>
        </div>

        {/* Copy snippet button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopy}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t.copySuccess}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copyBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
