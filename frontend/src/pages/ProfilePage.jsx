import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const ProfilePage = () => {

  const {
    currentUser,
    isAdmin,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  // ==================== LOGOUT ====================

  const handleLogout = () => {

    logout();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ==================== HEADER ==================== */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          👤 My Profile
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your RoadCare account and activity.
        </p>

      </div>

      {/* ==================== PROFILE CARD ==================== */}

      <div
        className="bg-white border border-gray-200
                   rounded-3xl p-8"
      >

        {/* Top */}
        <div
          className="flex flex-col sm:flex-row
                     sm:items-center gap-6 mb-8"
        >

          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full
                       bg-primary-100
                       flex items-center justify-center
                       text-4xl font-bold
                       text-primary-700"
          >
            {currentUser?.name
              ?.charAt(0)
              ?.toUpperCase() || 'U'}
          </div>

          {/* User Info */}
          <div className="flex-1">

            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.name || 'User'}
            </h2>

            <p className="text-gray-500 mt-2">
              {currentUser?.email}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">

              <span
                className="px-3 py-1 rounded-full
                           bg-primary-100 text-primary-700
                           text-xs font-semibold"
              >
                {isAdmin
                  ? 'Administrator'
                  : 'Citizen'}
              </span>

              <span
                className="px-3 py-1 rounded-full
                           bg-emerald-100 text-emerald-700
                           text-xs font-semibold"
              >
                Active Account
              </span>

            </div>

          </div>

        </div>

        {/* ==================== DETAILS ==================== */}

        <div
          className="grid grid-cols-1 sm:grid-cols-2
                     gap-5 mb-8"
        >

          <div
            className="bg-gray-50 rounded-2xl p-5
                       border border-gray-100"
          >

            <p
              className="text-xs uppercase tracking-wide
                         text-gray-400 mb-2"
            >
              User ID
            </p>

            <p className="text-lg font-bold text-gray-800">
              #{currentUser?.userId || '-'}
            </p>

          </div>

          <div
            className="bg-gray-50 rounded-2xl p-5
                       border border-gray-100"
          >

            <p
              className="text-xs uppercase tracking-wide
                         text-gray-400 mb-2"
            >
              Account Type
            </p>

            <p className="text-lg font-bold text-gray-800">
              {isAdmin
                ? 'Administrator'
                : 'Citizen'}
            </p>

          </div>

        </div>

        {/* ==================== ACCOUNT ACTIONS ==================== */}

        <div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Account Actions
          </h3>

          <div
            className="grid grid-cols-1 sm:grid-cols-2
                       lg:grid-cols-3 gap-4"
          >

            {/* My Reports */}
            <Link
              to="/my-reports"
              className="group bg-gray-50
                         hover:bg-primary-50
                         border border-gray-200
                         hover:border-primary-200
                         rounded-2xl p-5
                         transition-all"
            >

              <div className="text-3xl mb-3">
                📄
              </div>

              <h4
                className="font-bold text-gray-800
                           group-hover:text-primary-700"
              >
                My Reports
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                View all pothole reports submitted by you.
              </p>

            </Link>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="group bg-gray-50
                         hover:bg-primary-50
                         border border-gray-200
                         hover:border-primary-200
                         rounded-2xl p-5
                         transition-all"
            >

              <div className="text-3xl mb-3">
                🔔
              </div>

              <h4
                className="font-bold text-gray-800
                           group-hover:text-primary-700"
              >
                Notifications
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                Check report updates and system alerts.
              </p>

            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="group text-left bg-red-50
                         hover:bg-red-100
                         border border-red-200
                         rounded-2xl p-5
                         transition-all"
            >

              <div className="text-3xl mb-3">
                🚪
              </div>

              <h4 className="font-bold text-red-700">
                Logout
              </h4>

              <p className="text-sm text-red-500 mt-1">
                Securely sign out from your account.
              </p>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;