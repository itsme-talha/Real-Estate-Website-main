import React from 'react';

const ContactInfoCards: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Visit Our Office Card */}
      <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-6 hover:border-[#B7A08B]/40 transition-colors shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#B7A08B]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-[#B7A08B]">
              location_on
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-bold text-lg text-white mb-2">
              Visit Our Office
            </h3>
            <p className="font-manrope font-extralight text-sm text-white/70 leading-relaxed mb-3">
              Office 502, Arfa Software Technology Park,<br />
              Ferozepur Road,<br />
              Lahore, Punjab
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-manrope font-bold text-sm text-[#B7A08B] hover:text-white transition-colors group"
            >
              <span>Get Directions</span>
              <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Call or Email Us Card */}
      <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-6 hover:border-[#B7A08B]/40 transition-colors shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#B7A08B]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-[#B7A08B]">
              phone
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-bold text-lg text-white mb-3">
              Call or Email Us
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+923001234567" 
                className="flex items-center gap-2 font-manrope font-medium text-sm text-white/70 hover:text-[#B7A08B] transition-colors"
              >
                <span className="material-icons text-base text-[#B7A08B]">
                  call
                </span>
                <span>+92 300 1234567</span>
              </a>
              <a 
                href="mailto:muhammad.talha@buildestate.com" 
                className="flex items-center gap-2 font-manrope font-medium text-sm text-white/70 hover:text-[#B7A08B] transition-colors"
              >
                <span className="material-icons text-base text-[#B7A08B]">
                  email
                </span>
                <span>muhammad.talha@buildestate.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Card */}
      <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-6 hover:border-[#B7A08B]/40 transition-colors shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#B7A08B]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-[#B7A08B]">
              schedule
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-bold text-lg text-white mb-3">
              Business Hours
            </h3>
            <div className="space-y-2 font-manrope font-medium text-sm text-white/70">
              <div className="flex justify-between items-center">
                <span>Mon - Fri:</span>
                <span className="text-white">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Saturday:</span>
                <span className="text-white">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center text-[#B7A08B]">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCards;