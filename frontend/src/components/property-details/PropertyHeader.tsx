import React from 'react';

interface PropertyHeaderProps {
  status?: 'available' | 'sold' | 'pending';
  refNumber?: string;
  name?: string;
  location?: string;
  price?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  status = 'available',
  refNumber = '#LHR-SKT-402',
  name = 'Skyline Towers: 4-Bed Apartment in Lahore',
  location = 'Gulberg III, Lahore, Punjab',
  price = '75,000,000',
  beds = 4,
  baths = 4,
  sqft = 1200
}) => {
  const statusConfig = {
    available: {
      bg: 'bg-green-500/20',
      dotColor: 'bg-green-400',
      textColor: 'text-green-300',
      label: 'Available'
    },
    sold: {
      bg: 'bg-red-500/20',
      dotColor: 'bg-red-400',
      textColor: 'text-red-300',
      label: 'Sold'
    },
    pending: {
      bg: 'bg-amber-500/20',
      dotColor: 'bg-amber-400',
      textColor: 'text-amber-300',
      label: 'Pending'
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-[#154D57] border-b border-[#B7A08B]/20 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left - Property Info */}
          <div className="flex-1">
            {/* Status Badge & Ref Number */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`${currentStatus.bg} rounded-full px-4 py-1 flex items-center gap-2 border border-current/10`}>
                <div className={`${currentStatus.dotColor} w-2 h-2 rounded-full`} />
                <span className={`font-manrope font-extralight text-xs ${currentStatus.textColor} uppercase tracking-wider`}>
                  {currentStatus.label}
                </span>
              </div>
              <span className="font-manrope font-extralight text-sm text-[#B7A08B]">
                Ref: {refNumber}
              </span>
            </div>

            {/* Property Name */}
            <h1 className="font-manrope font-extralight text-4xl text-white leading-tight tracking-tight mb-3 drop-shadow-sm">
              {name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-[#B7A08B]">
              <span className="material-icons text-lg">
                location_on
              </span>
              <span className="font-manrope font-extralight text-sm">
                {location}
              </span>
            </div>
          </div>

          {/* Right - Price */}
          <div className="text-left md:text-right w-full md:w-auto mt-4 md:mt-0">
            <p className="font-manrope font-extralight text-sm text-white/60 mb-2 uppercase tracking-wider">
              Listed Price
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-space-mono font-bold text-xl text-[#B7A08B]">
                PKR
              </span>
              <span className="font-space-mono font-bold text-4xl text-[#B7A08B]">
                {price}
              </span>
            </div>
          </div>
        </div>

        {/* Key Specs */}
        <div className="flex flex-wrap items-center gap-8 md:gap-12 mt-8 pt-8 border-t border-[#B7A08B]/20">
          {/* Bedrooms */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-[#B7A08B]/10 border border-[#B7A08B]/30 rounded-lg flex items-center justify-center">
              <span className="material-icons text-2xl text-[#B7A08B]">
                bed
              </span>
            </div>
            <div className="text-center md:text-left">
              <p className="font-space-mono font-bold text-2xl text-white mb-0.5">
                {beds}
              </p>
              <p className="font-manrope font-extralight text-xs text-white/60 uppercase tracking-wider">
                Bedrooms
              </p>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-[#B7A08B]/10 border border-[#B7A08B]/30 rounded-lg flex items-center justify-center">
              <span className="material-icons text-2xl text-[#B7A08B]">
                bathtub
              </span>
            </div>
            <div className="text-center md:text-left">
              <p className="font-space-mono font-bold text-2xl text-white mb-0.5">
                {baths}
              </p>
              <p className="font-manrope font-extralight text-xs text-white/60 uppercase tracking-wider">
                Bathrooms
              </p>
            </div>
          </div>

          {/* Square Feet */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-[#B7A08B]/10 border border-[#B7A08B]/30 rounded-lg flex items-center justify-center">
              <span className="material-icons text-2xl text-[#B7A08B]">
                square_foot
              </span>
            </div>
            <div className="text-center md:text-left">
              <p className="font-space-mono font-bold text-2xl text-white mb-0.5">
                {sqft.toLocaleString()}
              </p>
              <p className="font-manrope font-extralight text-xs text-white/60 uppercase tracking-wider">
                Sq Ft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;