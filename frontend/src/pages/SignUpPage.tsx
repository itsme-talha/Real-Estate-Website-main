import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/auth/AuthHeader';
import SignUpForm from '../components/auth/SignUpForm';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (formData: any) => {
    try {
      setError(null);
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await register(fullName, formData.email, '', formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#154D57] flex items-center justify-center py-12 px-4">
      <div className="max-w-[520px] w-full">
        {/* Logo */}
        <AuthHeader />

        {/* Sign Up Card */}
        <div className="bg-[#12434D] border border-[#B7A08B]/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-syne font-bold text-3xl text-white mb-2">
              Create Account
            </h1>
            <p className="font-manrope font-extralight text-sm text-[#B7A08B]">
              Join BuildEstate and find your dream home
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
              <p className="font-manrope text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Form */}
          <SignUpForm onSubmit={handleSignUp} />

          {/* Sign In Link */}
          <p className="text-center font-manrope font-extralight text-sm text-white/70 mt-6">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-semibold text-[#B7A08B] hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-manrope font-medium text-sm text-white/60 hover:text-[#B7A08B] transition-colors"
          >
            <span className="material-icons text-base">arrow_back</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;