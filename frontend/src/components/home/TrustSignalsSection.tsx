import React from 'react';
import teamImage from '../../images/Team section.jpg';

const TrustSignalsSection: React.FC = () => {
  return (
    <section className="bg-[#12434D] py-24 border-y border-[#B7A08B]/10">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-fraunces text-5xl text-white mb-6">Redefining Real Estate</h2>
          <div className="w-24 h-1 bg-[#B7A08B] mx-auto rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with Border */}
          <div className="relative">
            <div className="border-2 border-[#B7A08B]/30 rounded-2xl p-4">
              <img
                src={teamImage}
                alt="Team meeting in modern office"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-[#154D57]/10 rounded-2xl mix-blend-overlay"></div>
            </div>
          </div>

          {/* Right - Features */}
          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#154D57] border border-[#B7A08B]/30 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:border-[#B7A08B] transition-all">
                  <span className="font-material-icons text-2xl text-[#B7A08B]">verified_user</span>
                </div>
              </div>
              <div>
                <h4 className="font-syne font-bold text-xl text-white mb-2">Verified Listings Only</h4>
                <p className="font-manrope text-base text-white/70 leading-relaxed">
                  Every property on our platform is physically verified by our team to
                  ensure what you see is what you get.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#154D57] border border-[#B7A08B]/30 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:border-[#B7A08B] transition-all">
                  <span className="font-material-icons text-2xl text-[#B7A08B]">support_agent</span>
                </div>
              </div>
              <div>
                <h4 className="font-syne font-bold text-xl text-white mb-2">24/7 Concierge Support</h4>
                <p className="font-manrope text-base text-white/70 leading-relaxed">
                  Our dedicated team is always available to answer questions,
                  schedule viewings, and provide expert advice.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#154D57] border border-[#B7A08B]/30 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:border-[#B7A08B] transition-all">
                  <span className="font-material-icons text-2xl text-[#B7A08B]">savings</span>
                </div>
              </div>
              <div>
                <h4 className="font-syne font-bold text-xl text-white mb-2">Transparent Pricing</h4>
                <p className="font-manrope text-base text-white/70 leading-relaxed">
                  No hidden fees. We provide clear, upfront cost breakdowns so you
                  can budget with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;