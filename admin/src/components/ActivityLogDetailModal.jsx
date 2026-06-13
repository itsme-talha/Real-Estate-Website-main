import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Calendar, User, Target, Info } from 'lucide-react';
import { useState } from 'react';

/**
 * ActivityLogDetailModal Component
 *
 * Shows comprehensive details about a specific admin activity log entry
 * Includes metadata display and copy-to-clipboard functionality
 */
const ActivityLogDetailModal = ({
  isOpen,
  onClose,
  log
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMetadata = async () => {
    if (log?.metadata) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(log.metadata, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy metadata:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getActionColor = (action) => {
    if (action.includes('ban') || action.includes('delete')) return 'text-red-400 bg-red-500/10 border border-red-500/30';
    if (action.includes('suspend') || action.includes('reject')) return 'text-amber-400 bg-amber-500/10 border border-amber-500/30';
    if (action.includes('approve') || action.includes('unban')) return 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30';
    return 'text-sky-400 bg-sky-500/10 border border-sky-500/30';
  };

  const DetailRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-3 border-b border-[#B7A08B]/10 last:border-0">
      {Icon && (
        <div className="w-8 h-8 bg-[#0F3B43] border border-[#B7A08B]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-[#B7A08B]" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <dt className="text-xs font-bold text-[#B7A08B] uppercase tracking-wider mb-1">
          {label}
        </dt>
        <dd className="text-sm text-white break-words">
          {value || 'N/A'}
        </dd>
      </div>
    </div>
  );

  if (!isOpen || !log) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#0F3B43]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#154D57] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-[#B7A08B]/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#B7A08B]/20 bg-[#12434D]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-[#B7A08B]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Activity Details</h3>
                <p className="text-sm text-white/50">Complete log information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#0F3B43] text-white/60 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            {/* Action Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wider ${getActionColor(log.action)}`}>
                {log.action.replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>

            {/* Basic Details */}
            <div className="space-y-0 mb-6 bg-[#12434D] p-5 rounded-2xl border border-[#B7A08B]/20">
              <DetailRow
                label="Timestamp"
                value={formatDate(log.createdAt)}
                icon={Calendar}
              />
              <DetailRow
                label="Admin"
                value={log.adminEmail}
                icon={User}
              />
              <DetailRow
                label="Target Type"
                value={log.targetType}
                icon={Target}
              />
              <DetailRow
                label="Target Name"
                value={log.targetName}
              />
              <DetailRow
                label="IP Address"
                value={log.ipAddress}
              />
              <DetailRow
                label="User Agent"
                value={log.userAgent}
              />
            </div>

            {/* Metadata Section */}
            {log.metadata && Object.keys(log.metadata).length > 0 && (
              <div className="bg-[#12434D] border border-[#B7A08B]/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">Additional Details</h4>
                  <button
                    onClick={handleCopyMetadata}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border border-[#B7A08B]/30 text-[#B7A08B] rounded-lg hover:bg-[#B7A08B] hover:text-[#154D57] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#154D57]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy JSON
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  {Object.entries(log.metadata).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-xs font-bold text-[#B7A08B] uppercase tracking-wider mb-1">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </dt>
                      <dd className="text-sm text-white">
                        {Array.isArray(value) ? (
                          <div className="space-y-1.5">
                            {value.slice(0, 10).map((item, index) => (
                              <div key={index} className="text-xs font-mono bg-[#0F3B43] border border-[#B7A08B]/10 px-2.5 py-1.5 rounded-lg text-white/80">
                                {String(item)}
                              </div>
                            ))}
                            {value.length > 10 && (
                              <p className="text-xs text-white/40 italic mt-1">
                                ... and {value.length - 10} more items
                              </p>
                            )}
                          </div>
                        ) : typeof value === 'object' ? (
                          <pre className="text-xs font-mono bg-[#0F3B43] border border-[#B7A08B]/10 p-3 rounded-lg overflow-x-auto text-white/80">
                            {JSON.stringify(value, null, 2)}
                          </pre>
                        ) : (
                          <span className="bg-[#0F3B43] border border-[#B7A08B]/10 px-2.5 py-1.5 rounded-lg text-white/80 inline-block font-mono text-xs">
                             {String(value)}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#B7A08B]/20 bg-[#12434D]">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-[#B7A08B] text-[#154D57] rounded-xl font-bold text-sm hover:bg-white transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ActivityLogDetailModal;