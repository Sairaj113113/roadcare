import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import Loader from "./Loader";

/**
 * ProtectedRoute
 *
 * Supports:
 * - authentication protection
 * - role-based protection
 *
 * Example:
 *
 * <ProtectedRoute />
 * → any authenticated user
 *
 * <ProtectedRoute allowedRoles={["ADMIN"]} />
 * → only admins
 *
 * <ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />
 * → only super admins
 */

const ProtectedRoute = ({
  allowedRoles = null,
  redirectTo = "/login",
}) => {

  const {
    isAuthenticated,
    currentUser,
    loading,
  } = useAuth();

  const location = useLocation();

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <Loader
        fullPage
        message="Loading..."
      />
    );
  }

  // =====================================================
  // NOT AUTHENTICATED
  // =====================================================

  if (!isAuthenticated) {

    return (
      <Navigate
        to={redirectTo}
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  // =====================================================
  // ROLE CHECK
  // =====================================================

  if (
    allowedRoles &&
    !allowedRoles.includes(
      currentUser?.role
    )
  ) {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  // =====================================================
  // ACCESS GRANTED
  // =====================================================

  return <Outlet />;
};

/**
 * GuestRoute
 *
 * Prevents authenticated users from
 * accessing login/register pages.
 */

export const GuestRoute = () => {

  const {
    isAuthenticated,
    currentUser,
    loading,
  } = useAuth();

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <Loader
        fullPage
        message="Loading..."
      />
    );
  }

  // =====================================================
  // REDIRECT AUTHENTICATED USERS
  // =====================================================

  if (isAuthenticated) {

    // SUPER ADMIN

    if (
      currentUser?.role ===
      "SUPER_ADMIN"
    ) {

      return (
        <Navigate
          to="/super-admin/dashboard"
          replace
        />
      );
    }

    // ADMIN

    if (
      currentUser?.role ===
      "ADMIN"
    ) {

      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    // NORMAL USER

    return (
      <Navigate
        to="/my-reports"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;