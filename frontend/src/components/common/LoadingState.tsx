import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-[#B7A08B]/20 border-t-[#B7A08B] rounded-full animate-spin" />
        <p className="font-manrope text-sm text-[#B7A08B]">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;