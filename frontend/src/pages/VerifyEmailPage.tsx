import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';
import AuthHeader from '../components/auth/AuthHeader';
import { userAPI } from '../services/api';

type VerificationStatus = 'loading' | 'success' | 'error';

const VerifyEmailPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        const { data } = await userAPI.verifyEmail(token);
        if (data.success) {
          setStatus('success');
          setMessage(data.message || 'Your email has been verified successfully!');
          // Auto-redirect to signin after 4 seconds
          setTimeout(() => navigate('/signin'), 4000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      } catch (error: any) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage(
          error.response?.data?.message ||
          'Verification failed. The link may have expired or is invalid.'
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#154D57] flex items-center justify-center py-12 px-4">
      <div className="max-w-[480px] w-full">
        {/* Logo */}
        <AuthHeader />

        {/* Card */}
        <div className="bg-[#12434D] border border-[#B7A08B]/30 rounded-2xl p-8 shadow-2xl">
          {status === 'loading' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#B7A08B]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Loader className="w-8 h-8 text-[#B7A08B] animate-spin" />
              </div>
              <h1 className="font-syne font-bold text-2xl text-white mb-3">
                Verifying Your Email
              </h1>
              <p className="font-manrope font-extralight text-sm text-white/80">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="font-syne font-bold text-2xl text-white mb-3">
                Email Verified!
              </h1>
              <p className="font-manrope font-extralight text-sm text-white/80 mb-6">
                {message}
              </p>
              <p className="font-manrope text-xs text-white/50 mb-6">
                Redirecting you to sign in...
              </p>
              <Link
                to="/signin"
                className="w-full inline-block bg-[#B7A08B] text-[#154D57] font-manrope font-bold py-3 rounded-xl hover:bg-white transition-all text-center shadow-lg hover:shadow-xl"
              >
                Sign In Now
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-900/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="font-syne font-bold text-2xl text-white mb-3">
                Verification Failed
              </h1>
              <p className="font-manrope font-extralight text-sm text-white/80 mb-6">
                {message}
              </p>
              <div className="space-y-4">
                <Link
                  to="/signin"
                  className="w-full inline-block bg-[#B7A08B] text-[#154D57] font-manrope font-bold py-3 rounded-xl hover:bg-white transition-all text-center shadow-lg hover:shadow-xl"
                >
                  Try Signing In
                </Link>
                <p className="font-manrope text-xs text-[#B7A08B]/80 px-4 leading-relaxed">
                  If your link expired, signing in will send a new verification email.
                </p>
              </div>
            </div>
          )}

          {/* Back to Home */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 mt-6 font-manrope font-medium text-sm text-white/60 hover:text-[#B7A08B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;