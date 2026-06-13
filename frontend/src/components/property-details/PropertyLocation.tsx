import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface PropertyLocationProps {
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  location?: string;
  propertyName?: string;
  googleMapLink?: string;
}

/**
 * Extract an embeddable Google Maps URL from various link formats.
 */
function getEmbedUrl(link: string): string | null {
  if (!link || !link.trim()) return null;
  const trimmed = link.trim();

  // Already an embed URL
  if (trimmed.includes('/maps/embed')) return trimmed;

  // Extract place or coordinates from a regular Google Maps URL
  const placeMatch = trimmed.match(/\/maps\/place\/([^/@]+)/);
  if (placeMatch) {
    const query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2s${encodeURIComponent(query)}!5e0!3m2!1sen!2spk!4v1`;
  }

  // For @lat,lng format
  const coordMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
  }

  // For q= parameter
  const qMatch = trimmed.match(/[?&]q=([^&]+)/);
  if (qMatch) {
    return `https://maps.google.com/maps?q=${qMatch[1]}&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed`;
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ address, city, state, zipcode, location, propertyName, googleMapLink }) => {
  const displayTitle = city || location?.split(',').pop()?.trim() || 'Location';
  const displayAddress = address
    ? `${address}, ${city}, ${state} ${zipcode}`
    : location || '';

  const embedUrl = getEmbedUrl(googleMapLink || '');
  const hasMap = !!embedUrl;
  
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#B7A08B] rounded-full shadow-[0_0_8px_#B7A08B]" />
        <h2 className="font-syne text-2xl text-white">
          Location
        </h2>
      </div>

      {/* Address Card */}
      <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-6 mb-6 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#B7A08B]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#B7A08B]" />
          </div>
          <div className="flex-1">
            <h3 className="font-manrope font-medium text-base text-white mb-1">
              {displayTitle}
            </h3>
            <p className="font-manrope font-extralight text-sm text-white/70 leading-relaxed">
              {displayAddress}
            </p>
          </div>
          {googleMapLink && (
            <a
              href={googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#B7A08B] hover:text-white font-manrope text-sm font-medium shrink-0 transition-colors"
            >
              Open in Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Map / Placeholder */}
      <div className="relative aspect-[690/280] rounded-xl overflow-hidden border border-[#B7A08B]/20 bg-[#154D57]">
        {hasMap ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map — ${propertyName || displayTitle}`}
            className="absolute inset-0 w-full h-full opacity-90 mix-blend-overlay"
          />
        ) : (
          /* Placeholder when no map link */
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F3B43] to-[#12434D] flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 bg-[#B7A08B]/10 rounded-full flex items-center justify-center shadow-sm">
              <MapPin className="w-8 h-8 text-[#B7A08B]" />
            </div>
            <p className="font-manrope text-sm text-white/80">
              Map not available for this property
            </p>
            <p className="font-manrope text-xs text-white/50">
              Contact us for directions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyLocation;