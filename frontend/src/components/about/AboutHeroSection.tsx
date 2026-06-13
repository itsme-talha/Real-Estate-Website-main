import React from 'react';
import mainAboutImage from '../../images/Main about image.jpg';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#154D57] h-[480px] overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ 
          backgroundImage: `url('${mainAboutImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-[702px] px-8">
          <h1 className="font-fraunces text-[56px] leading-[61.6px] text-white mb-6 drop-shadow-md">
            Redefining Real Estate with<br />
            <span className="italic text-[#B7A08B]">Intelligence & Elegance</span>
          </h1>
          
          {/* Divider */}
          <div className="w-24 h-px bg-[#B7A08B]/60 mx-auto mb-8" />
          
          <p className="font-manrope font-extralight text-lg text-white/90 tracking-wide drop-shadow-sm">
            Where data-driven precision meets the art of living.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;