import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import AuthHeader from '../components/auth/AuthHeader';
import { userAPI } from '../services/api';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const { data } = await userAPI.forgotPassword(email);
      if (data.success) {
        setIsSuccess(true);
        toast.success('Reset link sent to your email!');
      } else {
        toast.error(data.message || 'Failed to send reset link');
      }
    } catch (error: any) {
      console.error('Error sending reset email:', error);
      toast.error(error.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#154D57] flex items-center justify-center py-12 px-4">
      <div className="max-w-[480px] w-full">
        {/* Logo */}
        <AuthHeader />

        {/* Card */}
        <div className="bg-[#12434D] border border-[#B7A08B]/30 rounded-2xl p-8 shadow-2xl">
          {isSuccess ? (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="font-syne font-bold text-2xl text-white mb-3">
                Check Your Email
              </h1>
              <p className="font-manrope font-extralight text-sm text-white/80 mb-6 leading-relaxed">
                We've sent a password reset link to{' '}
                <span className="font-semibold text-[#B7A08B]">{email}</span>.
                <br />
                Please check your inbox and follow the instructions.
              </p>
              <p className="font-manrope font-extralight text-xs text-white/50 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                  }}
                  className="w-full bg-transparent border border-[#B7A08B] text-[#B7A08B] font-manrope font-bold py-3 rounded-xl hover:bg-[#B7A08B] hover:text-[#154D57] transition-all"
                >
                  Try Another Email
                </button>
                <Link
                  to="/signin"
                  className="w-full bg-[#B7A08B] text-[#154D57] font-manrope font-bold py-3 rounded-xl hover:bg-white transition-all text-center"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-[#B7A08B]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-7 h-7 text-[#B7A08B]" />
                </div>
                <h1 className="font-syne font-bold text-3xl text-white mb-2">
                  Forgot Password?
                </h1>
                <p className="font-manrope font-extralight text-sm text-white/80">
                  No worries! Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block font-manrope font-medium text-sm text-[#B7A08B] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl pl-12 pr-4 py-3.5 font-manrope text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B7A08B] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-[#154D57] font-manrope font-bold text-base py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              {/* Back to Sign In */}
              <Link
                to="/signin"
                className="flex items-center justify-center gap-2 mt-6 font-manrope font-medium text-sm text-white/60 hover:text-[#B7A08B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;