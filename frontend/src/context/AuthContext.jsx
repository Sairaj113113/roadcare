import { createContext, useState, useEffect, useCallback } from "react";

import {
  saveSession,
  clearSession,
  getToken,
  getUser,
} from "../utils/tokenUtils";

import authService from "../services/authService";

/**
 * AuthContext — global authentication state for RoadCare.
 *
 * Provides:
 * currentUser
 * token
 * isAuthenticated
 * isAdmin
 * isSuperAdmin
 * loading
 * login()
 * logout()
 * refreshUser()
 */

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // RESTORE SESSION ON MOUNT
  // =====================================================

  useEffect(() => {

    const restore = async () => {

      const storedToken = getToken();

      const storedUser = getUser();

      if (!storedToken) {

        setLoading(false);
        return;
      }

      try {

        // Verify token with backend

        const freshUser =
          await authService.getCurrentUser();

        setToken(storedToken);

        setCurrentUser(freshUser);

        saveSession(
          storedToken,
          freshUser
        );

      } catch {

        // Invalid token → clear session

        clearSession();

        setToken(null);

        setCurrentUser(null);

      } finally {

        setLoading(false);
      }
    };

    restore();

  }, []);

  // =====================================================
  // LOGIN
  // =====================================================

  /**
   * Save user session after login/register.
   */

  const login = useCallback((jwtToken, user) => {

    saveSession(jwtToken, user);

    setToken(jwtToken);

    setCurrentUser(user);

  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = useCallback(() => {

    clearSession();

    setToken(null);

    setCurrentUser(null);

  }, []);

  // =====================================================
  // REFRESH USER
  // =====================================================

  const refreshUser = useCallback(async () => {

    try {

      const updated =
        await authService.getCurrentUser();

      setCurrentUser(updated);

      saveSession(
        getToken(),
        updated
      );

    } catch {

      logout();
    }

  }, [logout]);

  // =====================================================
  // DERIVED STATE
  // =====================================================

  const isAuthenticated =
    !!token && !!currentUser;

  const isAdmin =
    currentUser?.role === "ADMIN";

  const isSuperAdmin =
    currentUser?.role === "SUPER_ADMIN";

  const value = {

    // ================= USER =================

    currentUser,

    token,

    // ================= AUTH STATE =================

    isAuthenticated,

    isAdmin,

    isSuperAdmin,

    loading,

    // ================= ACTIONS =================

    login,

    logout,

    refreshUser,
  };

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>
  );
};