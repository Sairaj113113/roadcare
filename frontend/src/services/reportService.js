import api from "./api";

// =========================================================
// CREATE REPORT
// =========================================================

const createReport = async (formData) => {

  const response = await api.post(

    "/reports",

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =========================================================
// MY REPORTS
// =========================================================

const getMyReports = async () => {

  const response =
    await api.get("/reports/my");

  return response.data;
};

// =========================================================
// REPORT BY ID
// =========================================================

const getReportById = async (id) => {

  const response =
    await api.get(`/reports/${id}`);

  return response.data;
};

// =========================================================
// NEARBY REPORTS
// =========================================================

const getNearbyReports = async (
  lat,
  lng
) => {

  const response = await api.get(
    `/reports/nearby?lat=${lat}&lng=${lng}`
  );

  return response.data;
};

// =========================================================
// DUPLICATE CHECK
// =========================================================

const checkDuplicate = async (
  lat,
  lng
) => {

  const response = await api.post(
    `/reports/check-duplicate?lat=${lat}&lng=${lng}`
  );

  return response.data;
};

// =========================================================
// HOMEPAGE STATS
// =========================================================

const getHomepageStats = async () => {

  const response =
    await api.get("/reports/stats");

  return response.data;
};

// =========================================================
// EXPORTS
// =========================================================

const reportService = {

  createReport,

  getMyReports,

  getReportById,

  getNearbyReports,

  checkDuplicate,

  getHomepageStats,
};

export default reportService;