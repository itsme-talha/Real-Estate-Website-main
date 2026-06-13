import React from 'react';

interface PropertyHeroImageProps {
  image?: string;
}

const PropertyHeroImage: React.FC<PropertyHeroImageProps> = ({ image }) => {
  // Use provided image or fallback to Unsplash
  const img1HeroImage = image || "https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?w=1200";
  
  return (
    <div className="bg-[#0F3B43] py-8">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative aspect-[1280/440] rounded-2xl overflow-hidden shadow-2xl border border-[#B7A08B]/20">
          <img 
            src={img1HeroImage}
            alt="Property"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#154D57]/60 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default PropertyHeroImage;