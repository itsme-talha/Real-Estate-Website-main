import React, { useState } from 'react';
import {
  MapPin, Maximize, SearchX, Home, ExternalLink,
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle,
  X, BarChart2, CheckCircle2, Compass, Building2, Sparkles,
} from 'lucide-react';
import type { ScrapedProperty, PropertyAnalysis, PropertyOverview } from '../../pages/AIPropertyHubPage';

interface Props {
  properties: ScrapedProperty[];
  loading: boolean;
  error: string | null;
  city: string;
  analysis?: PropertyAnalysis | null;
}

/* ── Source badge colours ────────────────────────────────── */
const SOURCE_META: Record<string, { label: string; cls: string }> = {
  'zameen':     { label: 'Zameen',     cls: 'bg-green-500/10  text-green-400  border-green-500/30'  },
  graana:       { label: 'Graana',     cls: 'bg-red-500/10    text-red-400    border-red-500/30'  },
  olx:          { label: 'OLX',        cls: 'bg-blue-500/10   text-blue-400   border-blue-500/30'    },
  agency21:     { label: 'Agency21',   cls: 'bg-amber-500/10  text-amber-400  border-amber-500/30'   },
};

/* ── Value verdict ───────────────────────────────────────── */
const VERDICT_META = {
  good_deal:  { label: '🟢 Good Deal',  cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  fair:       { label: '🟡 Fair Price', cls: 'bg-amber-500/10   text-amber-400   border-amber-500/30'   },
  overpriced: { label: '🔴 Overpriced', cls: 'bg-red-500/10     text-red-400     border-red-500/30'     },
} as const;

/* ── Known builders for verified badge ──────────────────── */
const KNOWN_BUILDERS = [
  'bahria', 'dha', 'habib rafique', 'graana', 'zem', 'imarat', 'paragon',
  'al jalil', 'izhar', 'fazaia', 'capital smart city', 'blue world',
];

/* ── Comparison table rows ───────────────────────────────── */
const COMPARE_ROWS = [
  { key: 'price',             label: 'Price'       },
  { key: 'price_per_sqft',    label: 'Per sqft'    },
  { key: 'area_sqft',         label: 'Area'        },
  { key: 'floor',             label: 'Floor'       },
  { key: 'possession_status', label: 'Possession'  },
  { key: 'facing_direction',  label: 'Facing'      },
  { key: 'parking',           label: 'Parking'     },
  { key: 'rera_number',       label: 'Approved'    }, // Changed RERA to Approved for PK
  { key: 'builder_name',      label: 'Builder'     },
  { key: 'amenities',         label: 'Amenities'   },
  { key: 'ai_verdict',        label: 'AI Verdict'  },
  { key: 'ai_insight',        label: 'AI Insight'  },
] as const;

/* ── Property card ──────────────────────────────────────── */

const PropertyCard: React.FC<{
  property: ScrapedProperty;
  insight?: PropertyOverview;
  isComparing: boolean;
  canCompare: boolean;
  onToggleCompare: () => void;
}> = ({ property, insight, isComparing, canCompare, onToggleCompare }) => {
  const [showFlags, setShowFlags] = useState(false);

  const srcKey     = property.source?.toLowerCase() ?? '';
  const sourceMeta = SOURCE_META[srcKey] ?? {
    label: property.source || 'Portal',
    cls: 'bg-[#154D57] text-[#B7A08B] border-[#B7A08B]/30',
  };
  const verdictMeta   = insight?.value_verdict ? VERDICT_META[insight.value_verdict] : null;
  const isVerified    = property.builder_name
    ? KNOWN_BUILDERS.some(b => property.builder_name!.toLowerCase().includes(b))
    : false;
  const redFlags      = insight?.red_flags ?? [];
  const hasMatchScore = insight?.match_score != null;

  return (
    <div className={`bg-[#0F3B43] rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col relative border ${isComparing ? 'border-[#B7A08B] ring-2 ring-[#B7A08B]/30' : 'border-[#B7A08B]/20'}`}>
      {/* Accent bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#B7A08B] to-[#154D57] opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="p-6 flex flex-col flex-1">

        {/* Row 1: source badge + value verdict */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-space-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${sourceMeta.cls}`}>
            {sourceMeta.label}
          </span>
          {verdictMeta && (
            <span className={`font-space-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${verdictMeta.cls}`}>
              {verdictMeta.label}
            </span>
          )}
        </div>

        {/* Building name */}
        <h3 className="font-syne text-[20px] font-bold text-white mb-1 leading-tight line-clamp-2 group-hover:text-[#B7A08B] transition-colors">
          {property.building_name || 'Premium Property'}
        </h3>

        {/* Builder name */}
        {property.builder_name && (
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#B7A08B]" />
            <span className="font-manrope text-[13px] text-white/60">
              by <span className="font-medium text-white/90">{property.builder_name}</span>
            </span>
          </div>
        )}

        {/* Location */}
        <div className="flex items-start gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#B7A08B] mt-0.5 shrink-0" />
          <span className="font-manrope text-sm text-white/70 leading-snug line-clamp-1">
            {property.location_address || 'Location not specified'}
          </span>
        </div>

        {/* Price + per-sqft / area box */}
        <div className="flex items-center justify-between bg-[#12434D] border border-[#B7A08B]/20 rounded-xl px-4 py-3 mb-3">
          <div>
            <p className="font-space-mono text-[9px] text-[#B7A08B] font-bold tracking-widest uppercase mb-0.5">
              Price
            </p>
            <p className="font-manrope font-extrabold text-white text-xl leading-none">
              {property.price || 'Contact for price'}
            </p>
          </div>
          {(property.price_per_sqft || property.area_sqft) && (
            <div className="text-right border-l border-[#B7A08B]/20 pl-3">
              {property.price_per_sqft && (
                <p className="font-manrope text-sm font-semibold text-white/80">
                  {property.price_per_sqft}
                </p>
              )}
              {property.area_sqft && (
                <p className="font-manrope text-xs text-[#B7A08B] flex items-center gap-1 justify-end mt-0.5">
                  <Maximize className="w-3 h-3" />
                  {property.area_sqft}
                </p>
              )}
            </div>
          )}
        </div>

        {/* BHK config + floor info */}
        {(property.bhk_config || property.floor_number) && (
          <p className="font-manrope text-sm text-white/60 mb-3">
            {[
              property.bhk_config,
              property.floor_number
                ? property.total_floors
                  ? `Floor ${property.floor_number} of ${property.total_floors}`
                  : `Floor ${property.floor_number}`
                : null,
            ]
              .filter(Boolean)
              .join('  ·  ')}
          </p>
        )}

        {/* Trust signal chips */}
        {(property.rera_number || property.possession_status || property.parking || property.facing_direction || isVerified) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.rera_number && (
              <span className="inline-flex items-center gap-1 font-manrope text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <CheckCircle className="w-3 h-3" /> Approved
              </span>
            )}
            {property.possession_status && (
              <span className="inline-flex items-center gap-1 font-manrope text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                {property.possession_status}
              </span>
            )}
            {property.facing_direction && (
              <span className="inline-flex items-center gap-1 font-manrope text-[11px] font-medium px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <Compass className="w-3 h-3" /> {property.facing_direction}
              </span>
            )}
            {property.parking && property.parking.toLowerCase() !== 'none' && (
              <span className="inline-flex items-center gap-1 font-manrope text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#154D57] border border-[#B7A08B]/20 text-white/80">
                P {property.parking}
              </span>
            )}
            {isVerified && (
              <span className="inline-flex items-center gap-1 font-manrope text-[11px] font-medium px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                ★ Verified Builder
              </span>
            )}
          </div>
        )}

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B7A08B]" />
              <span className="font-space-mono text-[10px] text-[#B7A08B] uppercase tracking-wider font-bold">Amenities</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 6).map((amenity, i) => (
                <span key={i} className="font-manrope text-[11px] px-2.5 py-1 rounded-md bg-[#12434D] border border-[#B7A08B]/20 text-white/70">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 6 && (
                <span className="font-manrope text-[11px] px-2.5 py-1 text-[#B7A08B]">
                  +{property.amenities.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Nearby Landmarks */}
        {property.nearby_landmarks && property.nearby_landmarks.length > 0 && (
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#B7A08B] mt-0.5 shrink-0" />
            <div>
              <span className="font-space-mono text-[10px] text-[#B7A08B] uppercase tracking-wider font-bold block mb-1">
                Nearby
              </span>
              <p className="font-manrope text-[12px] text-white/60 leading-relaxed">
                {property.nearby_landmarks.slice(0, 4).join(' · ')}
                {property.nearby_landmarks.length > 4 && ` · +${property.nearby_landmarks.length - 4} more`}
              </p>
            </div>
          </div>
        )}

        {/* Description (expandable) */}
        {property.description && property.description.trim() && (
          <div className="mb-4">
            <p className="font-manrope text-[12px] text-white/50 leading-relaxed line-clamp-2">
              {property.description}
            </p>
          </div>
        )}

        {/* AI insight block */}
        {insight?.one_line_insight && (
          <div className="bg-[#12434D] border border-[#B7A08B]/30 rounded-xl px-4 py-3 mb-3 shadow-inner">
            <p className="font-manrope text-[12px] text-white/90 font-medium leading-snug">
              <span className="font-bold text-[#B7A08B]">AI </span>
              &ldquo;{insight.one_line_insight}&rdquo;
            </p>
            {hasMatchScore && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-[#0F3B43] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B7A08B] to-white rounded-full transition-all duration-700"
                    style={{ width: `${insight.match_score}%` }}
                  />
                </div>
                <span className="font-space-mono text-[10px] text-[#B7A08B] font-bold shrink-0">
                  {insight.match_score}/100
                </span>
              </div>
            )}
          </div>
        )}

        {/* Red flags (collapsible) */}
        {redFlags.length > 0 && (
          <div className="mb-3">
            <button
              type="button"
              onClick={e => { e.stopPropagation(); setShowFlags(f => !f); }}
              className="flex items-center gap-2 w-full text-left font-manrope text-[12px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 hover:bg-amber-500/20 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>⚠ {redFlags.length} concern{redFlags.length > 1 ? 's' : ''}</span>
              {showFlags
                ? <ChevronUp className="w-3.5 h-3.5 ml-auto" />
                : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
            </button>
            {showFlags && (
              <ul className="mt-1 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 space-y-1">
                {redFlags.map((flag, i) => {
                  const flagText = typeof flag === 'string' ? flag : flag?.flag || '';
                  const severity = typeof flag === 'object' ? flag?.severity : null;
                  const severityColor = severity === 'critical' ? 'text-red-400' : severity === 'medium' ? 'text-amber-400' : 'text-amber-300';
                  return (
                    <li key={i} className={`font-manrope text-[12px] ${severityColor} flex items-start gap-1.5`}>
                      <span className="shrink-0 mt-0.5">{severity === 'critical' ? '⚠' : '→'}</span>
                      {flagText}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* Push action buttons to bottom */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#B7A08B]/20">
          {property.property_url ? (
            <a
              href={property.property_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#B7A08B] hover:bg-white text-[#154D57] font-manrope font-bold text-sm py-2.5 rounded-xl transition-all shadow-sm"
            >
              View listing <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="flex-1 inline-flex items-center justify-center bg-[#12434D] text-[#B7A08B]/50 font-manrope font-semibold text-sm py-2.5 rounded-xl cursor-not-allowed">
              No link
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCompare}
            disabled={!isComparing && !canCompare}
            className={`px-4 py-2.5 font-manrope font-semibold text-sm rounded-xl transition-all border ${
              isComparing
                ? 'bg-[#154D57] border-[#B7A08B] text-white'
                : canCompare
                  ? 'bg-transparent border-[#B7A08B]/40 text-[#B7A08B] hover:border-[#B7A08B] hover:text-white'
                  : 'bg-transparent border-[#B7A08B]/20 text-[#B7A08B]/30 cursor-not-allowed'
            }`}
          >
            {isComparing ? '✓ Added' : '+ Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Comparison modal ───────────────────────────────────── */

const ComparisonModal: React.FC<{
  items: ScrapedProperty[];
  insightMap: Map<string, PropertyOverview>;
  onClose: () => void;
}> = ({ items, insightMap, onClose }) => {

  const getCellValue = (property: ScrapedProperty, key: string): React.ReactNode => {
    const insight = insightMap.get((property.building_name || '').toLowerCase().trim());
    switch (key) {
      case 'price':
        return <span className="font-bold text-[#B7A08B]">{property.price || '—'}</span>;
      case 'price_per_sqft':
        return property.price_per_sqft || '—';
      case 'area_sqft':
        return property.area_sqft ? `${property.area_sqft}` : '—';
      case 'floor':
        return property.floor_number
          ? property.total_floors
            ? `${property.floor_number} / ${property.total_floors}`
            : property.floor_number
          : '—';
      case 'possession_status':
        return property.possession_status || '—';
      case 'facing_direction':
        return property.facing_direction
          ? <span className="inline-flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-sky-400" /> {property.facing_direction}</span>
          : <span className="text-white/30">—</span>;
      case 'parking':
        return property.parking && property.parking.toLowerCase() !== 'none'
          ? `${property.parking} ✓`
          : (property.parking || '—');
      case 'rera_number':
        return property.rera_number
          ? <span className="inline-flex items-center gap-1 text-emerald-400 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Yes</span>
          : <span className="text-white/30">—</span>;
      case 'builder_name':
        return property.builder_name || '—';
      case 'amenities':
        return property.amenities && property.amenities.length > 0
          ? <span className="text-[11px]">{property.amenities.slice(0, 3).join(', ')}{property.amenities.length > 3 && ` +${property.amenities.length - 3}`}</span>
          : <span className="text-white/30">—</span>;
      case 'ai_verdict': {
        const v = insight?.value_verdict;
        if (!v) return <span className="text-white/30">—</span>;
        const meta = VERDICT_META[v];
        return (
          <span className={`font-space-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta.cls}`}>
            {meta.label}
          </span>
        );
      }
      case 'ai_insight':
        return insight?.one_line_insight
          ? <span className="italic text-white/60">&ldquo;{insight.one_line_insight}&rdquo;</span>
          : <span className="text-white/30">—</span>;
      default:
        return '—';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F3B43]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-[#154D57] border border-[#B7A08B]/30 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-5xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B7A08B]/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#12434D] border border-[#B7A08B]/30 rounded-full flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-[#B7A08B]" />
            </div>
            <h2 className="font-syne text-xl font-bold text-white">Compare Properties</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#12434D] text-[#B7A08B] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable table */}
        <div className="overflow-auto flex-1">
          <table className="w-full border-collapse min-w-[480px]">
            {/* Property name headers */}
            <thead>
              <tr className="border-b-2 border-[#B7A08B]/30">
                <th className="w-[140px] sm:w-[160px] bg-[#12434D] px-4 py-4 sticky left-0 z-10 border-r border-[#B7A08B]/20" />
                {items.map((p, i) => (
                  <th key={i} className="px-5 py-4 text-left min-w-[220px]">
                    <p className="font-syne font-bold text-white text-[15px] leading-tight">
                      {p.building_name || 'Property'}
                    </p>
                    <p className="font-manrope text-[12px] text-[#B7A08B] mt-1 line-clamp-1">
                      {p.location_address || ''}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(({ key, label }, ri) => (
                <tr
                  key={key}
                  className={`border-b border-[#B7A08B]/10 ${ri % 2 === 0 ? 'bg-[#0F3B43]' : 'bg-[#12434D]'}`}
                >
                  {/* Row label — sticky left */}
                  <td className="sticky left-0 z-10 px-4 py-3.5 border-r border-[#B7A08B]/20 bg-inherit">
                    <span className="font-space-mono text-[11px] font-bold text-[#B7A08B] uppercase tracking-wider whitespace-nowrap">
                      {label}
                    </span>
                  </td>
                  {items.map((p, ci) => (
                    <td key={ci} className="px-5 py-3.5">
                      <span className="font-manrope text-[14px] text-white/80">
                        {getCellValue(p, key)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── Main section ───────────────────────────────────────── */

const AISearchResults: React.FC<Props> = ({ properties, loading, error, city, analysis }) => {
  const [compareList, setCompareList]   = useState<ScrapedProperty[]>([]);
  const [showModal, setShowModal]       = useState(false);

  // Build a fast lookup by normalised building name
  const insightMap = React.useMemo<Map<string, PropertyOverview>>(() => {
    const map = new Map<string, PropertyOverview>();
    analysis?.overview?.forEach(item => {
      map.set(item.name.toLowerCase().trim(), item);
    });
    return map;
  }, [analysis]);

  const toggleCompare = (property: ScrapedProperty) => {
    setCompareList(prev => {
      const idx = prev.findIndex(p => p.building_name === property.building_name && p.location_address === property.location_address);
      if (idx !== -1) return prev.filter((_, i) => i !== idx);
      if (prev.length >= 3) return prev;
      return [...prev, property];
    });
  };

  /* Loading skeleton */
  if (loading) {
    return (
      <div>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-[#12434D] border border-[#B7A08B]/30 shadow-sm rounded-full px-5 py-2.5 mb-6 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-[#B7A08B] animate-ping" />
            <span className="font-space-mono text-xs text-white/60 font-bold uppercase tracking-wider">
              AI is searching the market...
            </span>
          </div>
          <h2 className="font-syne text-3xl text-white mb-3 font-bold">Gathering Intelligence</h2>
          <p className="font-manrope text-base text-[#B7A08B]">
            Scraping live listings in {city} and scoring investment potential.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-[#0F3B43]/80 border border-[#B7A08B]/20 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-6 w-24 bg-[#B7A08B]/30 rounded-full" />
                <div className="h-6 w-20 bg-[#B7A08B]/10 rounded-full" />
              </div>
              <div className="h-6 bg-[#B7A08B]/40 rounded-lg w-3/4 mb-2" />
              <div className="h-4 bg-[#B7A08B]/20 rounded w-2/3 mb-4" />
              <div className="h-16 bg-[#12434D] border border-[#B7A08B]/20 rounded-xl mb-4" />
              <div className="flex gap-1.5 mb-4">
                <div className="h-7 bg-[#B7A08B]/20 rounded-lg w-16" />
                <div className="h-7 bg-[#B7A08B]/20 rounded-lg w-24" />
              </div>
              <div className="flex gap-2 pt-4 border-t border-[#B7A08B]/20">
                <div className="flex-1 h-10 bg-[#B7A08B]/20 rounded-xl" />
                <div className="h-10 w-24 bg-[#B7A08B]/20 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="py-10 text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="font-syne text-2xl text-white mb-2">Search Failed</h3>
        <p className="font-manrope font-light text-white/60">{error}</p>
      </div>
    );
  }

  /* Empty */
  if (properties.length === 0) {
    return (
      <div className="py-10 text-center">
        <div className="w-16 h-16 bg-[#B7A08B]/10 border border-[#B7A08B]/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Home className="w-8 h-8 text-[#B7A08B]" />
        </div>
        <h3 className="font-syne text-2xl text-white mb-2">No Properties Found</h3>
        <p className="font-manrope font-light text-[#B7A08B]">
          No properties found in {city} within your budget. Try increasing your budget or changing the property type.
        </p>
      </div>
    );
  }

  /* Count properties with AI insights */
  const aiMatchCount = properties.filter(p =>
    insightMap.has((p.building_name || '').toLowerCase().trim())
  ).length;

  /* Results */
  return (
    <>
      <div>
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-space-mono text-[11px] text-[#B7A08B] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B7A08B] animate-pulse shadow-[0_0_8px_#B7A08B]" />
              Live AI Results
            </div>
            <h2 className="font-syne text-3xl font-bold text-white mb-1.5">
              Properties in {city}
            </h2>
            <p className="font-manrope text-base text-white/60">
              Our AI found{' '}
              <strong className="text-white">{properties.length}</strong>{' '}
              {properties.length === 1 ? 'match' : 'matches'}
              {aiMatchCount > 0 && (
                <> · <strong className="text-[#B7A08B]">{aiMatchCount}</strong> with AI insights</>
              )}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property, index) => {
            const insight    = insightMap.get((property.building_name || '').toLowerCase().trim());
            const isComparing = compareList.some(
              p => p.building_name === property.building_name && p.location_address === property.location_address
            );
            const canCompare  = compareList.length < 3;
            return (
              <PropertyCard
                key={index}
                property={property}
                insight={insight}
                isComparing={isComparing}
                canCompare={canCompare}
                onToggleCompare={() => toggleCompare(property)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Sticky comparison bar ─────────────────────────────── */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
          compareList.length >= 2 ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-[#12434D] border-t border-[#B7A08B]/30 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.4)]">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-4">
            {/* Selected property pills */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {compareList.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl px-3 py-1.5 min-w-0"
                >
                  <span className="font-manrope text-[13px] font-bold text-white truncate max-w-[140px]">
                    {p.building_name || 'Property'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleCompare(p)}
                    className="shrink-0 text-[#B7A08B]/60 hover:text-[#B7A08B] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Count + CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-manrope text-[13px] text-white/60 hidden sm:block">
                {compareList.length} {compareList.length === 1 ? 'property' : 'properties'} selected
              </span>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-[#B7A08B] hover:bg-white text-[#154D57] font-manrope font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#B7A08B]/20"
              >
                <BarChart2 className="w-4 h-4" />
                Compare Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Comparison modal ──────────────────────────────────── */}
      {showModal && compareList.length >= 2 && (
        <ComparisonModal
          items={compareList}
          insightMap={insightMap}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default AISearchResults;