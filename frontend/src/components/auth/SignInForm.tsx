import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface SignInFormProps {
  onSubmit: (data: any) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div>
        <label className="block font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john.doe@example.com"
            className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg pl-12 pr-4 py-3.5 font-manrope font-light text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-colors"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label className="block font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg pl-12 pr-12 py-3.5 font-manrope font-light text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-colors"
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
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 rounded border-[#B7A08B]/50 bg-[#0F3B43] text-[#B7A08B] focus:ring-[#B7A08B] focus:ring-offset-[#12434D]"
          />
          <span className="font-manrope font-light text-sm text-white/70 group-hover:text-white transition-colors">
            Remember me
          </span>
        </label>
        <Link
          to="/forgot-password"
          className="font-manrope font-medium text-sm text-[#B7A08B] hover:text-white transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#B7A08B] hover:bg-white text-[#154D57] font-manrope font-bold text-base py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;