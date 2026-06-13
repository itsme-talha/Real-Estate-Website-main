import { AlertCircle } from "lucide-react";
import Proptypes from "prop-types";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#154D57]">
      <div className="text-center bg-[#12434D] p-8 rounded-2xl border border-[#B7A08B]/30 shadow-2xl max-w-md w-[90%]">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-white/60 mb-6 text-sm">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-[#B7A08B] text-[#154D57] rounded-xl font-bold text-sm hover:bg-white transition-colors duration-200 shadow-md"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
    error: Proptypes.object.isRequired,
    resetErrorBoundary: Proptypes.func.isRequired
    };
    
export default ErrorFallback;