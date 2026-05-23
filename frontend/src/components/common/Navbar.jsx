import { useState, useContext } from 'react';

import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { UserContext } from '../../context/UserContext';

import NotificationDropdown from '../notification/NotificationDropdown';

const Navbar = () => {

  const {
    isAuthenticated,
    isAdmin,
    currentUser,
    logout,
  } = useAuth();

  const { unreadCount } =
    useContext(UserContext);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  // ==================== LOGOUT ====================

  const handleLogout = () => {

    logout();

    setMenuOpen(false);

    navigate('/login', {
      replace: true,
    });
  };

  const close = () =>
    setMenuOpen(false);

  // ==================== ACTIVE LINK ====================

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-primary-600'
        : 'text-gray-600 hover:text-primary-600'
    }`;

  return (
    <nav
      className="bg-white border-b border-gray-200
                 sticky top-0 z-30 shadow-sm"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* ==================== LOGO ==================== */}

          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
          >

            <span className="text-2xl">
              🚧
            </span>

            <span className="text-xl font-bold text-primary-700">
              RoadCare
            </span>

          </Link>

          {/* ==================== DESKTOP ==================== */}

          <div className="hidden md:flex items-center gap-5">

            {/* Public */}
            <NavLink
              to="/"
              className={linkClass}
              end
            >
              Home
            </NavLink>

            <NavLink
              to="/map"
              className={linkClass}
            >
              Map
            </NavLink>

            <NavLink
              to="/nearby"
              className={linkClass}
            >
              Nearby
            </NavLink>

            <NavLink
              to="/about"
              className={linkClass}
            >
              About
            </NavLink>

            {/* USER */}
            {isAuthenticated &&
              !isAdmin && (
              <>
                <NavLink
                  to="/report"
                  className={linkClass}
                >
                  Report Pothole
                </NavLink>

                <NavLink
                  to="/my-reports"
                  className={linkClass}
                >
                  My Reports
                </NavLink>

                <NotificationDropdown />
              </>
            )}

            {/* ADMIN */}
            {isAuthenticated &&
              isAdmin && (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className={linkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/reports"
                  className={linkClass}
                >
                  Reports
                </NavLink>
              </>
            )}

            {/* ==================== AUTH AREA ==================== */}

            {isAuthenticated ? (

              <div
                className="flex items-center gap-3
                           border-l border-gray-200
                           pl-4 ml-1"
              >

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-3
                             hover:bg-gray-50
                             rounded-xl px-2 py-1.5
                             transition-colors"
                >

                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full
                               bg-primary-100
                               flex items-center justify-center
                               text-sm font-bold
                               text-primary-700"
                  >
                    {currentUser?.name
                      ?.charAt(0)
                      ?.toUpperCase() || 'U'}
                  </div>

                  {/* Name */}
                  <div className="flex flex-col leading-tight">

                    <span className="text-xs text-gray-400">
                      Welcome
                    </span>

                    <span
                      className="text-sm font-semibold
                                 text-gray-700
                                 max-w-[120px] truncate"
                    >
                      {currentUser?.name}

                      {isAdmin && (
                        <span
                          className="ml-1 text-[10px]
                                     bg-primary-100
                                     text-primary-700
                                     px-1.5 py-0.5
                                     rounded font-semibold"
                        >
                          ADMIN
                        </span>
                      )}
                    </span>

                  </div>

                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="btn-secondary
                             text-sm py-1.5 px-4"
                >
                  Logout
                </button>

              </div>

            ) : (

              <div
                className="flex items-center gap-3
                           border-l border-gray-200
                           pl-4 ml-1"
              >

                <NavLink
                  to="/login"
                  className={linkClass}
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  className="btn-primary
                             text-sm py-1.5 px-4"
                >
                  Register
                </Link>

              </div>

            )}

          </div>

          {/* ==================== MOBILE BUTTON ==================== */}

          <button
            className="md:hidden p-2 rounded-lg
                       text-gray-600 hover:bg-gray-100"
            onClick={() =>
              setMenuOpen((o) => !o)
            }
            aria-label="Toggle menu"
          >

            <div className="space-y-1">

              <div className="w-5 h-0.5 bg-current" />

              <div className="w-5 h-0.5 bg-current" />

              <div className="w-5 h-0.5 bg-current" />

            </div>

          </button>

        </div>
      </div>

      {/* ==================== MOBILE MENU ==================== */}

      {menuOpen && (

        <div
          className="md:hidden border-t border-gray-100
                     bg-white px-4 py-3
                     flex flex-col gap-3 shadow-md"
        >

          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={close}
          >
            Home
          </NavLink>

          <NavLink
            to="/map"
            className={linkClass}
            onClick={close}
          >
            Map
          </NavLink>

          <NavLink
            to="/nearby"
            className={linkClass}
            onClick={close}
          >
            Nearby
          </NavLink>

          <NavLink
            to="/about"
            className={linkClass}
            onClick={close}
          >
            About
          </NavLink>

          {/* USER */}
          {isAuthenticated &&
            !isAdmin && (
            <>
              <NavLink
                to="/report"
                className={linkClass}
                onClick={close}
              >
                Report Pothole
              </NavLink>

              <NavLink
                to="/my-reports"
                className={linkClass}
                onClick={close}
              >
                My Reports
              </NavLink>

              <NavLink
                to="/notifications"
                className={linkClass}
                onClick={close}
              >
                Notifications

                {unreadCount > 0 && (
                  <span
                    className="ml-2 bg-red-500
                               text-white text-[10px]
                               font-bold rounded-full
                               px-1.5 py-0.5"
                  >
                    {unreadCount > 9
                      ? '9+'
                      : unreadCount}
                  </span>
                )}

              </NavLink>

              <NavLink
                to="/profile"
                className={linkClass}
                onClick={close}
              >
                Profile
              </NavLink>
            </>
          )}

          {/* ADMIN */}
          {isAuthenticated &&
            isAdmin && (
            <>
              <NavLink
                to="/admin/dashboard"
                className={linkClass}
                onClick={close}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/reports"
                className={linkClass}
                onClick={close}
              >
                Reports
              </NavLink>
            </>
          )}

          {/* Bottom */}
          <div
            className="border-t border-gray-100 pt-3"
          >

            {isAuthenticated ? (

              <div className="flex items-center gap-3">

                <div
                  className="w-10 h-10 rounded-full
                             bg-primary-100
                             flex items-center justify-center
                             text-sm font-bold
                             text-primary-700"
                >
                  {currentUser?.name
                    ?.charAt(0)
                    ?.toUpperCase() || 'U'}
                </div>

                <div className="flex-1">

                  <p className="text-sm font-semibold text-gray-700">
                    {currentUser?.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {currentUser?.email}
                  </p>

                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600
                             font-medium hover:underline"
                >
                  Logout
                </button>

              </div>

            ) : (

              <div className="flex flex-col gap-2">

                <NavLink
                  to="/login"
                  className={linkClass}
                  onClick={close}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={linkClass}
                  onClick={close}
                >
                  Register
                </NavLink>

              </div>

            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;