import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]); // Dark background opacity
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(8px)", "blur(16px)"]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/ai-hub', label: 'AI Property Hub' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ backgroundColor: `rgba(21, 77, 87, ${bgOpacity.get()})`, backdropFilter: backdropBlur }}
      className="sticky top-0 z-50 border-b border-[#B7A08B]/20 shadow-sm"
    >
      <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
          <div className="bg-[#B7A08B] rounded-lg w-10 h-10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="material-icons text-[#154D57] text-2xl">apartment</span>
          </div>
          <span className="font-fraunces text-2xl font-bold text-white drop-shadow-sm">BuildEstate</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-manrope transition-colors ${
                isActive(link.path)
                  ? 'text-[#B7A08B] font-semibold underline underline-offset-4 decoration-2'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link
                to="/my-listings"
                className={`font-manrope transition-colors ${
                  isActive('/my-listings')
                    ? 'text-[#B7A08B] font-semibold underline underline-offset-4 decoration-2'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                My Listings
              </Link>
              <Link
                to="/add-property"
                className="bg-[#B7A08B] text-[#154D57] font-manrope font-bold px-5 py-2.5 rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg"
              >
                + List Property
              </Link>
              <button
                onClick={handleLogout}
                className="font-manrope font-semibold text-white/60 hover:text-[#B7A08B] transition-colors px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="font-manrope font-semibold text-white/80 hover:text-white transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-[#B7A08B] text-[#154D57] font-manrope font-bold px-6 py-2.5 rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white hover:text-[#B7A08B] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-icons text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#12434D] border-b border-[#B7A08B]/20 shadow-xl py-4 px-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-manrope text-lg py-2 transition-colors ${
                isActive(link.path)
                  ? 'text-[#B7A08B] font-semibold'
                  : 'text-white/80 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#B7A08B]/20 my-2 pt-4 flex flex-col gap-4">
            {isAuthenticated && user ? (
              <>
                <span className="font-manrope text-sm text-white/60">
                  Signed in as <span className="font-semibold text-[#B7A08B]">{user.name}</span>
                </span>
                <Link
                  to="/my-listings"
                  className="font-manrope font-semibold text-white/80 hover:text-white transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  My Listings
                </Link>
                <Link
                  to="/add-property"
                  className="bg-[#B7A08B] text-[#154D57] font-manrope font-bold px-6 py-3 rounded-lg hover:bg-white transition-all shadow-md text-center"
                  onClick={closeMobileMenu}
                >
                  + List Property
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-manrope font-semibold text-red-400 hover:text-red-300 transition-colors py-2 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="font-manrope font-semibold text-white/80 hover:text-white transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#B7A08B] text-[#154D57] font-manrope font-bold px-6 py-3 rounded-lg hover:bg-white transition-all shadow-md text-center"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;