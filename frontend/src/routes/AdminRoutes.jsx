import { Routes, Route } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';

import ProtectedRoute
from '../components/common/ProtectedRoute';

import AdminDashboardPage
from '../pages/admin/AdminDashboardPage';

import AdminReportsPage
from '../pages/admin/AdminReportsPage';

import AdminReportDetailsPage
from '../pages/admin/AdminReportDetailsPage';

import AdminUpdateStatusPage
from '../pages/admin/AdminUpdateStatusPage';

/**
 * AdminRoutes
 *
 * Mounted at:
 * /admin/*
 *
 * Access:
 * ADMIN
 * SUPER_ADMIN
 */

const AdminRoutes = () => (

  <Routes>

    {/* =====================================================
        PROTECTED ADMIN ROUTES
    ===================================================== */}

    <Route
      element={
        <ProtectedRoute
          allowedRoles={[
            'ADMIN',
            'SUPER_ADMIN',
          ]}
          redirectTo="/login"
        />
      }
    >

      {/* =====================================================
          ADMIN LAYOUT
      ===================================================== */}

      <Route element={<AdminLayout />}>

        <Route
          path="dashboard"
          element={<AdminDashboardPage />}
        />

        <Route
          path="reports"
          element={<AdminReportsPage />}
        />

        <Route
          path="reports/:id"
          element={<AdminReportDetailsPage />}
        />

        <Route
          path="reports/:id/update"
          element={<AdminUpdateStatusPage />}
        />

      </Route>

    </Route>

  </Routes>
);

export default AdminRoutes;