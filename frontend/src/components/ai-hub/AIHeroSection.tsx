import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, MapPin, Home, Building2, Search, Loader2, KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { SearchParams } from '../../pages/AIPropertyHubPage';
import AIApiKeyModal from './AIApiKeyModal';
import { apiKeyStorage } from '../../services/api';

interface AIHeroSectionProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
  externalOpenModal?: boolean;   // P1-1: parent can force-open key modal (e.g. on 403)
  onModalClosed?: () => void;    // callback to reset the flag after opening
}

const POPULAR_CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi',
  'Faisalabad', 'Multan', 'Peshawar', 'Gujranwala',
];

// Extended list for autocomplete
const ALL_CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan',
  'Peshawar', 'Gujranwala', 'Quetta', 'Sialkot', 'Bahawalpur', 'Sargodha',
  'Sukkur', 'Larkana', 'Sheikhupura', 'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan',
  'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan', 'Kasur', 'Okara',
  'Mingora', 'Nawabshah', 'Chiniot', 'Kotri', 'Kāmoke', 'Hafizabad',
  'Sadiqabad', 'Mirpur Khas', 'Burewala', 'Kohat', 'Khanewal', 'Dera Ismail Khan',
  'Turbat', 'Muzaffargarh', 'Abbottabad', 'Mandi Bahauddin', 'Shikarpur',
  'Jacobabad', 'Jhelum', 'Khairpur', 'Khuzdar', 'Pakpattan', 'Hub',
  'Daska', 'Gojra', 'Dadu', 'Muridke', 'Bahawalnagar', 'Samundri',
  'Tando Adam', 'Tando Allahyar', 'Vehari', 'Jaranwala', 'Chishtian',
];

const PROPERTY_TYPES = ['Flat', 'Villa', 'House', 'Penthouse', 'Plot', 'Studio'];
const CATEGORIES = ['Residential', 'Commercial'];

const LOAD_STEPS = [
  { label: 'Searching listings',        desc: 'Querying Zameen, Graana, & OLX Property' },
  { label: 'Reading property details',  desc: 'Extracting data from live listing pages'  },
  { label: 'Getting AI insights',       desc: 'Ranking & analysing by your criteria'     },
];

type BudgetUnit = 'Lakh' | 'Cr';

