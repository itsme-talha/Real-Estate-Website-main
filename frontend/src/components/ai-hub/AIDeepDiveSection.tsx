import React from 'react';
import { TrendingDown } from 'lucide-react';

const AIDeepDiveSection: React.FC = () => {
  const imgContainer = "https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?w=800";
  
  // Mock data for analysis visualization
  const analysisData = {
    marketScoring: [
      { label: 'Value Potential', score: 92 },
      { label: 'Rental Yield', score: 85 },
      { label: 'Appreciation', score: 88 }
    ],
    investmentMetrics: [
      { label: 'ROI (5yr)', value: '45%' },
      { label: 'Cap Rate', value: '5.2%' },
      { label: 'Cash Flow', value: 'PKR 1.2M/mo' }
    ],
    neighborhoodScore: 94
  };

  return (
    <section className="bg-[#154D57] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-space-mono text-xs text-[#B7A08B] uppercase tracking-[1.2px] mb-4">
            Deep Analysis
          </div>
          <h2 className="font-syne text-4xl text-white">
            Deep Dive Analysis
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Featured Property Card */}
          <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-xl overflow-hidden shadow-2xl">
            {/* Image */}
            <div className="relative aspect-[382/286.5] overflow-hidden group">
              <img 
                src={imgContainer}
                alt="Property analysis"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#154D57]/70 to-transparent h-16" />
              
              {/* Match Badge */}
              <div className="absolute bottom-4 left-4 backdrop-blur-md bg-[#12434D]/90 border border-[#B7A08B]/30 rounded px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]" />
                  <span className="font-space-mono text-xs text-white font-bold">
                    97% Match
                  </span>
                </div>
              </div>
            </div>

            {/* Market Badge */}
            <div className="bg-green-500/10 border-b border-green-500/20 px-6 py-4 flex items-center justify-between">
              <span className="font-syne text-xs text-green-400 uppercase tracking-wider font-bold">
                Under Market Value
              </span>
              <TrendingDown className="w-5 h-5 text-green-400" />
            </div>

            {/* Property Details */}
            <div className="p-6">
              <h3 className="font-syne text-xl text-white mb-2">
                The Gulberg Retreat
              </h3>
              <p className="font-space-mono font-bold text-lg text-[#B7A08B] mb-4">
                PKR 350,000,000
              </p>

              <p className="font-manrope font-extralight text-sm leading-relaxed text-white/70 mb-6">
                Unobstructed city views from the 15th floor. Recent
                price drop makes this a prime acquisition target.
              </p>

              {/* Specs */}
              <div className="flex items-center divide-x divide-[#B7A08B]/20 border-t border-[#B7A08B]/20 pt-4">
                <div className="flex-1 text-center">
                  <div className="font-syne text-base text-white mb-1">4</div>
                  <div className="font-manrope font-extralight text-xs text-white/50 uppercase tracking-wide">
                    Beds
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="font-syne text-base text-white mb-1">3</div>
                  <div className="font-manrope font-extralight text-xs text-white/50 uppercase tracking-wide">
                    Baths
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="font-syne text-base text-white mb-1">2.8k</div>
                  <div className="font-manrope font-extralight text-xs text-white/50 uppercase tracking-wide">
                    Sqft
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Analysis Panels */}
          <div className="space-y-6">
            {/* Market Scoring */}
            <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-xl p-6 shadow-lg hover:border-[#B7A08B]/40 transition-colors">
              <h3 className="font-syne text-lg text-white mb-6">
                Market Scoring
              </h3>
              <div className="space-y-4">
                {analysisData.marketScoring.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-manrope font-extralight text-sm text-white/80">
                        {item.label}
                      </span>
                      <span className="font-space-mono font-bold text-sm text-[#B7A08B]">
                        {item.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#0F3B43] rounded-full overflow-hidden border border-[#B7A08B]/10">
                      <div 
                        className="h-full bg-[#B7A08B] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment ROI Snapshot */}
            <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-xl p-6 shadow-lg hover:border-[#B7A08B]/40 transition-colors">
              <h3 className="font-syne text-lg text-white mb-6">
                Investment ROI Snapshot
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {analysisData.investmentMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-3 bg-[#0F3B43] rounded-lg border border-[#B7A08B]/10">
                    <div className="font-space-mono font-bold text-xl text-[#B7A08B] mb-1">
                      {metric.value}
                    </div>
                    <div className="font-manrope font-extralight text-xs text-white/60">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood Analysis */}
            <div className="bg-[#B7A08B] text-[#154D57] rounded-xl p-6 flex items-center justify-between shadow-lg">
              <div>
                <h3 className="font-syne font-bold text-lg mb-2">
                  Neighborhood Match
                </h3>
                <p className="font-manrope font-medium text-sm opacity-80">
                  Based on lifestyle preferences
                </p>
              </div>
              <div className="relative w-20 h-20">
                {/* Circular Progress */}
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="rgba(21,77,87,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#154D57"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - analysisData.neighborhoodScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-space-mono font-bold text-lg text-[#154D57]">
                    {analysisData.neighborhoodScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDeepDiveSection;