import React, { useState } from 'react';
import { Language } from '../types';
import { interpolatePercentile } from '../utils/calculator';
import { GLOBAL_INCOME_SPLINE_PPP } from '../data/economicData';
import { getTranslation } from '../i18n/translations';
import { HelpCircle, Sliders } from 'lucide-react';

interface InteractiveCurveChartProps {
  lang: Language;
  userAnnualEurPpp: number;
  userGlobalPercentile: number;
}

export const InteractiveCurveChart: React.FC<InteractiveCurveChartProps> = ({
  lang,
  userAnnualEurPpp,
  userGlobalPercentile,
}) => {
  const t = getTranslation(lang);

  // Interactive exploration slider state
  const [interactiveIncome, setInteractiveIncome] = useState<number>(
    Math.max(1000, Math.min(250000, Math.round(userAnnualEurPpp || 11400)))
  );

  const interactivePercentile = interpolatePercentile(
    interactiveIncome,
    GLOBAL_INCOME_SPLINE_PPP,
    'incomeEurPpp'
  );
  const interactiveTopPercent = Math.max(0.01, 100 - interactivePercentile);

  // SVG dimensions
  const width = 800;
  const height = 260;
  const paddingLeft = 50;
  const paddingRight = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // We map log-income from €100 to €300,000 on the X axis
  const minLog = Math.log10(150);
  const maxLog = Math.log10(300000);

  const getX = (val: number): number => {
    const clamped = Math.max(150, Math.min(300000, val));
    const logVal = Math.log10(clamped);
    const fraction = (logVal - minLog) / (maxLog - minLog);
    return paddingLeft + fraction * chartWidth;
  };

  // Approximate global density curve: bell shape on log-scale peaking around €8,000-€11,000
  // with a thick long Pareto right tail
  const samplePoints: Array<{ x: number; y: number }> = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    const logVal = minLog + frac * (maxLog - minLog);
    const incomeVal = Math.pow(10, logVal);

    // Density model: log-normal component + Pareto tail
    const mu = Math.log10(6200); // peak around log-normal median
    const sigma = 0.58;
    const z = (logVal - mu) / sigma;
    const logNormalDensity = Math.exp(-0.5 * z * z);

    // Scale to SVG Y (higher density = smaller y from top)
    const normalizedY = logNormalDensity * 0.88;
    const yCoord = paddingTop + chartHeight * (1 - normalizedY);
    const xCoord = paddingLeft + frac * chartWidth;

    samplePoints.push({ x: xCoord, y: yCoord });
  }

  // Construct SVG path data
  const pathD = samplePoints.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${paddingLeft + chartWidth} ${paddingTop + chartHeight} L ${paddingLeft} ${paddingTop + chartHeight} Z`;

  // Key reference points (EUR PPP)
  const referencePoints = [
    { label: lang === 'zh' ? '底層均值 €5,100' : 'Bottom 50% €5.1k', income: 5100 },
    { label: lang === 'zh' ? '前 10% (€65.5k)' : 'Top 10% (€65.5k)', income: 65500 },
    { label: lang === 'zh' ? '前 1% (€250.3k)' : 'Top 1% (€250.3k)', income: 250300 },
  ];

  const userX = getX(userAnnualEurPpp);
  const interactiveX = getX(interactiveIncome);

  return (
    <div id="distribution" className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {t.curveTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.curveSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>{lang === 'zh' ? '對數刻度分布 (Log-Scale Density)' : 'Log-Scale Distribution'}</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-x-auto py-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[620px] select-none"
        >
          {/* Grid lines */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={paddingLeft + chartWidth}
            y2={paddingTop + chartHeight}
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Shaded Area */}
          <path d={areaD} fill="url(#incomeGradient)" />

          {/* Curve stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Reference vertical markers */}
          {referencePoints.map((ref) => {
            const rx = getX(ref.income);
            return (
              <g key={ref.income}>
                <line
                  x1={rx}
                  y1={paddingTop}
                  x2={rx}
                  y2={paddingTop + chartHeight}
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={rx}
                  y={paddingTop - 10}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="10"
                  fontWeight="600"
                >
                  {ref.label}
                </text>
              </g>
            );
          })}

          {/* User's Current Position Marker */}
          {userAnnualEurPpp > 0 && (
            <g>
              <line
                x1={userX}
                y1={paddingTop - 4}
                x2={userX}
                y2={paddingTop + chartHeight}
                stroke="#4338ca"
                strokeWidth="2.5"
              />
              <circle
                cx={userX}
                cy={paddingTop + 14}
                r="6"
                fill="#4338ca"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={userX}
                y={paddingTop + 36}
                textAnchor={userX > width - 120 ? 'end' : userX < 120 ? 'start' : 'middle'}
                fill="#312e81"
                fontSize="11"
                fontWeight="700"
              >
                {lang === 'zh' ? '您的位置' : 'You'} (Top {Math.max(0.01, 100 - userGlobalPercentile).toFixed(1)}%)
              </text>
            </g>
          )}

          {/* Interactive Scrubbing Marker */}
          <g>
            <line
              x1={interactiveX}
              y1={paddingTop + 40}
              x2={interactiveX}
              y2={paddingTop + chartHeight}
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <circle
              cx={interactiveX}
              cy={paddingTop + chartHeight}
              r="4"
              fill="#0ea5e9"
            />
          </g>

          {/* X Axis Ticks */}
          <g fontSize="10" fill="#64748b" textAnchor="middle">
            <text x={getX(200)} y={paddingTop + chartHeight + 20}>€200</text>
            <text x={getX(1000)} y={paddingTop + chartHeight + 20}>€1,000</text>
            <text x={getX(5000)} y={paddingTop + chartHeight + 20}>€5,000</text>
            <text x={getX(20000)} y={paddingTop + chartHeight + 20}>€20,000</text>
            <text x={getX(70000)} y={paddingTop + chartHeight + 20}>€70,000</text>
            <text x={getX(200000)} y={paddingTop + chartHeight + 20}>€200,000+</text>
          </g>
        </svg>
      </div>

      {/* Interactive Income Simulator Scrubber */}
      <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-2">
          <Sliders className="w-4 h-4 text-sky-600" />
          <span>{t.curveInteractivePrompt}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="range"
            min="500"
            max="250000"
            step="1000"
            value={interactiveIncome}
            onChange={(e) => setInteractiveIncome(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono text-xs">
            <div className="text-slate-700">
              <span className="text-slate-400 font-sans mr-1">{t.simulatedIncome}</span>
              <strong className="text-slate-900 font-bold tabular-nums">
                €{interactiveIncome.toLocaleString()}
              </strong>{' '}
              <span className="text-slate-400 font-sans">EUR PPP</span>
            </div>

            <div className="bg-sky-50 text-sky-800 font-bold px-2.5 py-1 rounded-md border border-sky-200">
              <span className="text-sky-600 font-sans mr-1">{t.simulatedPercentile}</span>
              <span className="tabular-nums">
                {lang === 'zh' ? '前 ' : 'Top '}
                {interactiveTopPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
