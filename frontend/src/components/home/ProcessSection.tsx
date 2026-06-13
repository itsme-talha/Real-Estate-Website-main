import React from 'react';

const ProcessSection: React.FC = () => {
  return (
    <section className="bg-[#0F3B43] py-24 shadow-inner">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Sticky Content */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="font-space-mono text-sm text-[#B7A08B] uppercase tracking-widest mb-6">Process</div>
              <h2 className="font-fraunces text-5xl text-white mb-6 leading-tight">
                The Path to Your<br />
                <span className="italic text-[#B7A08B]">New Beginning</span>
              </h2>
              <p className="font-manrope font-light text-lg text-white/80 mb-8 leading-relaxed">
                We've simplified the complex journey of buying a home into four seamless, AI-
                assisted steps.
              </p>
              <button className="bg-[#B7A08B] text-[#154D57] font-manrope font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-white hover:text-[#154D57] transition-all">
                Start Your Journey
              </button>
            </div>
          </div>

          {/* Right - Process Steps */}
          <div className="lg:col-span-8 space-y-12">
            {/* Step 1 */}
            <div className="group">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 border-2 border-[#B7A08B]/30 rounded-full flex items-center justify-center group-hover:border-[#B7A08B] group-hover:bg-[#B7A08B]/10 transition-all">
                    <span className="font-space-mono font-bold text-xl text-[#B7A08B]">01</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-2xl text-white mb-3">Profile Analysis</h3>
                  <p className="font-manrope text-base text-white/70 leading-relaxed">
                    Our AI deep-dives into your preferences, lifestyle needs, and financial goals to build a comprehensive
                    buyer profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 border-2 border-[#B7A08B]/30 rounded-full flex items-center justify-center group-hover:border-[#B7A08B] group-hover:bg-[#B7A08B]/10 transition-all">
                    <span className="font-space-mono font-bold text-xl text-[#B7A08B]">02</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-2xl text-white mb-3">Smart Matching</h3>
                  <p className="font-manrope text-base text-white/70 leading-relaxed">
                    Algorithms scan thousands of listings to find properties that align with your unique criteria, filtering out
                    the noise.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 border-2 border-[#B7A08B]/30 rounded-full flex items-center justify-center group-hover:border-[#B7A08B] group-hover:bg-[#B7A08B]/10 transition-all">
                    <span className="font-space-mono font-bold text-xl text-[#B7A08B]">03</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-2xl text-white mb-3">Virtual Tours & Insights</h3>
                  <p className="font-manrope text-base text-white/70 leading-relaxed">
                    Experience homes remotely with immersive 3D tours and receive detailed neighborhood analytics
                    reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 border-2 border-[#B7A08B]/30 rounded-full flex items-center justify-center group-hover:border-[#B7A08B] group-hover:bg-[#B7A08B]/10 transition-all">
                    <span className="font-space-mono font-bold text-xl text-[#B7A08B]">04</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-2xl text-white mb-3">Seamless Closing</h3>
                  <p className="font-manrope text-base text-white/70 leading-relaxed">
                    From offer to keys, our digital platform handles paperwork, negotiations, and closing logistics
                    effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;