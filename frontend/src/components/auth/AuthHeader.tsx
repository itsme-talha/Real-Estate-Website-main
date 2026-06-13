import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader: React.FC = () => {
  return (
    <Link to="/" className="flex items-center justify-center gap-3 mb-8 group">
      <div className="bg-[#B7A08B] rounded-lg w-10 h-10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
        <span className="material-icons text-[#154D57] text-2xl">apartment</span>
      </div>
      <span className="font-fraunces text-3xl font-bold text-white drop-shadow-sm">BuildEstate</span>
    </Link>
  );
};

export default AuthHeader;