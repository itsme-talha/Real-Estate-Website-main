import React from 'react';
import { Building2, Users, MapPin, CheckCircle } from 'lucide-react';

const AboutStatsSection: React.FC = () => {
  const stats = [
    {
      icon: Building2,
      value: '2,450+',
      label: 'Properties'
    },
    {
      icon: Users,
      value: '12k+',
      label: 'Happy Clients'
    },
    {
      icon: MapPin,
      value: '18',
      label: 'Major Cities'
    },
    {
      icon: CheckCircle,
      value: '98%',
      label: 'Match Rate'
    }
  ];

  return (
    <section className="bg-[#0F3B43] border-y border-[#B7A08B]/20 py-20 shadow-inner">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#154D57] p-4 rounded-full border border-[#B7A08B]/30 shadow-md group-hover:border-[#B7A08B] transition-colors">
                  <stat.icon className="w-8 h-8 text-[#B7A08B]" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Value */}
              <div className="font-space-mono font-bold text-4xl text-white mb-2 drop-shadow-sm">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="font-manrope font-extralight text-xs text-[#B7A08B] uppercase tracking-[1.2px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;