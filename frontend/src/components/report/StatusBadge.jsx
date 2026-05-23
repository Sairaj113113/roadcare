import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';

/**
 * StatusBadge — colored pill badge showing a report's current status.
 *
 * Props:
 *   status {string} — 'PENDING' | 'IN_PROGRESS' | 'RESOLVED'
 *   size   {string} — 'sm' | 'md' (default: 'md')
 */
const StatusBadge = ({ status, size = 'md' }) => {
  const colorClass = STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-600';
  const label      = STATUS_LABELS[status] ?? status;
  const sizeClass  = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`status-badge font-semibold ${colorClass} ${sizeClass}`}>
      {status === 'PENDING'     && '⏳ '}
      {status === 'IN_PROGRESS' && '🔧 '}
      {status === 'RESOLVED'    && '✅ '}
      {label}
    </span>
  );
};

export default StatusBadge;