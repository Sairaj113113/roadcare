import { useEffect, useState } from 'react';

import NotificationList from '../components/notification/NotificationList';
import notificationService from '../services/notificationService';
import Loader from '../components/common/Loader';

const NotificationPage = () => {

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  // ==================== FETCH ====================

  const fetchNotifications = async () => {

    try {

      const data =
        await notificationService.getNotifications();

      setNotifications(data || []);

    } catch {

      setError('Failed to load notifications.');

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchNotifications();

  }, []);

  // ==================== MARK ONE READ ====================

  const handleMarkRead = async (id) => {

    try {

      await notificationService.markAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, isRead: true }
            : n
        )
      );

    } catch (error) {

      console.error(
        'Failed to mark notification as read',
        error
      );
    }
  };

  // ==================== MARK ALL READ ====================

  const handleMarkAllRead = async () => {

    try {

      await notificationService.markAllAsRead();

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        }))
      );

    } catch (error) {

      console.error(
        'Failed to mark all notifications read',
        error
      );
    }
  };

  // ==================== LOADING ====================

  if (loading) {
    return (
      <Loader message="Loading notifications..." />
    );
  }

  const unreadCount =
    notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            🔔 Notifications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Stay updated with pothole report activities.
          </p>

        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm font-medium
                       text-primary-600
                       hover:text-primary-700
                       transition-colors"
          >
            Mark all as read
          </button>
        )}

      </div>

      {/* Error */}
      {error && (
        <div
          className="bg-red-50 border border-red-200
                     text-red-700 px-4 py-3
                     rounded-xl text-sm"
        >
          {error}
        </div>
      )}

      {/* Empty */}
      {!notifications.length && !error ? (

        <div
          className="bg-white border border-gray-200
                     rounded-2xl p-10 text-center"
        >

          <div className="text-5xl mb-4">
            📭
          </div>

          <h2 className="text-xl font-bold text-gray-700 mb-2">
            No Notifications
          </h2>

          <p className="text-sm text-gray-500">
            You're all caught up.
          </p>

        </div>

      ) : (

        <NotificationList
          notifications={notifications}
          onMarkRead={handleMarkRead}
        />

      )}

    </div>
  );
};

export default NotificationPage;