import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

// =====================================================
// ICONS
// =====================================================

const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IconReports = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline
      points="14 3 14 8 19 8"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="9"
      y1="13"
      x2="15"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="9"
      y1="17"
      x2="15"
      y2="17"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2.4" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2.4" />
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2.4" />
  </svg>
);

const IconLogout = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <polyline
      points="16 17 21 12 16 7"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <line
      x1="21"
      y1="12"
      x2="9"
      y2="12"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
);

// =====================================================
// DYNAMIC LINKS
// =====================================================

const getLinks = (role) => {

  // =====================================================
  // SUPER ADMIN LINKS
  // =====================================================

  if (role === 'SUPER_ADMIN') {

    return [

      {
        to: '/super-admin/dashboard',
        label: 'Dashboard',
        icon: <IconDashboard />,
        end: true,
      },

      {
        to: '/super-admin/admins',
        label: 'Manage Admins',
        icon: <IconReports />,
      },

      {
        to: '/super-admin/create-admin',
        label: 'Create Admin',
        icon: <IconReports />,
      },
    ];
  }

  // =====================================================
  // ADMIN LINKS
  // =====================================================

  return [

    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: <IconDashboard />,
      end: true,
    },

    {
      to: '/admin/reports',
      label: 'Reports',
      icon: <IconReports />,
    },
  ];
};

// =====================================================
// SIDEBAR
// =====================================================

const Sidebar = ({
  onClose,
  role,
}) => {

  return (
    <aside
      style={{
        width: '255px',
        minWidth: '255px',

        height: '100dvh',

        position: 'fixed',
        top: 0,
        left: 0,

        display: 'flex',
        flexDirection: 'column',

        background:
          'linear-gradient(180deg, #081120 0%, #0F172A 45%, #111827 100%)',

        borderRight: '1px solid rgba(255,255,255,0.06)',

        overflow: 'hidden',
        zIndex: 50,
      }}
    >

      {/* glow */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',

          width: '260px',
          height: '260px',

          borderRadius: '50%',

          background: 'rgba(37,99,235,0.18)',

          filter: 'blur(80px)',
        }}
      />

      {/* logo */}
      <div
        style={{
          padding: '24px 22px',

          borderBottom: '1px solid rgba(255,255,255,0.06)',

          position: 'relative',
        }}
      >

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >

          <div
            style={{
              width: '46px',
              height: '46px',

              borderRadius: '16px',

              background:
                'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              boxShadow: '0 10px 30px rgba(37,99,235,0.35)',
            }}
          >

            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">

              <rect
                x="8"
                y="2"
                width="8"
                height="20"
                rx="1.5"
                stroke="white"
                strokeWidth="2"
                opacity="0.35"
              />

              <line
                x1="12"
                y1="2"
                x2="12"
                y2="22"
                stroke="white"
                strokeWidth="2.4"
                strokeDasharray="3 3"
              />

            </svg>

          </div>

          <div>

            <div
              style={{
                color: '#fff',
                fontWeight: '800',
                fontSize: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              RoadCare
            </div>

            <div
              style={{
                color: 'rgba(148,163,184,0.8)',
                fontSize: '11px',
                marginTop: '3px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              AI City Control
            </div>

          </div>

        </div>

      </div>

      {/* nav */}
      <nav
        style={{
          flex: 1,

          padding: '22px 14px',

          display: 'flex',
          flexDirection: 'column',

          gap: '8px',

          position: 'relative',
        }}
      >

        <div
          style={{
            padding: '0 14px',

            marginBottom: '10px',

            fontSize: '11px',

            color: 'rgba(148,163,184,0.7)',

            fontWeight: '700',

            letterSpacing: '0.14em',

            textTransform: 'uppercase',
          }}
        >
          Management
        </div>

        {getLinks(role).map((link) => (

          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '14px',

              padding: '14px 15px',

              borderRadius: '18px',

              textDecoration: 'none',

              fontSize: '14px',
              fontWeight: isActive ? '700' : '600',

              color: isActive
                ? '#fff'
                : 'rgba(203,213,225,0.82)',

              background: isActive
                ? 'linear-gradient(135deg, rgba(37,99,235,0.22), rgba(6,182,212,0.14))'
                : 'transparent',

              border: isActive
                ? '1px solid rgba(96,165,250,0.24)'
                : '1px solid transparent',

              backdropFilter: 'blur(14px)',

              boxShadow: isActive
                ? '0 10px 30px rgba(37,99,235,0.12)'
                : 'none',

              transition: 'all 0.22s ease',
            })}
            className="rc-nav-link"
          >

            <div
              style={{
                width: '36px',
                height: '36px',

                borderRadius: '12px',

                background: 'rgba(255,255,255,0.06)',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                flexShrink: 0,
              }}
            >
              {link.icon}
            </div>

            {link.label}

          </NavLink>

        ))}

      </nav>

    </aside>
  );
};

