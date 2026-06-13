/**
 * UserStatusBadge Component
 *
 * Displays user status with appropriate colors and styling
 * Used in user tables, user details, and other user management interfaces
 */

const STATUS_CONFIG = {
  active: {
    label: 'Active',
    bgColor: 'bg-emerald-500/10 border border-emerald-500/30',
    textColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
  },
  suspended: {
    label: 'Suspended',
    bgColor: 'bg-amber-500/10 border border-amber-500/30',
    textColor: 'text-amber-400',
    dotColor: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
  },
  banned: {
    label: 'Banned',
    bgColor: 'bg-red-500/10 border border-red-500/30',
    textColor: 'text-red-400',
    dotColor: 'bg-red-400 shadow-[0_0_8px_#f87171]'
  }
};

const UserStatusBadge = ({ status, className = '' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${config.bgColor} ${config.textColor} ${className}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
};

export default UserStatusBadge;