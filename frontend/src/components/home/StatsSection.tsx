import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#12434D] border-y border-[#B7A08B]/20 py-12 relative z-20 shadow-lg">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#B7A08B]/20">
          <div className="text-center">
            <div className="font-space-mono font-bold text-4xl text-[#B7A08B] mb-2 drop-shadow-sm">2,450+</div>
            <div className="font-syne font-medium text-sm text-white/70 uppercase tracking-wider">Properties Sold</div>
          </div>
          <div className="text-center">
            <div className="font-space-mono font-bold text-4xl text-[#B7A08B] mb-2 drop-shadow-sm">98%</div>
            <div className="font-syne font-medium text-sm text-white/70 uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="font-space-mono font-bold text-4xl text-[#B7A08B] mb-2 drop-shadow-sm">15+</div>
            <div className="font-syne font-medium text-sm text-white/70 uppercase tracking-wider">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="font-space-mono font-bold text-4xl text-[#B7A08B] mb-2 drop-shadow-sm">PKR 350B+</div>
            <div className="font-syne font-medium text-sm text-white/70 uppercase tracking-wider">Market Value</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;