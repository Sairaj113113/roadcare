import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import DashboardCards from '../../components/admin/DashboardCards';
import AdminTable from '../../components/admin/AdminTable';
import Loader from '../../components/common/Loader';

import adminService from '../../services/adminService';
import useAuth from '../../hooks/useAuth';

// =====================================================
// DASHBOARD PAGE
// =====================================================

const AdminDashboardPage = () => {

  const { currentUser, isAuthenticated, authLoading } = useAuth();

  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);

  const [statsLoading, setStatsLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);

  const [error, setError] = useState('');

  // =====================================================
  // REDIRECT
  // =====================================================

  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {

    adminService.getDashboardStats()
      .then(setStats)
      .catch(() => {
        setError('Failed to load dashboard statistics.');
      })
      .finally(() => {
        setStatsLoading(false);
      });

    adminService.getAllReports()
      .then((data) => {
        setRecentReports(data.slice(0, 8));
      })
      .catch(() => {})
      .finally(() => {
        setReportsLoading(false);
      });

  }, []);

  // =====================================================
  // RESOLUTION %
  // =====================================================

  const resolutionPct =
    stats && stats.totalReports > 0
      ? Math.round(
          (stats.resolvedCount / stats.totalReports) * 100
        )
      : 0;

  // =====================================================
  // LOADING
  // =====================================================

  if (authLoading) {
    return <Loader message="Loading dashboard..." />;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-8">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        style={{
          position: 'relative',

          overflow: 'hidden',

          borderRadius: '34px',

          padding: '34px',

          background:
            `
            linear-gradient(
              135deg,
              #0F172A 0%,
              #111827 45%,
              #1E3A8A 100%
            )
            `,

          boxShadow: '0 25px 60px rgba(15,23,42,0.16)',
        }}
      >

        {/* glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',

            width: '320px',
            height: '320px',

            borderRadius: '50%',

            background: 'rgba(59,130,246,0.18)',

            filter: 'blur(90px)',
          }}
        />

        {/* glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-140px',
            left: '-100px',

            width: '260px',
            height: '260px',

            borderRadius: '50%',

            background: 'rgba(6,182,212,0.16)',

            filter: 'blur(90px)',
          }}
        />

        <div className="relative z-10">

          {/* top */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* left */}
            <div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',

                  padding: '10px 16px',

                  borderRadius: '999px',

                  background: 'rgba(255,255,255,0.08)',

                  border: '1px solid rgba(255,255,255,0.08)',

                  backdropFilter: 'blur(10px)',

                  color: 'rgba(255,255,255,0.82)',

                  fontSize: '12px',
                  fontWeight: '700',

                  letterSpacing: '0.08em',

                  textTransform: 'uppercase',

                  marginBottom: '20px',
                }}
              >
                Smart City AI Monitoring
              </div>

              <h1
                style={{
                  fontSize: '48px',
                  lineHeight: 1.05,

                  fontWeight: '800',

                  color: '#ffffff',

                  letterSpacing: '-0.05em',

                  maxWidth: '760px',
                }}
              >
                Welcome back,
                {' '}
                <span
                  style={{
                    background:
                      'linear-gradient(135deg, #60A5FA 0%, #22D3EE 100%)',

                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {currentUser?.name || 'Admin'}
                </span>
              </h1>

              <p
                style={{
                  marginTop: '16px',

                  color: 'rgba(226,232,240,0.78)',

                  fontSize: '17px',

                  lineHeight: 1.7,

                  maxWidth: '720px',
                }}
              >
                Monitor pothole reports, track city repair progress,
                and manage RoadCare operations in real time.
              </p>

              {/* city badge */}
              <div
                style={{
                  marginTop: '24px',

                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',

                  padding: '12px 18px',

                  borderRadius: '18px',

                  background: 'rgba(255,255,255,0.08)',

                  border: '1px solid rgba(255,255,255,0.08)',

                  color: '#fff',

                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',

                    borderRadius: '999px',

                    background: '#22C55E',

                    boxShadow: '0 0 14px rgba(34,197,94,0.9)',
                  }}
                />

                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(226,232,240,0.68)',

                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                    }}
                  >
                    Active Monitoring Area
                  </div>

                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: '700',
                      marginTop: '3px',
                    }}
                  >
                    {currentUser?.assignedCity ||
                      currentUser?.city ||
                      'Warangal'}
                  </div>
                </div>
              </div>
            </div>

            {/* right analytics */}
            <div
              style={{
                minWidth: '300px',

                background: 'rgba(255,255,255,0.08)',

                border: '1px solid rgba(255,255,255,0.08)',

                borderRadius: '28px',

                padding: '26px',

                backdropFilter: 'blur(14px)',
              }}
            >
              <div
                style={{
                  color: 'rgba(226,232,240,0.7)',

                  fontSize: '12px',

                  fontWeight: '700',

                  letterSpacing: '0.08em',

                  textTransform: 'uppercase',

                  marginBottom: '16px',
                }}
              >
                Resolution Performance
              </div>

              <div
                style={{
                  fontSize: '58px',
                  lineHeight: 1,

                  fontWeight: '800',

                  color: '#ffffff',

                  letterSpacing: '-0.05em',
                }}
              >
                {resolutionPct}%
              </div>

              <div
                style={{
                  marginTop: '14px',

                  color: 'rgba(226,232,240,0.72)',

                  fontSize: '14px',

                  lineHeight: 1.6,
                }}
              >
                City pothole resolution success rate based on all submitted reports.
              </div>

              {/* progress */}
              <div
                style={{
                  marginTop: '24px',

                  height: '12px',

                  borderRadius: '999px',

                  background: 'rgba(255,255,255,0.08)',

                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${resolutionPct}%`,
                    height: '100%',

                    borderRadius: '999px',

                    background:
                      'linear-gradient(90deg, #22C55E 0%, #06B6D4 100%)',

                    boxShadow: '0 0 20px rgba(6,182,212,0.5)',
                  }}
                />
              </div>

              {/* stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">

                <div>
                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: '800',
                      color: '#fff',
                    }}
                  >
                    {stats?.resolvedCount ?? 0}
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(226,232,240,0.7)',
                      marginTop: '4px',
                    }}
                  >
                    Resolved
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: '800',
                      color: '#fff',
                    }}
                  >
                    {stats?.pendingCount ?? 0}
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(226,232,240,0.7)',
                      marginTop: '4px',
                    }}
                  >
                    Pending
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '26px',
                      fontWeight: '800',
                      color: '#fff',
                    }}
                  >
                    {stats?.inProgressCount ?? 0}
                  </div>

                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(226,232,240,0.7)',
                      marginTop: '4px',
                    }}
                  >
                    In Progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          style={{
            padding: '16px 18px',

            borderRadius: '18px',

            background: 'rgba(239,68,68,0.08)',

            border: '1px solid rgba(239,68,68,0.14)',

            color: '#DC2626',

            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          {error}
        </div>
      )}

      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      <section>

        <div className="flex items-center justify-between mb-5">

          <div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0F172A',

                letterSpacing: '-0.04em',
              }}
            >
              System Overview
            </div>

            <div
              style={{
                marginTop: '4px',

                color: '#64748B',
                fontSize: '15px',
              }}
            >
              Real-time city repair monitoring and analytics
            </div>
          </div>

          <Link
            to="/admin/reports"
            style={{
              padding: '12px 18px',

              borderRadius: '16px',

              background: '#ffffff',

              border: '1px solid rgba(226,232,240,0.9)',

              color: '#0F172A',

              fontSize: '14px',
              fontWeight: '700',

              textDecoration: 'none',

              boxShadow: '0 8px 24px rgba(15,23,42,0.05)',
            }}
          >
            View All Reports →
          </Link>
        </div>

        <DashboardCards
          stats={stats}
          loading={statsLoading}
        />
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* pending */}
        <Link
          to="/admin/reports?status=PENDING"
          style={{
            position: 'relative',

            overflow: 'hidden',

            borderRadius: '30px',

            padding: '28px',

            textDecoration: 'none',

            background:
              'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',

            boxShadow: '0 18px 40px rgba(245,158,11,0.22)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',

              width: '180px',
              height: '180px',

              borderRadius: '50%',

              background: 'rgba(255,255,255,0.10)',
            }}
          />

          <div className="relative z-10">

            <div
              style={{
                width: '70px',
                height: '70px',

                borderRadius: '24px',

                background: 'rgba(255,255,255,0.14)',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: '32px',

                marginBottom: '22px',
              }}
            >
              ⏳
            </div>

            <div
              style={{
                fontSize: '34px',
                fontWeight: '800',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              {stats?.pendingCount ?? 0}
            </div>

            <div
              style={{
                marginTop: '12px',

                fontSize: '24px',
                fontWeight: '800',

                color: '#fff',
              }}
            >
              Pending Reports
            </div>

            <div
              style={{
                marginTop: '10px',

                color: 'rgba(255,255,255,0.82)',

                fontSize: '15px',

                lineHeight: 1.6,
              }}
            >
              Reports awaiting admin verification and action.
            </div>
          </div>
        </Link>

        {/* in progress */}
        <Link
          to="/admin/reports?status=IN_PROGRESS"
          style={{
            position: 'relative',

            overflow: 'hidden',

            borderRadius: '30px',

            padding: '28px',

            textDecoration: 'none',

            background:
              'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',

            boxShadow: '0 18px 40px rgba(37,99,235,0.22)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',

              width: '180px',
              height: '180px',

              borderRadius: '50%',

              background: 'rgba(255,255,255,0.10)',
            }}
          />

          <div className="relative z-10">

            <div
              style={{
                width: '70px',
                height: '70px',

                borderRadius: '24px',

                background: 'rgba(255,255,255,0.14)',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                fontSize: '32px',

                marginBottom: '22px',
              }}
            >
              🔧
            </div>

            <div
              style={{
                fontSize: '34px',
                fontWeight: '800',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              {stats?.inProgressCount ?? 0}
            </div>

            <div
              style={{
                marginTop: '12px',

                fontSize: '24px',
                fontWeight: '800',

                color: '#fff',
              }}
            >
              Repairs In Progress
            </div>

            <div
              style={{
                marginTop: '10px',

                color: 'rgba(255,255,255,0.82)',

                fontSize: '15px',

                lineHeight: 1.6,
              }}
            >
              Active repair operations currently being handled.
            </div>
          </div>
        </Link>
      </section>

      {/* =====================================================
          REPORTS
      ===================================================== */}

      <section>

        {reportsLoading ? (
          <Loader message="Loading reports..." />
        ) : (
          <AdminTable reports={recentReports} />
        )}

      </section>
    </div>
  );
};

export default AdminDashboardPage;