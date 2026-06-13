import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface SignUpFormProps {
  onSubmit: (data: any) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg pl-12 pr-4 py-3.5 font-manrope font-light text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg pl-12 pr-4 py-3.5 font-manrope font-light text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-colors"
              required
            />
          </div>
        </div>
      </div>

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
            placeholder="Create a strong password"
            className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg pl-12 pr-12 py-3.5 font-manrope font-light text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-colors"
            required
            minLength={8}
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

      {/* Confirm Password Input */}
      <div>
        <label className="block font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B7A08B]/70" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Re-enter your password"
            className="w-full bg-[#0F3B43] border border-[#B7A08B]/30 rounded-lg pl-12 pr-12 py-3.5 font-manrope font-light text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-colors"
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
      </div>

      {/* Terms & Conditions */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-4 h-4 mt-0.5 rounded border-[#B7A08B]/50 bg-[#0F3B43] text-[#B7A08B] focus:ring-[#B7A08B] focus:ring-offset-[#12434D]"
            required
          />
          <span className="font-manrope font-light text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors">
            I agree to the{' '}
            <Link to="/terms" className="text-[#B7A08B] hover:text-white font-medium underline underline-offset-2">
              Terms & Conditions
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-[#B7A08B] hover:text-white font-medium underline underline-offset-2">
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#B7A08B] hover:bg-white text-[#154D57] font-manrope font-bold text-base py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignUpForm;