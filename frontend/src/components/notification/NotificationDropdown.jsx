import {
  Link,
} from 'react-router-dom';

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { UserContext } from '../../context/UserContext';

import api from '../../services/api';

const NotificationDropdown = () => {

  const { unreadCount = 0 } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const dropdownRef = useRef(null);

  // ==================== FETCH ====================

  useEffect(() => {

    if (!open) return;

    const fetchNotifications = async () => {

      try {

        setLoading(true);

        const response =
          await api.get('/notifications');

        setNotifications(
          response.data.slice(0, 5)
        );

      } catch (error) {

        console.error(
          'Failed to load notifications',
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchNotifications();

  }, [open]);

  // ==================== OUTSIDE CLICK ====================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };

  }, []);

  // ==================== RELATIVE TIME ====================

  const getRelativeTime = (dateString) => {

    const now = new Date();

    const date = new Date(dateString);

    const seconds =
      Math.floor((now - date) / 1000);

    if (seconds < 60)
      return 'Just now';

    const minutes =
      Math.floor(seconds / 60);

    if (minutes < 60)
      return `${minutes} min ago`;

    const hours =
      Math.floor(minutes / 60);

    if (hours < 24)
      return `${hours} hr ago`;

    const days =
      Math.floor(hours / 24);

    return `${days} day ago`;
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >

      {/* Bell */}
      <button
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="relative p-2 rounded-xl
                   hover:bg-gray-100
                   transition-colors"
      >

        <span className="text-xl">
          🔔
        </span>

        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1
                       min-w-[20px] h-5 px-1
                       rounded-full bg-red-500
                       text-white text-[10px]
                       font-bold flex items-center
                       justify-center"
          >
            {unreadCount > 9
              ? '9+'
              : unreadCount}
          </span>
        )}

      </button>

      {/* Dropdown */}
      {open && (

        <div
          className="absolute right-0 mt-2 w-80
                     bg-white rounded-2xl
                     shadow-2xl border
                     border-gray-100
                     overflow-hidden z-50"
        >

          {/* Header */}
          <div
            className="px-4 py-3
                       border-b border-gray-100"
          >

            <h3 className="font-semibold text-gray-800">
              Notifications
            </h3>

          </div>

          {/* Loading */}
          {loading && (
            <div className="p-5 text-center text-sm text-gray-500">
              Loading notifications...
            </div>
          )}

          {/* Empty */}
          {!loading &&
            notifications.length === 0 && (
            <div className="p-5 text-center text-sm text-gray-500">
              No notifications yet.
            </div>
          )}

          {/* List */}
          {!loading &&
            notifications.length > 0 && (

            <div className="max-h-96 overflow-y-auto">

              {notifications.map((notification) => (

                <div
                  key={notification.id}
                  className={`px-4 py-3
                              border-b border-gray-100
                              hover:bg-gray-50
                              transition-colors
                              ${
                                !notification.isRead
                                  ? 'bg-primary-50/40'
                                  : ''
                              }`}
                >

                  <div className="flex gap-3">

                    <div
                      className={`w-2 h-2 rounded-full
                                  mt-2 flex-shrink-0
                                  ${
                                    !notification.isRead
                                      ? 'bg-primary-500'
                                      : 'bg-gray-300'
                                  }`}
                    />

                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-semibold text-gray-800">
                        {notification.title}
                      </p>

                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {notification.message}
                      </p>

                      <p className="text-[11px] text-gray-400 mt-2">
                        {getRelativeTime(
                          notification.createdAt
                        )}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

          {/* Footer */}
          <div
            className="border-t border-gray-100"
          >

            <Link
              to="/notifications"
              onClick={() =>
                setOpen(false)
              }
              className="block px-4 py-3
                         text-sm text-primary-600
                         hover:bg-gray-50
                         font-medium"
            >
              View All →
            </Link>

          </div>

        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;