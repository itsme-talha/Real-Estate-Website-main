import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Clock, Shield, Trash2 } from 'lucide-react';

/**
 * BulkActionBar Component
 *
 * Sticky bottom action bar that appears when items are selected
 * Supports different action types based on context (users vs properties)
 */
const BulkActionBar = ({
  selectedCount,
  onClearSelection,
  onSuspendAll,
  onBanAll,
  onDeleteAll,
  onBulkApprove,
  onBulkReject,
  onBulkDelete,
  context = 'users', // 'users' or 'properties'
  isVisible = false
}) => {
  if (selectedCount === 0 && !isVisible) return null;

  const userActions = [
    {
      label: 'Suspend All',
      icon: Clock,
      onClick: onSuspendAll,
      variant: 'warning',
      show: !!onSuspendAll
    },
    {
      label: 'Ban All',
      icon: Shield,
      onClick: onBanAll,
      variant: 'danger',
      show: !!onBanAll
    },
    {
      label: 'Delete All',
      icon: Trash2,
      onClick: onDeleteAll,
      variant: 'danger',
      show: !!onDeleteAll
    }
  ];

  const propertyActions = [
    {
      label: 'Approve All',
      icon: Shield,
      onClick: onBulkApprove,
      variant: 'success',
      show: !!onBulkApprove
    },
    {
      label: 'Reject All',
      icon: X,
      onClick: onBulkReject,
      variant: 'warning',
      show: !!onBulkReject
    },
    {
      label: 'Delete All',
      icon: Trash2,
      onClick: onBulkDelete,
      variant: 'danger',
      show: !!onBulkDelete
    }
  ];

  const actions = context === 'users' ? userActions : propertyActions;
  const visibleActions = actions.filter(action => action.show);

  const getButtonStyles = (variant) => {
    const base = "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md";

    switch (variant) {
      case 'success':
        return `${base} bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30`;
      case 'warning':
        return `${base} bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30`;
      case 'danger':
        return `${base} bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30`;
      default:
        return `${base} bg-[#B7A08B] text-[#154D57] hover:bg-white`;
    }
  };

  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-auto"
        >
          <div className="bg-[#12434D] rounded-2xl border border-[#B7A08B]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-4 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Selection Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#B7A08B]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white drop-shadow-sm">
                    {selectedCount} {context === 'users' ? 'user' : 'item'}{selectedCount !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs font-medium text-white/50">
                    Choose an action to perform on all selected items
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {visibleActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className={getButtonStyles(action.variant)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{action.label}</span>
                    </button>
                  );
                })}

                {/* Clear Selection */}
                <button
                  onClick={onClearSelection}
                  className="p-2.5 border border-[#B7A08B]/40 text-[#B7A08B] rounded-xl hover:bg-[#B7A08B]/10 hover:text-white transition-colors"
                  title="Clear selection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulkActionBar;