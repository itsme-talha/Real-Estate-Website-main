import React, { useState } from 'react';

interface PropertiesHeaderProps {
  totalProperties?: number;
  onSortChange?: (sort: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({ 
  totalProperties = 107,
  onSortChange,
  onViewChange 
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  const handleViewChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    onViewChange?.(mode);
  };

  return (
    <div className="border-b border-[#B7A08B]/20 bg-[#154D57] sticky top-0 z-10 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left - Title and Count */}
          <div>
            <h1 className="font-syne text-3xl text-white mb-1 drop-shadow-sm">
              All Properties
            </h1>
            <p className="font-manrope font-extralight text-sm text-[#B7A08B]">
              Showing {totalProperties} {totalProperties === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* Right - Sort and View Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-manrope font-extralight text-sm text-white/70">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg px-4 py-2 font-manrope text-sm text-white cursor-pointer focus:outline-none focus:border-[#B7A08B] appearance-none pr-8 bg-no-repeat bg-right"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23B7A08B' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="beds">Most Beds</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-[#0F3B43] border border-[#B7A08B]/20 rounded-lg p-1">
              <button
                onClick={() => handleViewChange('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#B7A08B] text-[#154D57] shadow-sm'
                    : 'text-[#B7A08B]/60 hover:text-white'
                }`}
                title="Grid View"
              >
                <span className="material-icons text-xl">grid_view</span>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#B7A08B] text-[#154D57] shadow-sm'
                    : 'text-[#B7A08B]/60 hover:text-white'
                }`}
                title="List View"
              >
                <span className="material-icons text-xl">view_list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;