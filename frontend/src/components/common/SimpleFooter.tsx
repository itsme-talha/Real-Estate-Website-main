import React from 'react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="bg-[#0F3B43] border-t border-[#B7A08B]/20 py-8 shadow-inner">
      <div className="max-w-[1280px] mx-auto px-8 text-center flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 bg-[#B7A08B] rounded-full shadow-[0_0_8px_#B7A08B]" />
          <span className="font-manrope font-bold text-sm text-[#B7A08B] uppercase tracking-widest drop-shadow-sm">
            BuildEstate
          </span>
        </div>

        {/* Copyright */}
        <p className="font-manrope font-extralight text-xs text-white/50">
          © 2026 BuildEstate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default SimpleFooter;