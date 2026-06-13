import React from 'react';
import { Link } from 'react-router-dom';
import glassPavilion from '../../images/The Glass Pavilion.jpg';
import skylinePenthouse from '../../images/Skyline Penthouse.jpg';
import desertOasis from '../../images/Desert Oasis.jpg';
import coastalRetreat from '../../images/Coastal Retreat.jpg';

const CuratedListingsSection: React.FC = () => {
    const propertyImages = [
        glassPavilion,
        skylinePenthouse,
        desertOasis,
        coastalRetreat
    ];

  return (
    <section className="bg-[#12434D] py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
          <path d="M0 0h20v20H0z" fill="#B7A08B" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="font-space-mono text-sm text-[#B7A08B] uppercase tracking-widest mb-4">Exclusive Selection</div>
            <h2 className="font-fraunces text-5xl text-white">Curated Listings</h2>
          </div>

          <Link to="/properties" className="flex items-center gap-2 font-manrope font-bold text-[#B7A08B] hover:text-white hover:gap-4 transition-all">
            View All Properties
            <span className="font-material-icons text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-12 gap-6">

          {/* Large Featured Property */}
          <div className="col-span-12 md:col-span-8 rounded-2xl overflow-hidden shadow-lg relative group border border-[#B7A08B]/20 hover:border-[#B7A08B]/50 transition-colors">
            <div className="relative h-[500px]">
              <img 
                src={propertyImages[0]} 
                alt="Luxury villa in DHA Phase 8 Karachi" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#154D57] via-[#154D57]/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-[#B7A08B] inline-block px-3 py-1 rounded text-[#154D57] font-manrope font-bold text-xs mb-4 shadow-md">
                  FEATURED
                </div>
                <h3 className="font-fraunces text-3xl text-white mb-2">The Glass Pavilion</h3>
                <p className="font-manrope font-light text-[#B7A08B] mb-4">DHA Phase 8, Karachi</p>
                <div className="border-t border-[#B7A08B]/30 pt-4 flex items-center justify-between">
                  <span className="font-space-mono text-white text-lg font-bold">PKR 350,000,000</span>
                  <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="font-material-icons text-sm text-[#B7A08B]">bed</span>
                      <span className="font-space-mono text-sm">6 Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-material-icons text-sm text-[#B7A08B]">square_foot</span>
                      <span className="font-space-mono text-sm">8,200 sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Property Card */}
          <div className="col-span-12 md:col-span-4 rounded-2xl overflow-hidden shadow-lg relative group border border-[#B7A08B]/20 hover:border-[#B7A08B]/50 transition-colors">
            <div className="relative h-[500px]">
              <img 
                src={propertyImages[1]} 
                alt="Skyline Penthouse luxury apartment in Gulberg Lahore" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#154D57] via-[#154D57]/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-fraunces text-xl text-white mb-1">Skyline Penthouse</h3>
                <p className="font-manrope text-sm text-[#B7A08B] mb-3">Gulberg III, Lahore</p>
                <span className="font-space-mono text-sm text-white font-bold">PKR 150,000,000</span>
              </div>
            </div>
          </div>

          {/* Desert Oasis -> Serene Villa */}
          <div className="col-span-12 md:col-span-4 rounded-2xl overflow-hidden shadow-lg aspect-square group border border-[#B7A08B]/20 hover:border-[#B7A08B]/50 transition-colors">
            <div className="relative h-full">
              <img 
                src={propertyImages[2]} 
                alt="Serene modern home in Bahria Town Islamabad" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#154D57] via-[#154D57]/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-fraunces text-xl text-white mb-1">Serene Villa</h3>
                <p className="font-manrope text-sm text-[#B7A08B] mb-3">Bahria Town, Islamabad</p>
                <span className="font-space-mono text-sm text-white font-bold">PKR 85,000,000</span>
              </div>
            </div>
          </div>

          {/* Coastal Retreat -> Lakeside Retreat */}
          <div className="col-span-12 md:col-span-8 rounded-2xl overflow-hidden shadow-lg relative group border border-[#B7A08B]/20 hover:border-[#B7A08B]/50 transition-colors">
            <div className="relative h-[800px] md:h-full">
              <img 
                src={propertyImages[3]} 
                alt="Lakeside Retreat mansion in Lake City Lahore" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#154D57] via-[#154D57]/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-fraunces text-2xl text-white mb-2">Lakeside Retreat</h3>
                <p className="font-manrope text-[#B7A08B] mb-6">Lake City, Lahore</p>
                <div className="border-t border-[#B7A08B]/30 pt-6 flex items-center justify-between">
                  <span className="font-space-mono text-white text-lg font-bold">PKR 250,000,000</span>
                  <button className="text-[#154D57] bg-[#B7A08B] hover:bg-white p-3 rounded-full transition-all shadow-lg">
                    <span className="font-material-icons text-xl">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedListingsSection;