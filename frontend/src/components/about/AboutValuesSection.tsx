import React from 'react';
import { Lightbulb, Eye, Award } from 'lucide-react';

const AboutValuesSection: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We challenge the status quo of real estate, blending traditional service with cutting-edge technology to redefine what\'s possible.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'No hidden data, no obscured histories. We believe in complete clarity, empowering you to make decisions with absolute confidence.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'From the first search to the final signature, we curate an experience of uncompromising quality and refined elegance.'
    }
  ];

  return (
    <section className="bg-[#12434D] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-space-mono text-xs text-[#B7A08B] uppercase tracking-[1.2px] mb-4">
            Our Ethos
          </div>
          <h2 className="font-syne text-4xl text-white">
            Driven by Purpose
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-8 text-center hover:shadow-xl hover:border-[#B7A08B]/50 transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 bg-[#B7A08B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-8 h-8 text-[#B7A08B]" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-syne text-xl text-white mb-4">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-manrope font-extralight text-sm leading-[22.75px] text-white/80">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValuesSection;