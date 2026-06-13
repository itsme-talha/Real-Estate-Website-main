import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    // TODO: Submit to backend
    setEmail('');
  };

  return (
    <footer className="bg-[#0F3B43] text-white border-t border-[#B7A08B]/20">
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="bg-[#B7A08B] rounded-lg w-10 h-10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="material-icons text-[#154D57] text-2xl">apartment</span>
              </div>
              <span className="font-fraunces text-2xl font-bold text-white drop-shadow-sm">BuildEstate</span>
            </Link>
            <p className="font-manrope font-extralight text-white/70 text-sm leading-relaxed mb-6">
              AI-powered luxury real estate platform connecting you with your dream home through intelligent matching and personalized recommendations in Pakistan.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#12434D] hover:bg-[#B7A08B] border border-[#B7A08B]/30 rounded-lg flex items-center justify-center transition-all group shadow-sm"
              >
                <Facebook className="w-5 h-5 text-[#B7A08B] group-hover:text-[#154D57] transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#12434D] hover:bg-[#B7A08B] border border-[#B7A08B]/30 rounded-lg flex items-center justify-center transition-all group shadow-sm"
              >
                <Twitter className="w-5 h-5 text-[#B7A08B] group-hover:text-[#154D57] transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#12434D] hover:bg-[#B7A08B] border border-[#B7A08B]/30 rounded-lg flex items-center justify-center transition-all group shadow-sm"
              >
                <Instagram className="w-5 h-5 text-[#B7A08B] group-hover:text-[#154D57] transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#12434D] hover:bg-[#B7A08B] border border-[#B7A08B]/30 rounded-lg flex items-center justify-center transition-all group shadow-sm"
              >
                <Linkedin className="w-5 h-5 text-[#B7A08B] group-hover:text-[#154D57] transition-colors" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#12434D] hover:bg-[#B7A08B] border border-[#B7A08B]/30 rounded-lg flex items-center justify-center transition-all group shadow-sm"
              >
                <Youtube className="w-5 h-5 text-[#B7A08B] group-hover:text-[#154D57] transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/properties" className="font-manrope font-extralight text-[#B7A08B] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/ai-hub" className="font-manrope font-extralight text-[#B7A08B] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  AI Property Hub
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-manrope font-extralight text-[#B7A08B] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-manrope font-extralight text-[#B7A08B] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="font-manrope font-extralight text-[#B7A08B] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="font-manrope font-extralight text-[#B7A08B] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 font-manrope font-extralight text-white/70 text-sm hover:text-[#B7A08B] transition-colors group">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#B7A08B]" />
                  <span className="leading-relaxed">
                    BuildEstate Headquarters,<br />
                    DHA Phase 6,<br />
                    Lahore, Pakistan
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+923001234567" className="flex items-center gap-3 font-manrope font-extralight text-white/70 text-sm hover:text-[#B7A08B] transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 text-[#B7A08B]" />
                  <span>+92 300 1234567</span>
                </a>
              </li>
              <li>
                <a href="mailto:muhammad.talha@buildestate.com" className="flex items-center gap-3 font-manrope font-extralight text-white/70 text-sm hover:text-[#B7A08B] transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 text-[#B7A08B]" />
                  <span>muhammad.talha@buildestate.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Stay Updated</h4>
            <p className="font-manrope font-extralight text-white/70 text-sm mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest listings, market insights, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-[#12434D] border border-[#B7A08B]/30 rounded-lg px-4 py-3 font-manrope font-extralight text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7A08B] transition-colors shadow-inner"
                required
              />
              <button 
                type="submit"
                className="w-full bg-[#B7A08B] hover:bg-white text-[#154D57] font-manrope font-bold text-sm px-4 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
            <p className="font-manrope font-extralight text-white/50 text-xs mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#B7A08B]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-manrope font-extralight text-white/60 text-sm text-center md:text-left">
              © 2026 BuildEstate. All rights reserved. Powered by AI.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="font-manrope font-extralight text-[#B7A08B]/80 text-sm hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-manrope font-extralight text-[#B7A08B]/80 text-sm hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="font-manrope font-extralight text-[#B7A08B]/80 text-sm hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="font-manrope font-extralight text-[#B7A08B]/80 text-sm hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;