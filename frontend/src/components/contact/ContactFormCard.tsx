import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { contactAPI } from '../../services/api';

const ContactFormCard: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      await contactAPI.submit({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phoneNumber,
        message: formData.message,
      });

      setStatus('success');
      setStatusMessage('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(
        err.response?.data?.message || 'Something went wrong. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-2xl p-8 shadow-xl">
      {/* Card Header */}
      <div className="mb-8">
        <h2 className="font-syne font-bold text-2xl text-white mb-2">
          Send Us a Message
        </h2>
        <p className="font-manrope font-extralight text-sm text-white/70">
          Fill in the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name & Last Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-manrope font-bold text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Ali"
              className="w-full bg-[#12434D] border border-[#B7A08B]/20 rounded-xl px-4 py-3 font-manrope font-medium text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block font-manrope font-bold text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Khan"
              className="w-full bg-[#12434D] border border-[#B7A08B]/20 rounded-xl px-4 py-3 font-manrope font-medium text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all shadow-inner"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block font-manrope font-bold text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ali.khan@example.pk"
            className="w-full bg-[#12434D] border border-[#B7A08B]/20 rounded-xl px-4 py-3 font-manrope font-medium text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all shadow-inner"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-manrope font-bold text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="+92 300 1234567"
            className="w-full bg-[#12434D] border border-[#B7A08B]/20 rounded-xl px-4 py-3 font-manrope font-medium text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all shadow-inner"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-manrope font-bold text-xs text-[#B7A08B] uppercase tracking-wider mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your inquiry..."
            rows={5}
            className="w-full bg-[#12434D] border border-[#B7A08B]/20 rounded-xl px-4 py-3 font-manrope font-medium text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all resize-none shadow-inner"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#B7A08B] hover:bg-white text-[#154D57] disabled:opacity-60 disabled:cursor-not-allowed font-manrope font-bold text-base py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </button>

        {/* Status Message */}
        {status === 'success' && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="font-manrope text-sm text-emerald-400">{statusMessage}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="font-manrope text-sm text-red-400">{statusMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactFormCard;