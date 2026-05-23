import NotificationCard from './NotificationCard';
import Loader from '../common/Loader';

/**
 * NotificationList — renders a vertical list of NotificationCard components.
 *
 * Props:
 *   notifications {array}    — array of NotificationDTO
 *   loading       {boolean}
 *   onMarkRead    {function} — (id) => void
 *   emptyText     {string}
 */
const NotificationList = ({
  notifications = [],
  loading = false,
  onMarkRead,
  emptyText = 'No notifications yet.',
}) => {
  if (loading) return <Loader message="Loading notifications…" />;

  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl mb-4">🔔</span>
        <p className="text-gray-400 text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
};

export default NotificationList;