import React from 'react';

const AboutCTASection: React.FC = () => {
  return (
    <section className="bg-[#B7A08B] py-24 relative overflow-hidden">
      {/* Background Pattern */}
        <img 
          src="/src/images/Abstract architectural texture with light and shadow.png" 
          alt="Background Texture"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute top-0 left-1/4 w-96"/>

      <div className="max-w-[1280px] mx-auto px-8 text-center relative z-10">
        <h2 className="font-fraunces text-5xl text-[#154D57] mb-6 font-bold">
          Ready to Find Your Dream Home?
        </h2>
        <p className="font-manrope font-medium text-xl text-[#154D57]/80 mb-10 max-w-[680px] mx-auto">
          Join thousands of satisfied homeowners who found their perfect property with BuildEstate's AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#154D57] text-white font-manrope font-bold text-lg px-10 py-4 rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:bg-white hover:text-[#154D57] transition-all">
            Get Started
          </button>
          <button className="border-2 border-[#154D57] text-[#154D57] font-manrope font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#154D57] hover:text-white transition-all">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutCTASection;