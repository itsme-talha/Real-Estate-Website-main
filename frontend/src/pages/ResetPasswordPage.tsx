import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import AuthHeader from '../components/auth/AuthHeader';
import { userAPI } from '../services/api';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/\d/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const isFormValid = password && confirmPassword && passwordsMatch && passwordStrength >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error('Please ensure passwords match and meet strength requirements.');
      return;
    }

    if (!token) {
      toast.error('Invalid reset link. Please request a new one.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await userAPI.resetPassword(token, password);
      if (data.success) {
        setIsSuccess(true);
        toast.success('Password reset successful!');
        setTimeout(() => navigate('/signin'), 3000);
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password. The link may have expired.');
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
                Password Reset!
              </h1>
              <p className="font-manrope font-extralight text-sm text-white/80 mb-6">
                Your password has been reset successfully. Redirecting you to sign in...
              </p>
              <Link
                to="/signin"
                className="w-full inline-block bg-[#B7A08B] text-[#154D57] font-manrope font-bold py-3 rounded-xl hover:bg-white transition-all text-center shadow-lg hover:shadow-xl"
              >
                Sign In Now
              </Link>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-[#B7A08B]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Lock className="w-7 h-7 text-[#B7A08B]" />
                </div>
                <h1 className="font-syne font-bold text-3xl text-white mb-2">
                  Reset Password
                </h1>
                <p className="font-manrope font-extralight text-sm text-white/80">
                  Create a new secure password for your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div>
                  <label className="block font-manrope font-medium text-sm text-[#B7A08B] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl pl-12 pr-12 py-3.5 font-manrope text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B7A08B]/70 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength ? getStrengthColor() : 'bg-[#B7A08B]/30'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="font-manrope text-xs text-white/60">
                        Password strength: <span className="font-medium text-white/90">{getStrengthLabel()}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-manrope font-medium text-sm text-[#B7A08B] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl pl-12 pr-12 py-3.5 font-manrope text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B7A08B]/70 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Match Indicator */}
                  {confirmPassword && (
                    <div className="flex items-center gap-1.5 mt-2">
                      {passwordsMatch ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="font-manrope text-xs text-green-300">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span className="font-manrope text-xs text-red-300">Passwords don't match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Requirements */}
                <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-4 shadow-inner">
                  <p className="font-manrope font-medium text-xs text-white/80 mb-2">Password Requirements:</p>
                  <ul className="space-y-1.5">
                    {[
                      { text: 'At least 8 characters', met: password.length >= 8 },
                      { text: 'One uppercase letter', met: /[A-Z]/.test(password) },
                      { text: 'One lowercase letter', met: /[a-z]/.test(password) },
                      { text: 'One number', met: /\d/.test(password) },
                      { text: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
                    ].map((req, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 ${req.met ? 'text-green-400' : 'text-[#B7A08B]/30'}`} />
                        <span className={`font-manrope text-xs ${req.met ? 'text-green-300' : 'text-white/40'}`}>
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full bg-[#B7A08B] hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-[#154D57] font-manrope font-bold text-base py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
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

export default ResetPasswordPage;