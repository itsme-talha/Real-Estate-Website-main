import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertTriangle } from 'lucide-react';

/**
 * BanUserModal Component
 *
 * Modal for permanently banning a user account
 * Shows strong warning about permanent nature of the action
 */
const BanUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  isLoading = false
}) => {
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmText, setConfirmText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!reason.trim()) {
      newErrors.reason = 'Ban reason is required';
    }
    if (confirmText !== 'PERMANENTLY BAN') {
      newErrors.confirmText = 'Please type "PERMANENTLY BAN" to confirm';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onConfirm({ reason: reason.trim() });
    }
  };

  const handleClose = () => {
    setReason('');
    setConfirmText('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#0F3B43]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#154D57] rounded-2xl w-full max-w-md shadow-2xl border border-[#B7A08B]/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#B7A08B]/20 bg-[#12434D] rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ban User</h3>
                <p className="text-sm text-white/50 font-medium">{user?.name}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-white/60 hover:text-white hover:bg-[#0F3B43] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Danger Warning */}
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 shadow-inner">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-400 mb-2">
                  ⚠️ This action is permanent and cannot be undone
                </p>
                <ul className="text-xs text-red-300 space-y-1.5 font-medium">
                  <li>• User will lose access to their account immediately</li>
                  <li>• All their listings will be removed from the platform</li>
                  <li>• They cannot create new accounts</li>
                </ul>
              </div>
            </div>

            {/* Reason Input */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-white mb-2">
                Reason for Ban <span className="text-red-400">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl bg-[#12434D] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 resize-none transition-all shadow-inner ${
                  errors.reason
                    ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                    : 'border-[#B7A08B]/30 focus:border-[#B7A08B] focus:ring-[#B7A08B]'
                }`}
                placeholder="Provide detailed explanation for the permanent ban..."
              />
              {errors.reason && (
                <p className="text-xs font-bold text-red-400 mt-1.5">{errors.reason}</p>
              )}
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-white mb-2">
                Type "PERMANENTLY BAN" to confirm <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl bg-[#12434D] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all shadow-inner ${
                  errors.confirmText
                    ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                    : 'border-[#B7A08B]/30 focus:border-[#B7A08B] focus:ring-[#B7A08B]'
                }`}
                placeholder="PERMANENTLY BAN"
              />
              {errors.confirmText && (
                <p className="text-xs font-bold text-red-400 mt-1.5">{errors.confirmText}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-[#B7A08B]/40 text-[#B7A08B] rounded-xl font-bold text-sm hover:bg-[#12434D] hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || confirmText !== 'PERMANENTLY BAN'}
                className="flex-1 px-4 py-3 bg-red-500/20 border border-red-500/40 text-red-100 rounded-xl font-bold text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Banning...
                  </>
                ) : (
                  'Ban Permanently'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BanUserModal;