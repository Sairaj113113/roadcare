import api from './api';

/**
 * adminService — city-scoped admin APIs.
 * Backend automatically restricts reports
 * based on admin assigned city.
 */
const adminService = {

  // ================= DASHBOARD =================

  getDashboardStats: async () => {
    const res = await api.get('/admin/dashboard');
    return res.data;
  },

  // ================= REPORTS =================

  getAllReports: async () => {
    const res = await api.get('/admin/reports');
    return res.data;
  },

  getReportById: async (id) => {
    const res = await api.get(`/admin/reports/${id}`);
    return res.data;
  },

  // ================= FILTER =================

  /**
   * Only status filter now.
   * City filtering removed because
   * admins are city-scoped automatically.
   */
  filterReports: async ({ status } = {}) => {
    const params = {};

    if (status && status !== 'ALL') {
      params.status = status;
    }

    const res = await api.get('/admin/reports/filter', { params });

    return res.data;
  },

  // ================= STATUS UPDATE =================

  updateReportStatus: async (id, payload) => {
    const res = await api.put(`/admin/reports/${id}/status`, payload);
    return res.data;
  },
};

export default adminService;