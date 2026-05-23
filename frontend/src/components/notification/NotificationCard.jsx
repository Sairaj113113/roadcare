import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/dateUtils';

/** Map notification title keywords to an icon */
const resolveIcon = (title = '') => {
  if (title.toLowerCase().includes('resolved'))    return '✅';
  if (title.toLowerCase().includes('progress'))    return '🔧';
  if (title.toLowerCase().includes('submitted') || title.toLowerCase().includes('received')) return '📋';
  return '🔔';
};

/**
 * NotificationCard — single notification row.
 *
 * Props:
 *   notification {object}   — NotificationDTO from backend
 *   onMarkRead   {function} — (id) => void  called when card clicked
 */
const NotificationCard = ({ notification, onMarkRead }) => {
  const { id, reportId, title, message, isRead, createdAt } = notification;

  const handleClick = () => {
    if (!isRead && onMarkRead) onMarkRead(id);
  };

  return (
    <Link
      to={`/reports/${reportId}`}
      onClick={handleClick}
      className={`
        flex gap-4 px-5 py-4 rounded-xl border transition-all duration-150 group
        ${isRead
          ? 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
          : 'bg-blue-50 border-blue-200 hover:border-blue-300 hover:shadow-sm'}
      `}
    >
      {/* Icon bubble */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg
        ${isRead ? 'bg-gray-100' : 'bg-blue-100'}
      `}>
        {resolveIcon(title)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-semibold truncate ${isRead ? 'text-gray-700' : 'text-gray-900'}`}>
            {title}
          </p>
          {!isRead && (
            <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
          )}
        </div>
        <p className={`text-xs mt-0.5 line-clamp-2 ${isRead ? 'text-gray-400' : 'text-gray-600'}`}>
          {message}
        </p>
        <p className="text-xs text-gray-400 mt-1.5">{timeAgo(createdAt)}</p>
      </div>
    </Link>
  );
};

export default NotificationCard;