/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  CalculationMode,
  ComparisonMethod,
  Language,
  Period,
  PresetScenario,
} from './types';
import { COUNTRIES, CURRENCIES, PRESET_SCENARIOS } from './data/economicData';
import { calculateRanking } from './utils/calculator';
import { getTranslation } from './i18n/translations';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsHero } from './components/ResultsHero';
import { CalculationBreakdown } from './components/CalculationBreakdown';
import { InteractiveCurveChart } from './components/InteractiveCurveChart';
import { CountryComparisonSection } from './components/CountryComparisonSection';
import { GlobalPyramidSection } from './components/GlobalPyramidSection';
import { MethodologyModal } from './components/MethodologyModal';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [mode, setMode] = useState<CalculationMode>('income');
  const [amount, setAmount] = useState<number>(520000); // Default Taiwan median salary
  const [currencyCode, setCurrencyCode] = useState<string>('TWD');
  const [countryCode, setCountryCode] = useState<string>('TW');
  const [period, setPeriod] = useState<Period>('year');
  const [isHousehold, setIsHousehold] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [method, setMethod] = useState<ComparisonMethod>('ppp');

  // Modals
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  const t = getTranslation(lang);

  const toggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const handleCountryChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode);
    const country = COUNTRIES[newCountryCode];
    if (country && CURRENCIES[country.currency]) {
      setCurrencyCode(country.currency);
      // Set to country median if user was on default
      if (amount === 520000 && countryCode === 'TW') {
        setAmount(country.medianAnnualIncomeLocal);
      }
    }
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setAmount(preset.amount);
    setCurrencyCode(preset.currency);
    setCountryCode(preset.country);
    setPeriod(preset.period);
    setAdults(preset.adults);
    setChildren(preset.children);
    setIsHousehold(preset.adults > 1 || preset.children > 0);
  };

  const calculationResult = useMemo(() => {
    return calculateRanking({
      amount,
      currencyCode,
      countryCode,
      period,
      adults: isHousehold ? adults : 1,
      children: isHousehold ? children : 0,
      method,
      mode,
    });
  }, [amount, currencyCode, countryCode, period, adults, children, isHousehold, method, mode]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Hero Banner Introduction */}
        <div className="text-center sm:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 border border-indigo-100">
            <span>{t.appBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {t.appTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {/* Section 1: Inputs & Results Layout */}
        <div id="calculator" className="space-y-8">
          <CalculatorForm
            lang={lang}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode);
              if (newMode === 'wealth' && amount === 520000) {
                setAmount(2000000); // 200萬 net wealth preset
              }
            }}
            amount={amount}
            onAmountChange={setAmount}
            currencyCode={currencyCode}
            onCurrencyChange={setCurrencyCode}
            countryCode={countryCode}
            onCountryChange={handleCountryChange}
            period={period}
            onPeriodChange={setPeriod}
            adults={adults}
            onAdultsChange={setAdults}
            children={children}
            onChildrenChange={setChildren}
            method={method}
            onMethodChange={setMethod}
            onSelectPreset={handleSelectPreset}
            isHousehold={isHousehold}
            onHouseholdToggle={setIsHousehold}
          />

          <ResultsHero
            lang={lang}
            mode={mode}
            result={calculationResult}
            currencyCode={currencyCode}
            countryCode={countryCode}
            onOpenShare={() => setIsShareOpen(true)}
          />

          {/* Section 1.5: How this result is calculated (Directly on page) */}
          <CalculationBreakdown
            lang={lang}
            mode={mode}
            method={method}
            amount={amount}
            currencyCode={currencyCode}
            countryCode={countryCode}
            period={period}
            adults={isHousehold ? adults : 1}
            children={isHousehold ? children : 0}
            result={calculationResult}
          />
        </div>

        {/* Section 2: Interactive Income Distribution Curve */}
        <InteractiveCurveChart
          lang={lang}
          userAnnualEurPpp={calculationResult.annualEurPpp}
          userGlobalPercentile={calculationResult.globalPercentile}
        />

        {/* Section 3: Country Benchmarks & Purchasing Power Matrix */}
        <CountryComparisonSection
          lang={lang}
          userAnnualUsdPpp={calculationResult.annualUsdPpp}
        />

        {/* Section 4: Global Wealth Pyramid & In-depth Insights */}
        <GlobalPyramidSection
          lang={lang}
          multiplierVsMedian={calculationResult.multiplierVsGlobalMedian}
        />
      </main>

      <Footer
        lang={lang}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* Modals */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
        lang={lang}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        lang={lang}
        mode={mode}
        result={calculationResult}
        currencyCode={currencyCode}
        countryCode={countryCode}
      />
    </div>
  );
}
