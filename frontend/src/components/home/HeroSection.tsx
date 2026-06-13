import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import happyHomeowner1 from '../../images/Happy Homeowners_1.jpg';
import happyHomeowner2 from '../../images/Happy Homeowners_2.jpg';
import happyHomeowner3 from '../../images/Team section.jpg';
import rightFeatureCard from '../../images/Right side feature card.jpg';

const HeroSection: React.FC = () => {
  const propertyImages = [
    happyHomeowner1,
    happyHomeowner2,
    happyHomeowner3,
    rightFeatureCard, 
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section className="relative bg-[#154D57] pt-20 pb-32 overflow-hidden">
        {/* Background decorative blurs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" as const
          }}
          className="absolute right-0 top-14 w-64 h-64 bg-[#B7A08B] rounded-full blur-[40px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -30, 0], 
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 10,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut" as const
          }}
          className="absolute left-[738px] bottom-22 w-64 h-64 bg-[#B7A08B] rounded-full blur-[40px]" 
        />

        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 bg-[#B7A08B]/10 border border-[#B7A08B]/30 rounded-full px-4 py-2 mb-10 shadow-sm">
                <div className="w-2 h-2 bg-[#B7A08B] rounded-full shadow-[0_0_8px_#B7A08B]" />
                <span className="font-manrope font-bold text-xs text-[#B7A08B] uppercase tracking-wider">
                  AI-Powered Real Estate
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 variants={itemVariants} className="font-fraunces text-[56px] lg:text-[70px] leading-[1.1] text-white mb-8">
                Discover Your<br />
                <span className="italic text-[#B7A08B]">Dream Home</span> with<br />
                AI Intelligence
              </motion.h1>

              {/* Description */}
              <motion.p variants={itemVariants} className="font-manrope font-light text-xl leading-7 text-white/80 mb-12 max-w-[676px]">
                Experience the future of real estate. Our proprietary AI curates the market's
                finest listings tailored specifically to your lifestyle, removing the noise from
                your property search.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
                <Link to="/properties" className="bg-[#B7A08B] text-[#154D57] font-manrope font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-white transition-all inline-flex items-center">
                  Explore Properties
                  <span className="font-material-icons text-sm ml-2">arrow_forward</span>
                </Link>
                <Link to="/ai-hub" className="border-2 border-[#B7A08B]/50 text-[#B7A08B] font-manrope font-bold text-lg px-8 py-4 rounded-xl hover:border-[#B7A08B] hover:text-white hover:bg-[#B7A08B]/10 transition-all inline-flex items-center">
                  <span className="font-material-icons text-2xl text-[#B7A08B] mr-2">smart_toy</span>
                  {import.meta.env.PROD ? 'AI Property Hub' : 'Try AI Search'}
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img src={propertyImages[0]} alt="" className="w-10 h-10 rounded-full border-2 border-[#154D57] object-cover shadow-sm" />
                  <img src={propertyImages[1]} alt="" className="w-10 h-10 rounded-full border-2 border-[#154D57] object-cover shadow-sm" />
                  <img src={propertyImages[2]} alt="" className="w-10 h-10 rounded-full border-2 border-[#154D57] object-cover shadow-sm" />
                  <div className="w-10 h-10 bg-[#B7A08B] rounded-full border-2 border-[#154D57] flex items-center justify-center shadow-sm">
                    <span className="font-manrope font-bold text-xs text-[#154D57]">+2k</span>
                  </div>
                </div>
                <span className="font-manrope text-sm text-white/70">
                  Join 2,000+ happy homeowners
                </span>
              </motion.div>
            </motion.div>

            {/* Right - Featured Property Card */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#B7A08B]/20">
                <div className="relative h-[625px]">
                  <img
                    src={propertyImages[3]}
                    alt="Villa Serenity in DHA Lahore"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#154D57]/90 via-transparent to-transparent" />
                  
                  {/* Property Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-[#12434D]/80 border border-[#B7A08B]/30 rounded-xl p-4 shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-fraunces font-bold text-lg text-white mb-1">Villa Serenity</h3>
                        <p className="font-space-mono text-xs text-[#B7A08B] uppercase tracking-wide">DHA Phase 6, Lahore</p>
                      </div>
                      <div className="bg-[#B7A08B]/20 px-2 py-1 rounded border border-[#B7A08B]/30">
                        <span className="font-manrope font-bold text-xs text-[#B7A08B]">AI MATCH: 98%</span>
                      </div>
                    </div>
                    <div className="border-t border-[#B7A08B]/30 pt-3 flex items-center justify-between">
                      <span className="font-space-mono text-sm font-bold text-white">PKR 120,000,000</span>
                      <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-1">
                          <span className="font-material-icons text-xs text-[#B7A08B]">bed</span>
                          <span className="font-manrope text-sm">4</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-material-icons text-xs text-[#B7A08B]">shower</span>
                          <span className="font-manrope text-sm">3.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;