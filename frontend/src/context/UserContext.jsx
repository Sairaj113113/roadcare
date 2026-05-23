import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import notificationService from '../services/notificationService';

/**
 * UserContext — extended user-level UI state for RoadCare.
 *
 * Provides:
 *   unreadCount       — live unread notification count (drives Navbar badge)
 *   setUnreadCount    — set directly (e.g. after fetching)
 *   decrementUnread   — called when one notification is read
 *   resetUnread       — called when all notifications are marked read
 *   refreshUnread()   — re-fetch count from backend
 */
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count whenever auth state changes (login / page refresh)
  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      notificationService.getUnreadCount()
        .then((count) => setUnreadCount(count))
        .catch(() => setUnreadCount(0));
    } else {
      setUnreadCount(0);
    }
  }, [isAuthenticated, isAdmin]);

  const decrementUnread = useCallback(() => {
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const resetUnread = useCallback(() => setUnreadCount(0), []);

  const refreshUnread = useCallback(async () => {
    if (!isAuthenticated || isAdmin) return;
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch {
      // silently fail — badge just won't update
    }
  }, [isAuthenticated, isAdmin]);

  const value = {
    unreadCount,
    setUnreadCount,
    decrementUnread,
    resetUnread,
    refreshUnread,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};