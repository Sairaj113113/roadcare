import api from './api';

/**
 * notificationService — all notification API calls for RoadCare.
 * Uses the centralized Axios instance (api.js) which auto-injects JWT.
 */
const notificationService = {

  /** GET /api/notifications — all notifications for logged-in user, newest first */
  getNotifications: async () => {
    const res = await api.get('/notifications');
    return res.data;
  },

  /** GET /api/notifications/unread-count → { unreadCount: N } */
  getUnreadCount: async () => {
    const res = await api.get('/notifications/unread-count');
    return res.data.unreadCount;
  },

  /** PUT /api/notifications/{id}/read — mark one notification read */
  markAsRead: async (id) => {
    const res = await api.put(`/notifications/${id}/read`);
    return res.data;
  },

  /** PUT /api/notifications/read-all — mark all notifications read */
  markAllAsRead: async () => {
    const res = await api.put('/notifications/read-all');
    return res.data;
  },
};

export default notificationService;