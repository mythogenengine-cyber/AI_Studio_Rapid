import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { BookOpen, ExternalLink, X } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {t.methodologyTitle}
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

        <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block font-semibold mb-1">
              {lang === 'zh' ? '1. 世界不平等資料庫 (WID.world)' : '1. World Inequality Database (WID.world)'}
            </strong>
            <p>{t.sourceWID}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block font-semibold mb-1">
              {lang === 'zh' ? '2. 世界銀行貧窮與不平等平台 (World Bank PIP)' : '2. World Bank Poverty and Inequality Platform (PIP)'}
            </strong>
            <p>{t.sourceWB}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block font-semibold mb-1">
              {lang === 'zh' ? '3. 瑞銀全球財富報告 (UBS Global Wealth Report)' : '3. UBS Global Wealth Report'}
            </strong>
            <p>{t.sourceUBS}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block font-semibold mb-1">
              {lang === 'zh' ? '4. 經濟合作暨發展組織 (OECD) 修改型等效規模' : '4. Modified OECD Equivalence Scale'}
            </strong>
            <p>{t.sourceOECD}</p>
            <div className="mt-2 text-xs font-mono bg-white p-2 rounded border border-slate-200 text-slate-800">
              Denominator = 1 + 0.5 × (Adults - 1) + 0.3 × Children
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
            {t.methodologyNotice}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
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
