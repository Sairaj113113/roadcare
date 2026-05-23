import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute, {
  GuestRoute,
} from "../components/common/ProtectedRoute";

// =====================================================
// PUBLIC PAGES
// =====================================================

import HomePage from "../pages/HomePage";

import LoginPage from "../pages/LoginPage";

import RegisterPage from "../pages/RegisterPage";

import MapPage from "../pages/MapPage";

import NearbyPotholesPage
from "../pages/NearbyPotholesPage";

import AboutPage from "../pages/AboutPage";

import UnauthorizedPage
from "../pages/UnauthorizedPage";

import NotFoundPage
from "../pages/NotFoundPage";

// =====================================================
// USER PAGES
// =====================================================

import ReportPotholePage
from "../pages/ReportPotholePage";

import MyReportsPage
from "../pages/MyReportsPage";

import ReportDetailsPage
from "../pages/ReportDetailsPage";

import NotificationPage
from "../pages/NotificationPage";

import ProfilePage
from "../pages/ProfilePage";

// =====================================================
// ADMIN ROUTES
// =====================================================

import AdminRoutes
from "./AdminRoutes";

// =====================================================
// SUPER ADMIN PAGES
// =====================================================

import SuperAdminDashboardPage
from "../pages/superAdmin/SuperAdminDashboardPage";

import ManageAdminsPage
from "../pages/superAdmin/ManageAdminsPage";

import CreateAdminPage
from "../pages/superAdmin/CreateAdminPage";

/**
 * AppRoutes
 */

const AppRoutes = () => (

  <Routes>

    {/* =====================================================
        PUBLIC + USER LAYOUT
    ===================================================== */}

    <Route element={<MainLayout />}>

      {/* =====================================================
          PUBLIC
      ===================================================== */}

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/map"
        element={<MapPage />}
      />

      <Route
        path="/nearby"
        element={<NearbyPotholesPage />}
      />

      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      {/* =====================================================
          GUEST
      ===================================================== */}

      <Route element={<GuestRoute />}>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

      </Route>

      {/* =====================================================
          AUTHENTICATED USERS
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/report"
          element={<ReportPotholePage />}
        />

        <Route
          path="/my-reports"
          element={<MyReportsPage />}
        />

        <Route
          path="/reports/:id"
          element={<ReportDetailsPage />}
        />

        <Route
          path="/notifications"
          element={<NotificationPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

      </Route>

    </Route>

    {/* =====================================================
        ADMIN ROUTES
    ===================================================== */}

    <Route
      path="/admin/*"
      element={<AdminRoutes />}
    />

    {/* =====================================================
        SUPER ADMIN ROUTES
    ===================================================== */}

    <Route
      element={
        <ProtectedRoute
          allowedRoles={[
            "SUPER_ADMIN",
          ]}
        />
      }
    >

      <Route element={<AdminLayout />}>

        <Route
          path="/super-admin/dashboard"
          element={
            <SuperAdminDashboardPage />
          }
        />

        <Route
          path="/super-admin/admins"
          element={
            <ManageAdminsPage />
          }
        />

        <Route
          path="/super-admin/create-admin"
          element={
            <CreateAdminPage />
          }
        />

      </Route>

    </Route>

    {/* =====================================================
        404
    ===================================================== */}

    <Route
      path="*"
      element={<NotFoundPage />}
    />

  </Routes>
);

export default AppRoutes;