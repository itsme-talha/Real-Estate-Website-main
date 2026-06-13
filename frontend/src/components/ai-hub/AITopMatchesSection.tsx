import React from 'react';

const AITopMatchesSection: React.FC = () => {
  const propertyImages = {
    property1: "https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?w=800",
    property2: "https://images.unsplash.com/photo-1762732793012-8bdab3af00b4?w=800",
    property3: "https://images.unsplash.com/photo-1769428003672-296f923d19b2?w=800",
  };
  
  const properties = [
    {
      id: 1,
      image: propertyImages.property1,
      name: 'The Glass Pavilion',
      price: 'PKR 280,000,000',
      beds: 4,
      baths: 3,
      sqft: '3.2k',
      matchScore: 97,
      badge: 'HOT DEAL'
    },
    {
      id: 2,
      image: propertyImages.property2,
      name: 'Lakefront Villa',
      price: 'PKR 320,000,000',
      beds: 3,
      baths: 3,
      sqft: '2.8k',
      matchScore: 97,
      badge: 'NEW LISTING'
    },
    {
      id: 3,
      image: propertyImages.property3,
      name: 'Modern Skyline Apartment',
      price: 'PKR 210,000,000',
      beds: 3,
      baths: 2,
      sqft: '2.4k',
      matchScore: 97,
      badge: 'PRICE DROP'
    }
  ];

  return (
    <section className="bg-[#12434D] py-24 border-t border-[#B7A08B]/20">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-baseline gap-4">
            <h2 className="font-syne text-4xl text-white">
              Top Matches
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#B7A08B] rounded-full animate-pulse shadow-[0_0_8px_#B7A08B]" />
              <span className="font-space-mono font-bold text-2xl text-[#B7A08B]">
                97%
              </span>
              <span className="font-space-mono text-sm text-white/50">Average Match Rate</span>
            </div>
          </div>

          <button className="font-space-mono text-sm text-white border-b border-white hover:text-[#B7A08B] hover:border-[#B7A08B] transition-colors pb-1 self-start md:self-auto">
            View All → See more
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div 
              key={property.id}
              className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#B7A08B]/50 transition-all group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[382/286.5] overflow-hidden">
                <img 
                  src={property.image}
                  alt={property.name}
                  className="absolute h-[133.33%] w-full object-cover top-[-16.67%] group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#154D57]/70 to-transparent h-16" />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 text-[#154D57] font-space-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${
                  property.badge === 'HOT DEAL' ? 'bg-[#B7A08B]' : 'bg-white'
                }`}>
                  {property.badge}
                </div>

                {/* Match Score Badge */}
                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-[#12434D]/90 border border-[#B7A08B]/30 rounded px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]" />
                    <span className="font-space-mono text-xs text-white font-bold">
                      {property.matchScore}% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name and Price */}
                <h3 className="font-syne text-xl text-white mb-2">
                  {property.name}
                </h3>
                <p className="font-space-mono font-bold text-lg text-[#B7A08B] mb-4">
                  {property.price}
                </p>

                {/* Specs */}
                <div className="flex items-center divide-x divide-[#B7A08B]/20 border-t border-[#B7A08B]/20 pt-4">
                  <div className="flex-1 text-center">
                    <div className="font-syne text-base text-white mb-1">
                      {property.beds}
                    </div>
                    <div className="font-manrope font-extralight text-xs text-white/50 uppercase tracking-wide">
                      Beds
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="font-syne text-base text-white mb-1">
                      {property.baths}
                    </div>
                    <div className="font-manrope font-extralight text-xs text-white/50 uppercase tracking-wide">
                      Baths
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="font-syne text-base text-white mb-1">
                      {property.sqft}
                    </div>
                    <div className="font-manrope font-extralight text-xs text-white/50 uppercase tracking-wide">
                      Sqft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AITopMatchesSection;