const AIHeroSection: React.FC<AIHeroSectionProps> = ({ onSearch, loading, externalOpenModal, onModalClosed }) => {
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [bhk, setBhk] = useState('Any');
  const [possession, setPossession] = useState('any');
  const [loadStep, setLoadStep] = useState(0); // 0=idle, 1=searching, 2=reading, 3=analyzing
  const [maxBudget, setMaxBudget] = useState('2');
  const [budgetUnit, setBudgetUnit] = useState<BudgetUnit>('Cr');
  const [propertyType, setPropertyType] = useState('Flat');
  const [category, setCategory] = useState('Residential');

  // Autocomplete state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // API key modal + status
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keysReady, setKeysReady] = useState(apiKeyStorage.hasKeys());

  // P1-1: open modal when parent signals 403 error
  useEffect(() => {
    if (externalOpenModal) {
      setShowKeyModal(true);
      onModalClosed?.();
    }
  }, [externalOpenModal, onModalClosed]);

  // Advance loading steps on a timer so the user sees progress while waiting
  useEffect(() => {
    if (!loading) { setLoadStep(0); return; }
    setLoadStep(1);
    const t2 = setTimeout(() => setLoadStep(2), 8_000);
    const t3 = setTimeout(() => setLoadStep(3), 25_000);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, [loading]);

  const refreshKeyStatus = useCallback(() => {
    setKeysReady(apiKeyStorage.hasKeys());
  }, []);

  // Filter cities based on input
  const filteredCities = city.trim()
    ? ALL_CITIES.filter(
      (c) => c.toLowerCase().includes(city.toLowerCase()) && c.toLowerCase() !== city.toLowerCase()
    ).slice(0, 6)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        cityInputRef.current &&
        !cityInputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  const selectCity = (selectedCity: string) => {
    setCity(selectedCity);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredCities.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredCities.length - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      selectCity(filteredCities[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    // Guard: require API keys before firing any request
    if (!keysReady) {
      setShowKeyModal(true);
      return;
    }

    // Convert to Crores for the backend
    const rawValue = parseFloat(maxBudget) || 2;
    const valueInCrores = budgetUnit === 'Lakh' ? rawValue / 100 : rawValue;

    onSearch({
      city:         city.trim(),
      locality:     locality.trim(),
      bhk,
      possession,
      maxBudget:    valueInCrores,
      propertyType,
      category,
    });
  };

  return (
    <section className="relative bg-[#154D57] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-[#0F3B43]/50 to-transparent" />
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-[#B7A08B]/5 rounded-full blur-[100px]" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(183,160,139,0.05),transparent_60%)]" />
      </div>

      <div className="relative pt-32 pb-24 max-w-[1200px] mx-auto px-6">
        {/* ── Heading ──────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#B7A08B]/10 backdrop-blur-sm border border-[#B7A08B]/30 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#B7A08B]" />
            <span className="font-space-mono text-xs text-[#B7A08B] uppercase tracking-wider font-semibold">
              AI-Powered Search
            </span>
          </div>

          <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-6 drop-shadow-sm">
            Find Properties with<br />
            <span className="text-[#B7A08B]">AI Intelligence</span>
          </h1>

          <p className="font-manrope text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed">
            Our AI analyzes live market data and real listings to deliver highly personalized property recommendations in seconds.
          </p>
        </div>

        {/* ── API Key Banner ───────────────────────── */}
        <div className="max-w-[800px] mx-auto mb-6 relative z-10">
          {keysReady ? (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 shadow-sm rounded-xl px-5 py-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="font-manrope text-sm font-medium text-emerald-300 flex-1">
                Your API keys are active — AI searches use your own quota.
              </p>
              <button
                onClick={() => setShowKeyModal(true)}
                className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 font-manrope font-bold text-xs px-4 py-2 rounded-lg transition-all whitespace-nowrap"
              >
                <KeyRound className="w-3.5 h-3.5" /> Manage Keys
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 shadow-sm rounded-xl px-5 py-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="font-manrope text-sm font-medium text-amber-300 flex-1">
                Add your <strong className="text-amber-200 font-bold">free</strong> GitHub Models &amp; Firecrawl keys — use your own quota.
              </p>
              <button
                onClick={() => setShowKeyModal(true)}
                className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-manrope font-bold text-xs px-4 py-2 rounded-lg transition-all whitespace-nowrap"
              >
                <KeyRound className="w-3.5 h-3.5" /> Set Up Keys
              </button>
            </div>
          )}
        </div>

        {/* ── Search form card ─────────────────────── */}
        <div className="max-w-[900px] mx-auto relative z-10">
          <form
            onSubmit={handleSubmit}
            className="bg-[#12434D]/80 backdrop-blur-xl border border-[#B7A08B]/30 shadow-2xl rounded-2xl p-6 md:p-8"
          >
            {/* City */}
            <div className="mb-6">
              <label className="block font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest mb-2 ml-1">
                Where do you want to live?
              </label>
              <div className="relative">
                <div className="relative bg-[#0F3B43] border border-[#B7A08B]/40 rounded-xl p-4 flex items-center gap-3 focus-within:ring-1 focus-within:ring-[#B7A08B] focus-within:border-[#B7A08B] transition-all shadow-sm">
                  <MapPin className="w-5 h-5 text-[#B7A08B] shrink-0" />
                  <input
                    ref={cityInputRef}
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleCityKeyDown}
                    className="flex-1 bg-transparent font-manrope text-base text-white outline-none placeholder:text-white/40 placeholder:font-light"
                    placeholder="Enter city — e.g. Lahore, Karachi, Islamabad…"
                    autoComplete="off"
                    required
                  />
                </div>

                {/* Autocomplete dropdown */}
                {showSuggestions && filteredCities.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-50 left-0 right-0 mt-2 bg-[#12434D] border border-[#B7A08B]/40 rounded-xl shadow-xl overflow-hidden"
                  >
                    {filteredCities.map((c, idx) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => selectCity(c)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`w-full text-left px-5 py-3.5 flex items-center gap-3 transition-colors ${idx === highlightedIndex
                          ? 'bg-[#0F3B43] text-white'
                          : 'text-white/70 hover:bg-[#0F3B43] hover:text-white'
                          }`}
                      >
                        <MapPin className="w-4 h-4 text-[#B7A08B] shrink-0" />
                        <span className="font-manrope text-sm font-medium">{c}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick-pick city pills */}
              <div className="flex flex-wrap gap-2 mt-4 ml-1">
                {POPULAR_CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => selectCity(c)}
                    className={`font-manrope text-xs px-4 py-1.5 rounded-full border transition-all ${city === c
                      ? 'bg-[#B7A08B] border-[#B7A08B] text-[#154D57] font-bold shadow-sm'
                      : 'bg-transparent border-[#B7A08B]/40 text-white/70 hover:border-[#B7A08B] hover:text-[#B7A08B]'
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Locality / Area ─────────────────────────────── */}
            <div className="mb-6">
              <label className="block font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest mb-2 ml-1">
                Specific Area <span className="font-normal normal-case text-[#B7A08B]/60">(optional — highest impact on results)</span>
              </label>
              <div className="relative bg-[#0F3B43] border border-[#B7A08B]/40 rounded-xl p-4 flex items-center gap-3 focus-within:ring-1 focus-within:ring-[#B7A08B] focus-within:border-[#B7A08B] transition-all shadow-sm">
                <MapPin className="w-5 h-5 text-[#B7A08B]/70 shrink-0" />
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="flex-1 bg-transparent font-manrope text-base text-white outline-none placeholder:text-white/40 placeholder:font-light"
                  placeholder="e.g. DHA, Gulberg, Bahria Town, Clifton…"
                />
              </div>
            </div>

            {/* Budget · Type · Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {/* Budget */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest ml-1">
                    Max Budget
                  </label>
                  {/* Unit toggle */}
                  <div className="flex items-center bg-[#0F3B43] border border-[#B7A08B]/30 rounded p-0.5">
                    {(['Lakh', 'Cr'] as BudgetUnit[]).map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => {
                          if (unit !== budgetUnit) {
                            const val = parseFloat(maxBudget) || 0;
                            if (unit === 'Lakh') {
                              setMaxBudget(String(val * 100));
                            } else {
                              setMaxBudget(String(val / 100));
                            }
                            setBudgetUnit(unit);
                          }
                        }}
                        className={`font-space-mono text-[10px] uppercase font-bold px-2.5 py-1 transition-all rounded-sm ${budgetUnit === unit
                          ? 'bg-[#B7A08B] shadow-sm text-[#154D57]'
                          : 'text-white/60 hover:text-white/90'
                          }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative bg-[#0F3B43] border border-[#B7A08B]/40 rounded-xl p-4 flex items-center gap-3 focus-within:ring-1 focus-within:ring-[#B7A08B] focus-within:border-[#B7A08B] transition-all shadow-sm">
                  <span className="font-space-mono font-bold text-lg text-[#B7A08B]">PKR</span>
                  <input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="flex-1 bg-transparent font-space-mono text-base text-white outline-none placeholder:text-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder={budgetUnit === 'Lakh' ? '50' : '2'}
                    min="0.1"
                    step="any"
                    required
                  />
                </div>
              </div>

              {/* Property type */}
              <div>
                <label className="block font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest mb-2 ml-1">
                  Property Type
                </label>
                <div className="relative bg-[#0F3B43] border border-[#B7A08B]/40 rounded-xl p-4 flex items-center gap-3 focus-within:ring-1 focus-within:ring-[#B7A08B] focus-within:border-[#B7A08B] transition-all shadow-sm">
                  <Home className="w-5 h-5 text-[#B7A08B] shrink-0" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="flex-1 bg-transparent font-manrope text-base text-white outline-none cursor-pointer appearance-none"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#12434D] text-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest mb-2 ml-1">
                  Category
                </label>
                <div className="relative bg-[#0F3B43] border border-[#B7A08B]/40 rounded-xl p-4 flex items-center gap-3 focus-within:ring-1 focus-within:ring-[#B7A08B] focus-within:border-[#B7A08B] transition-all shadow-sm">
                  <Building2 className="w-5 h-5 text-[#B7A08B] shrink-0" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 bg-transparent font-manrope text-base text-white outline-none cursor-pointer appearance-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#12434D] text-white">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── BHK Configuration ───────────────────────────── */}
            <div className="mb-6">
              <label className="block font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest mb-3 ml-1">
                BHK Configuration
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Any', '1BHK', '2BHK', '3BHK', '4BHK+'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBhk(option)}
                    className={`font-manrope text-sm font-medium px-5 py-2.5 rounded-xl border transition-all ${
                      bhk === option
                        ? 'bg-[#B7A08B] border-[#B7A08B] text-[#154D57] shadow-sm'
                        : 'bg-transparent border-[#B7A08B]/30 text-white/70 hover:border-[#B7A08B]/60 hover:text-white'
                    }`}
                  >
                    {option === 'Any' ? 'Any BHK' : option}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Possession ──────────────────────────────────── */}
            <div className="mb-8">
              <label className="block font-space-mono text-[11px] text-[#B7A08B] font-semibold uppercase tracking-widest mb-3 ml-1">
                Possession
              </label>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: 'any',               label: 'Any' },
                  { value: 'ready',             label: 'Ready to Move' },
                  { value: 'underconstruction', label: 'Under Construction' },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPossession(opt.value)}
                    className={`font-manrope text-sm font-medium px-5 py-2.5 rounded-xl border transition-all ${
                      possession === opt.value
                        ? 'bg-[#0F3B43] border-[#B7A08B] text-[#B7A08B] shadow-sm'
                        : 'bg-transparent border-[#B7A08B]/30 text-white/70 hover:border-[#B7A08B]/60 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="relative group mt-2">
              <button
                type="submit"
                disabled={loading || !city.trim() || !keysReady}
                className="w-full bg-[#B7A08B] hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-[#154D57] font-manrope font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching properties…
                  </>
                ) : !keysReady ? (
                  <>
                    <KeyRound className="w-5 h-5" />
                    Set API Keys to Search
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search with AI
                  </>
                )}
              </button>
              {/* Tooltip shown when keys are missing */}
              {!keysReady && !loading && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#B7A08B] text-[#154D57] font-manrope font-bold text-xs rounded-lg px-4 py-2 whitespace-nowrap pointer-events-none shadow-xl z-10 transition-opacity">
                  Add your GitHub Models &amp; Firecrawl keys first
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#B7A08B] rotate-45" />
                </div>
              )}
            </div>

            {loading && (
              <div className="mt-5 bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl p-5">
                {/* 3-step progress */}
                <div className="space-y-4">
                  {LOAD_STEPS.map((s, i) => {
                    const stepNum = i + 1;
                    const isDone    = loadStep > stepNum;
                    const isActive  = loadStep === stepNum;
                    const isPending = loadStep < stepNum;
                    return (
                      <div key={s.label} className={`flex items-start gap-3 transition-opacity duration-500 ${isPending ? 'opacity-35' : 'opacity-100'}`}>
                        <div className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center">
                          {isDone   ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                          : isActive ? <Loader2 className="w-5 h-5 text-[#B7A08B] animate-spin" />
                          :            <div className="w-4 h-4 rounded-full border-2 border-[#B7A08B]/30" />}
                        </div>
                        <div>
                          <p className={`font-manrope text-sm font-semibold ${isDone ? 'text-white/40 line-through decoration-white/40' : isActive ? 'text-white' : 'text-white/60'}`}>
                            {s.label}{isActive ? '…' : ''}
                          </p>
                          {isActive && (
                            <p className="font-manrope text-xs text-[#B7A08B] mt-0.5">{s.desc}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Search context summary */}
                <p className="font-manrope text-xs text-white/60 text-center mt-5 leading-relaxed">
                  {bhk !== 'Any' ? `${bhk} ` : ''}{propertyType.toLowerCase()}s
                  {locality ? ` in ${locality},` : ' in'} <span className="font-semibold text-white/90">{city}</span>
                  {' '}· under PKR {maxBudget} {budgetUnit} · usually takes 15–30 s
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* API Key Modal */}
      <AIApiKeyModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onKeysChanged={refreshKeyStatus}
      />
    </section>
  );
};

export default AIHeroSection;