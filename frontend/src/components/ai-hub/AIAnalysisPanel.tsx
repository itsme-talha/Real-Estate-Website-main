import React, { useMemo } from 'react';
import {
  Brain,
  Lightbulb,
  ChevronRight,
  Trophy,
  AlertCircle,
} from 'lucide-react';
import type { PropertyAnalysis } from '../../pages/AIPropertyHubPage';

interface Props {
  analysis: PropertyAnalysis | null;
  loading: boolean;
  error: string | null;
  city: string;
}

const AIAnalysisPanel: React.FC<Props> = ({ analysis, loading, error, city }) => {
  /* ── Verdict count summary ─────────────────────────── */
  const verdictCounts = useMemo(() => {
    const counts = { good_deal: 0, fair: 0, overpriced: 0 };
    analysis?.overview?.forEach(item => {
      if (item.value_verdict && item.value_verdict in counts) {
        counts[item.value_verdict as keyof typeof counts]++;
      }
    });
    return counts;
  }, [analysis]);

  const hasVerdicts =
    verdictCounts.good_deal > 0 ||
    verdictCounts.fair > 0 ||
    verdictCounts.overpriced > 0;

  /* ── Loading skeleton ──────────────────────────────── */
  if (loading) {
    return (
      <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-2xl p-6 space-y-5 animate-pulse shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#B7A08B]/20 rounded-full shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-5 bg-[#B7A08B]/20 rounded w-3/4" />
            <div className="h-3.5 bg-[#B7A08B]/10 rounded w-full" />
          </div>
        </div>
        {/* Verdict pills */}
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-[#B7A08B]/20 rounded-full" />
          <div className="h-6 w-20 bg-[#B7A08B]/20 rounded-full" />
        </div>
        {/* Best value block */}
        <div className="h-28 bg-[#B7A08B]/10 rounded-xl" />
        {/* Recs */}
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#B7A08B]/20 rounded-full shrink-0" />
              <div className="h-4 bg-[#B7A08B]/10 rounded flex-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !analysis) return null;

  return (
    <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-2xl p-6 space-y-5 mt-15 shadow-xl">
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-full flex items-center justify-center shrink-0">
          <Brain className="w-4 h-4 text-[#B7A08B]" />
        </div>
        <div>
          <h2 className="font-syne text-base font-bold text-white leading-tight">
            AI Market Analysis
          </h2>
          <p className="font-manrope text-[12px] text-[#B7A08B] leading-tight mt-0.5">
            {city}
          </p>
        </div>
      </div>

      {/* ── Partial error banner ─────────────────────── */}
      {analysis.error && (
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="font-manrope text-xs text-amber-300">{analysis.error}</p>
        </div>
      )}

      {/* ── Verdict count summary ─────────────────────── */}
      {hasVerdicts && (
        <div className="flex flex-wrap gap-1.5">
          {verdictCounts.good_deal > 0 && (
            <span className="font-space-mono text-[10px] font-bold px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
              🟢 Good Deal: {verdictCounts.good_deal}
            </span>
          )}
          {verdictCounts.fair > 0 && (
            <span className="font-space-mono text-[10px] font-bold px-2.5 py-1 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/30">
              🟡 Fair: {verdictCounts.fair}
            </span>
          )}
          {verdictCounts.overpriced > 0 && (
            <span className="font-space-mono text-[10px] font-bold px-2.5 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/30">
              🔴 Overpriced: {verdictCounts.overpriced}
            </span>
          )}
        </div>
      )}

      {/* ── Best value pick ───────────────────────────── */}
      {analysis.best_value && (
        <div className="relative bg-[#0F3B43] overflow-hidden rounded-xl p-5 flex flex-col gap-3 shadow-inner border border-[#B7A08B]/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B7A08B]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-8 h-8 bg-[#B7A08B]/20 border border-[#B7A08B]/30 rounded-xl flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4 text-[#B7A08B]" />
            </div>
            <span className="font-space-mono text-[10px] text-[#B7A08B] uppercase tracking-widest font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7A08B] animate-pulse inline-block shadow-[0_0_8px_#B7A08B]" />
              Best Value Pick
            </span>
          </div>

          <div className="relative z-10">
            <h4 className="font-syne text-lg font-bold text-white leading-snug mb-1.5">
              {analysis.best_value.name}
            </h4>
            <p className="font-manrope text-[13px] text-white/70 leading-relaxed">
              {analysis.best_value.reason}
            </p>
          </div>
        </div>
      )}

      {/* ── Recommendations ──────────────────────────── */}
      {analysis.recommendations?.length > 0 && (
        <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-5">
          <h3 className="font-syne text-sm font-bold text-white mb-3 flex items-center gap-2 pb-3 border-b border-[#B7A08B]/20">
            <Lightbulb className="w-4 h-4 text-[#B7A08B] shrink-0" />
            Strategic Recommendations
          </h3>

          <ul className="flex flex-col gap-2">
            {analysis.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 bg-[#12434D] border border-[#B7A08B]/10 rounded-lg p-3"
              >
                <div className="mt-0.5 bg-[#154D57] p-1 rounded-full border border-[#B7A08B]/20 shrink-0">
                  <ChevronRight className="w-3 h-3 text-[#B7A08B]" />
                </div>
                <span className="font-manrope text-[13px] font-medium text-white/80 leading-relaxed">
                  {rec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisPanel;