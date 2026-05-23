import api from "./api";

const createReport = async (formData) => {
  const response = await api.post("/reports", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const getMyReports = async () => {
  const response = await api.get("/reports/my");
  return response.data;
};

const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

const getNearbyReports = async (lat, lng) => {
  const response = await api.get(
    `/reports/nearby?lat=${lat}&lng=${lng}`
  );

  return response.data;
};

const checkDuplicate = async (lat, lng) => {
  const response = await api.post(
    `/reports/check-duplicate?lat=${lat}&lng=${lng}`
  );

  return response.data;
};

/**
 * Homepage statistics
 */
const getHomepageStats = async () => {
  const response = await api.get("/reports/stats");
  return response.data;
};

const reportService = {
  createReport,
  getMyReports,
  getReportById,
  getNearbyReports,
  checkDuplicate,
  getHomepageStats,
};

export default reportService;