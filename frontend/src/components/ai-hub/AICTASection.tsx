import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AICTASection: React.FC = () => {
  return (
    <section className="bg-[#B7A08B] py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <img 
        src="/src/images/Abstract architectural texture with light and shadow.png" 
        alt="Background Texture"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
      />
      <div className="absolute top-0 left-1/4 w-96"/>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <h2 className="font-fraunces text-4xl text-[#154D57] mb-4 font-bold">
          Explore Our Full Property Listings
        </h2>
        <p className="font-manrope font-medium text-lg text-[#154D57]/80 mb-8 max-w-[560px] mx-auto">
          Browse all available properties or let our AI find
          the perfect match for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 bg-[#154D57] hover:bg-white text-white hover:text-[#154D57] font-manrope font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Browse Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#154D57] hover:bg-[#154D57] hover:text-white text-[#154D57] font-manrope font-bold px-8 py-4 rounded-xl transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AICTASection;