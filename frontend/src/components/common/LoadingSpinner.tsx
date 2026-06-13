import React from 'react';

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#B7A08B]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-[#B7A08B] border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="font-manrope text-sm text-white/70">{message}</span>
    </div>
  );
};

export default LoadingSpinner;