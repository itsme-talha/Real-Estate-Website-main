import React from 'react';
import mapLocationImage from '../../images/Map_Location.jpg';

const ContactMapSection: React.FC = () => {
  return (
    <section className="bg-[#0F3B43] py-16 shadow-inner">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative aspect-[1280/400] rounded-2xl overflow-hidden border border-[#B7A08B]/30 bg-[#154D57]">
          {/* Map Image */}
          <img 
            src={mapLocationImage}
            alt="Office location map"
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          
          {/* Map Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#12434D]/90 backdrop-blur-sm border border-[#B7A08B]/40 shadow-2xl rounded-xl px-8 py-4 flex items-center gap-4 hover:bg-[#154D57] transition-all group">
              <span className="material-icons text-3xl text-[#B7A08B] group-hover:scale-110 transition-transform">
                location_on
              </span>
              <div className="text-left">
                <p className="font-syne font-bold text-lg text-white mb-0.5">
                  BuildEstate Office
                </p>
                <p className="font-manrope font-extralight text-xs text-[#B7A08B]">
                  Click to view on Google Maps
                </p>
              </div>
              <span className="material-icons text-[#B7A08B] ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;