import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight, Loader2, Home, Building2, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import apiClient from "../services/apiClient";
import { cn } from "../lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post('/api/users/admin', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", "true");
        toast.success("Welcome back, Admin!");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Building2, label: "Properties", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "2,000+" },
    { icon: TrendingUp, label: "Deals Closed", value: "1,200+" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Dark Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-[#0F3B43] flex-col justify-between p-12 relative overflow-hidden border-r border-[#B7A08B]/20"
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #B7A08B 0%, transparent 50%), radial-gradient(circle at 75% 75%, #B7A08B 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#B7A08B]/5 rounded-full blur-[80px]" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#B7A08B]/10 rounded-full blur-[60px]" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#B7A08B] rounded-xl flex items-center justify-center shadow-lg">
              <Home className="h-5 w-5 text-[#154D57]" />
            </div>
            <div>
              <div className="text-xl font-bold text-white drop-shadow-sm">BuildEstate</div>
              <div className="text-xs text-[#B7A08B] font-bold uppercase tracking-widest">Admin Panel</div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4 drop-shadow-md">
            Manage Your
            <br />
            <span className="text-[#B7A08B]">Real Estate</span>
            <br />
            Portfolio
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xs font-medium">
            A powerful admin dashboard to manage properties, appointments, and clients — all in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-[#12434D]/80 border border-[#B7A08B]/20 rounded-2xl p-4 shadow-md backdrop-blur-sm">
              <Icon className="w-5 h-5 text-[#B7A08B] mb-2" />
              <div className="text-xl font-bold text-white">{value}</div>
              <div className="text-xs text-white/50">{label}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-white/40 font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>Secured with 256-bit encryption • BuildEstate © 2026</span>
        </div>
      </motion.div>

      {/* Right Panel — Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="flex-1 flex items-center justify-center bg-[#154D57] px-6 py-12"
      >
        <div className="w-full max-w-md bg-[#12434D] p-8 sm:p-10 border border-[#B7A08B]/20 shadow-2xl rounded-3xl">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-[#B7A08B] rounded-xl flex items-center justify-center shadow-md">
              <Home className="h-5 w-5 text-[#154D57]" />
            </div>
            <div className="text-lg font-bold text-white">BuildEstate Admin</div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">Welcome back</h2>
            <p className="text-[#B7A08B] font-medium">Sign in to your admin account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={cn(
                    "h-4.5 w-4.5 transition-colors duration-200",
                    focusedField === "email" ? "text-[#B7A08B]" : "text-white/40"
                  )} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin@buildestate.com"
                  className={cn(
                    "w-full pl-11 pr-4 py-3.5 bg-[#0F3B43] border rounded-xl text-white placeholder-white/30 text-sm transition-all duration-200 outline-none shadow-inner",
                    focusedField === "email"
                      ? "border-[#B7A08B] ring-1 ring-[#B7A08B]"
                      : "border-[#B7A08B]/30 hover:border-[#B7A08B]/60"
                  )}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={cn(
                    "h-4.5 w-4.5 transition-colors duration-200",
                    focusedField === "password" ? "text-[#B7A08B]" : "text-white/40"
                  )} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className={cn(
                    "w-full pl-11 pr-12 py-3.5 bg-[#0F3B43] border rounded-xl text-white placeholder-white/30 text-sm transition-all duration-200 outline-none shadow-inner",
                    focusedField === "password"
                      ? "border-[#B7A08B] ring-1 ring-[#B7A08B]"
                      : "border-[#B7A08B]/30 hover:border-[#B7A08B]/60"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#B7A08B]/60 hover:text-[#B7A08B] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#B7A08B] hover:bg-white text-[#154D57] py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to Dashboard
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Security note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40 font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure admin access only</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;