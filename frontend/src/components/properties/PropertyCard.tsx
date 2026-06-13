import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string;
  image: string;
  name: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  badge?: string;
  tags?: string[];
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  name,
  price,
  location,
  beds,
  baths,
  sqft,
  badge,
  tags = []
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link to={`/property/${id}`} className="block">
      <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#B7A08B]/50 transition-all duration-300 group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[340/240] overflow-hidden">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#154D57]/80 to-transparent h-20" />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded text-[#154D57] font-space-mono text-xs font-bold shadow-lg ${
            badge === 'HOT' ? 'bg-[#B7A08B]' :
            badge === 'SOLD' ? 'bg-gray-400' :
            badge === 'FOR RENT' ? 'bg-[#B7A08B]/80' :
            'bg-[#B7A08B]'
          }`}>
            {badge}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-[#154D57]/80 backdrop-blur-sm border border-[#B7A08B]/30 rounded-full flex items-center justify-center hover:bg-[#B7A08B] transition-all shadow-lg group/fav"
        >
          <span className={`material-icons text-xl transition-all ${
            isFavorite 
              ? 'text-red-400 group-hover/fav:text-red-600' 
              : 'text-[#B7A08B] group-hover/fav:text-[#154D57]'
          }`}>
            {isFavorite ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-space-mono font-bold text-lg text-[#B7A08B]">
            PKR
          </span>
          <span className="font-space-mono font-bold text-2xl text-[#B7A08B]">
            {price}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-syne text-lg text-white mb-1 line-clamp-1">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-4">
          <span className="material-icons text-[#B7A08B] text-sm">
            location_on
          </span>
          <span className="font-manrope font-extralight text-sm text-white/70 line-clamp-1">
            {location}
          </span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#B7A08B]/20">
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-[#B7A08B] text-lg">
              bed
            </span>
            <span className="font-manrope font-extralight text-sm text-white/90">
              {beds} Beds
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-[#B7A08B] text-lg">
              bathtub
            </span>
            <span className="font-manrope font-extralight text-sm text-white/90">
              {baths} Baths
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-icons text-[#B7A08B] text-lg">
              square_foot
            </span>
            <span className="font-manrope font-extralight text-sm text-white/90">
              {sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#154D57] border border-[#B7A08B]/30 rounded-full font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <button className="w-full mt-2 bg-transparent border border-[#B7A08B] text-[#B7A08B] font-manrope font-bold py-2 rounded-lg hover:bg-[#B7A08B] hover:text-[#154D57] transition-all">
          View Details
        </button>
      </div>
    </div>
    </Link>
  );
};

export default PropertyCard;