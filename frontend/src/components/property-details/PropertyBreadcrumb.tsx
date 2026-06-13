import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface PropertyBreadcrumbProps {
  city?: string;
  propertyName?: string;
}

const PropertyBreadcrumb: React.FC<PropertyBreadcrumbProps> = ({ 
  city = "Lahore",
  propertyName = "Skyline Towers" 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#154D57] border-b border-[#B7A08B]/20">
      <div className="max-w-[1280px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#B7A08B] hover:text-white transition-colors group"
          >
            <span className="material-icons text-base group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-manrope font-extralight text-sm">
              Back to Properties
            </span>
          </button>

          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-xs tracking-wider uppercase opacity-90">
            <Link to="/" className="font-manrope font-extralight text-white/60 hover:text-[#B7A08B] transition-colors">
              Home
            </Link>
            <span className="font-manrope text-[#B7A08B]/40">
              /
            </span>
            <Link to="/properties" className="font-manrope font-extralight text-white/60 hover:text-[#B7A08B] transition-colors">
              Properties
            </Link>
            <span className="font-manrope text-[#B7A08B]/40">
              /
            </span>
            <span className="font-manrope font-extralight text-white/60">
              {city}
            </span>
            <span className="font-manrope text-[#B7A08B]/40">
              /
            </span>
            <span className="font-manrope font-extralight text-[#B7A08B]">
              {propertyName}
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PropertyBreadcrumb;