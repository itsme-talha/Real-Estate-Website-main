import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-[#154D57] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <div className="font-space-mono text-sm text-[#B7A08B] uppercase tracking-widest mb-4">Testimonials</div>
            <h2 className="font-fraunces text-5xl text-white">What Our Clients Say</h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-2xl p-8 hover:border-[#B7A08B]/50 transition-all hover:-translate-y-1 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-icons text-[#B7A08B] text-xl">star</span>
              ))}
            </div>
            <p className="font-manrope text-base text-white/80 leading-relaxed mb-6">
              "BuildEstate's AI matched us with our dream home in just 2 weeks. The process was seamless and personalized."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-full flex items-center justify-center">
                <span className="font-syne font-bold text-[#B7A08B]">ZA</span>
              </div>
              <div>
                <div className="font-syne font-bold text-sm text-white">Zara Ahmed</div>
                <div className="font-manrope text-xs text-[#B7A08B]">DHA, Lahore</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-2xl p-8 hover:border-[#B7A08B]/50 transition-all hover:-translate-y-1 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-icons text-[#B7A08B] text-xl">star</span>
              ))}
            </div>
            <p className="font-manrope text-base text-white/80 leading-relaxed mb-6">
              "The neighborhood insights were invaluable. We knew exactly what we were getting before even visiting."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-full flex items-center justify-center">
                <span className="font-syne font-bold text-[#B7A08B]">FA</span>
              </div>
              <div>
                <div className="font-syne font-bold text-sm text-white">Fahad Ali</div>
                <div className="font-manrope text-xs text-[#B7A08B]">Clifton, Karachi</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-2xl p-8 hover:border-[#B7A08B]/50 transition-all hover:-translate-y-1 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-icons text-[#B7A08B] text-xl">star</span>
              ))}
            </div>
            <p className="font-manrope text-base text-white/80 leading-relaxed mb-6">
              "Best real estate experience ever. The AI recommendations were spot-on and saved us months of searching."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-full flex items-center justify-center">
                <span className="font-syne font-bold text-[#B7A08B]">SK</span>
              </div>
              <div>
                <div className="font-syne font-bold text-sm text-white">Sana Khan</div>
                <div className="font-manrope text-xs text-[#B7A08B]">Bahria Town, Islamabad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;