import api from "./api";

const authService = {

  // =====================================================
  // SEND OTP
  // =====================================================

  sendOtp: async (email) => {

    const res = await api.post(
      "/auth/send-otp",
      {
        email,
      }
    );

    return res.data;
  },

  // =====================================================
  // VERIFY OTP
  // =====================================================

  verifyOtp: async (
    email,
    otp
  ) => {

    const res = await api.post(
      "/auth/verify-otp",
      {
        email,
        otp,
      }
    );

    return res.data;
  },

  // =====================================================
  // REGISTER
  // =====================================================

  register: async (
    name,
    email,
    password
  ) => {

    const res = await api.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    return res.data;
  },

  // =====================================================
  // LOGIN
  // =====================================================

  login: async (
    email,
    password
  ) => {

    const res = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    return res.data;
  },

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  googleLogin: async (
    name,
    email,
    photoUrl
  ) => {

    const res = await api.post(
      "/auth/google",
      {
        name,
        email,
        photoUrl,
      }
    );

    return res.data;
  },

  // =====================================================
  // ADMIN LOGIN
  // =====================================================

  adminLogin: async (
    email,
    password
  ) => {

    const res = await api.post(
      "/login",
      {
        email,
        password,
      }
    );

    return res.data;
  },

  // =====================================================
  // CURRENT USER
  // =====================================================

  getCurrentUser: async () => {

    const res = await api.get(
      "/auth/me"
    );

    return res.data;
  },
};

export default authService;