// =====================================================
// LOGOUT BUTTON
// =====================================================

const LogoutBtn = ({ onClick }) => {

  const [hovered, setHovered] = useState(false);

  return (

    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '42px',
        height: '42px',

        borderRadius: '14px',

        border: hovered
          ? '1px solid rgba(239,68,68,0.28)'
          : '1px solid rgba(148,163,184,0.16)',

        background: hovered
          ? 'rgba(239,68,68,0.10)'
          : 'rgba(255,255,255,0.72)',

        color: hovered
          ? '#EF4444'
          : '#0F172A',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backdropFilter: 'blur(10px)',

        cursor: 'pointer',

        transition: 'all 0.2s ease',

        flexShrink: 0,
      }}
    >
      <IconLogout />
    </button>
  );
};

// =====================================================
// MAIN LAYOUT
// =====================================================

const AdminLayout = () => {

  const {
    logout,
    currentUser,
  } = useAuth();

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {

    logout();

    navigate('/login');
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .rc-nav-link:hover {
          background:
            linear-gradient(
              135deg,
              rgba(37,99,235,0.14),
              rgba(6,182,212,0.08)
            ) !important;

          color: #fff !important;

          transform: translateY(-1px);
        }

        body {
          margin: 0;
          background: #f4f7fb;
          font-family: Inter, sans-serif;
        }
      `}</style>

      <div
        style={{
          display: 'flex',

          minHeight: '100vh',

          background:
            `
            radial-gradient(circle at top left, rgba(59,130,246,0.08), transparent 25%),
            radial-gradient(circle at bottom right, rgba(6,182,212,0.06), transparent 25%),
            linear-gradient(180deg, #f8fbff 0%, #f1f5f9 100%)
            `,

          overflow: 'hidden',
        }}
      >

        {/* desktop sidebar */}
        <div className="hidden lg:flex">
          <Sidebar role={currentUser?.role} />
        </div>

        {/* mobile sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,

                background: 'rgba(2,6,23,0.72)',

                backdropFilter: 'blur(6px)',

                zIndex: 90,
              }}
            />

            <div
              className="lg:hidden"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
              }}
            >
              <Sidebar
                role={currentUser?.role}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* main */}
        <div
          className="lg:ml-[255px]"
          style={{
            flex: 1,

            display: 'flex',
            flexDirection: 'column',

            minWidth: 0,
          }}
        >

          {/* navbar */}
          <header
            style={{
              height: '78px',

              position: 'sticky',
              top: 0,

              zIndex: 40,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              padding: '0 28px',

              background: 'rgba(255,255,255,0.72)',

              backdropFilter: 'blur(20px)',

              borderBottom: '1px solid rgba(148,163,184,0.12)',
            }}
          >

            {/* left */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >

              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                style={{
                  width: '42px',
                  height: '42px',

                  borderRadius: '14px',

                  border: '1px solid rgba(148,163,184,0.16)',

                  background: 'rgba(255,255,255,0.72)',

                  color: '#0F172A',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  cursor: 'pointer',
                }}
              >
                <IconMenu />
              </button>

              <div>

                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#0F172A',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {currentUser?.role === 'SUPER_ADMIN'
                    ? 'Super Admin Dashboard'
                    : 'Admin Dashboard'}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#64748B',
                    marginTop: '2px',
                  }}
                >
                  Smart road monitoring & city management
                </div>

              </div>

            </div>

            {/* right */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >

              <LogoutBtn onClick={handleLogout} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',

                  padding: '8px 10px',

                  borderRadius: '16px',

                  background: 'rgba(255,255,255,0.7)',

                  border: '1px solid rgba(148,163,184,0.12)',
                }}
              >

                <div
                  style={{
                    width: '40px',
                    height: '40px',

                    borderRadius: '14px',

                    background:
                      'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',

                    color: '#fff',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    fontWeight: '800',
                    fontSize: '15px',
                  }}
                >
                  {currentUser?.role === 'SUPER_ADMIN'
                    ? 'S'
                    : 'A'}
                </div>

                <div className="hidden sm:block">

                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#0F172A',
                    }}
                  >
                    {currentUser?.role === 'SUPER_ADMIN'
                      ? 'Super Admin'
                      : 'Admin'}
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      color: '#64748B',
                    }}
                  >
                    RoadCare Management
                  </div>

                </div>

              </div>

            </div>

          </header>

          {/* page content */}
          <main
            style={{
              flex: 1,

              overflowY: 'auto',

              padding: '30px',
            }}
          >
            <Outlet />
          </main>

        </div>

      </div>
    </>
  );
};

export default AdminLayout;