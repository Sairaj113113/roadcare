import api from "./api";

const superAdminService = {

  // =====================================================
  // CREATE ADMIN
  // =====================================================

  createAdmin: async ({
    name,
    email,
    password,
    assignedCity,
  }) => {

    const res = await api.post(
      "/super-admin/admins",
      {
        name,
        email,
        password,
        assignedCity,
      }
    );

    return res.data;
  },

  // =====================================================
  // GET ALL ADMINS
  // =====================================================

  getAdmins: async () => {

    const res = await api.get(
      "/super-admin/admins"
    );

    return res.data;
  },

  // =====================================================
  // DELETE ADMIN
  // =====================================================

  deleteAdmin: async (adminId) => {

    const res = await api.delete(
      `/super-admin/admins/${adminId}`
    );

    return res.data;
  },
};

export default superAdminService;