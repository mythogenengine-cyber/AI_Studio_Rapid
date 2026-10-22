import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { Layers, Lightbulb } from 'lucide-react';

interface GlobalPyramidSectionProps {
  lang: Language;
  multiplierVsMedian: number;
}

export const GlobalPyramidSection: React.FC<GlobalPyramidSectionProps> = ({
  lang,
  multiplierVsMedian,
}) => {
  const t = getTranslation(lang);

  const tiers = [
    {
      title: t.pyramidTop1,
      population: '1% (約 5,500 萬成年人 / 55M adults)',
      wealthShare: '43% 全球總財富 / Global Wealth',
      desc: t.pyramidTop1Share,
      bg: 'bg-indigo-900 text-white',
      border: 'border-indigo-800',
      tagBg: 'bg-indigo-800 text-indigo-100',
    },
    {
      title: t.pyramidTop10,
      population: '9% (約 4.9 億成年人 / 490M adults)',
      wealthShare: '32% 全球總財富 / Global Wealth',
      desc: t.pyramidTop10Share,
      bg: 'bg-indigo-700 text-white',
      border: 'border-indigo-600',
      tagBg: 'bg-indigo-600 text-indigo-100',
    },
    {
      title: t.pyramidMiddle,
      population: '40% (約 22 億成年人 / 2.2B adults)',
      wealthShare: '24% 全球總財富 / Global Wealth',
      desc: t.pyramidMiddleShare,
      bg: 'bg-indigo-500 text-white',
      border: 'border-indigo-400',
      tagBg: 'bg-indigo-400 text-white',
    },
    {
      title: t.pyramidBottom,
      population: '50% (約 27.5 億成年人 / 2.75B adults)',
      wealthShare: '< 1% 全球總財富 / Global Wealth',
      desc: t.pyramidBottomShare,
      bg: 'bg-indigo-100 text-slate-800',
      border: 'border-indigo-200',
      tagBg: 'bg-slate-200 text-slate-700',
    },
  ];

  const workYears = Math.max(1, Math.round(multiplierVsMedian));

  return (
    <div id="pyramid" className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {t.pyramidTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {t.pyramidSubtitle}
        </p>
      </div>

      {/* Visual Pyramid Stack */}
      <div className="flex flex-col gap-2.5 my-6 max-w-4xl mx-auto">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 sm:p-5 transition-all border ${tier.bg} ${tier.border} shadow-xs`}
            style={{
              marginLeft: `${idx * 2}%`,
              marginRight: `${idx * 2}%`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight">
                {tier.title}
              </span>
              <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md max-w-fit ${tier.tagBg}`}>
                {tier.wealthShare}
              </span>
            </div>
            <div className="mt-2 text-xs opacity-90 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{tier.population}</span>
              <span aria-hidden="true">·</span>
              <span>{tier.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inequality Insights Block */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {t.insightsTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2">
              {t.insight1Title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.insight1Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2">
              {t.insight2Title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.insight2Desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2">
              {t.insight3Title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.insight3Desc.replace('{years}', workYears.toString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
