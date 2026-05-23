import { Link } from 'react-router-dom';
import StatusBadge from '../report/StatusBadge';
import { formatDate } from '../../utils/dateUtils';
import Loader from '../common/Loader';

// =====================================================
// SKELETON
// =====================================================

const SkeletonCard = () => (
  <div
    className="animate-pulse"
    style={{
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid rgba(226,232,240,0.8)',
      padding: '18px',
      minHeight: '120px',
      boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
    }}
  >
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded-2xl" />

      <div className="flex-1">
        <div className="w-32 h-4 bg-gray-200 rounded mb-3" />
        <div className="w-24 h-3 bg-gray-100 rounded mb-2" />
        <div className="w-20 h-3 bg-gray-100 rounded" />
      </div>

      <div className="w-24 h-10 rounded-xl bg-gray-100" />
    </div>
  </div>
);

// =====================================================
// EMPTY STATE
// =====================================================

const EmptyState = () => (
  <div
    style={{
      background: 'rgba(255,255,255,0.82)',
      border: '1px solid rgba(226,232,240,0.8)',
      borderRadius: '30px',

      padding: '70px 20px',

      textAlign: 'center',

      backdropFilter: 'blur(12px)',

      boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
    }}
  >
    <div
      style={{
        width: '88px',
        height: '88px',

        margin: '0 auto 20px',

        borderRadius: '26px',

        background:
          'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.10))',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: '40px',
      }}
    >
      🕳️
    </div>

    <h3
      style={{
        fontSize: '24px',
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: '10px',
      }}
    >
      No Reports Found
    </h3>

    <p
      style={{
        color: '#64748B',
        fontSize: '15px',
      }}
    >
      No pothole reports match your current filters.
    </p>
  </div>
);

// =====================================================
// REPORT CARD
// =====================================================

const ReportCard = ({ report }) => {

  return (
    <div
      className="group"
      style={{
        background: 'rgba(255,255,255,0.82)',

        borderRadius: '28px',

        border: '1px solid rgba(226,232,240,0.8)',

        padding: '20px',

        backdropFilter: 'blur(14px)',

        boxShadow: '0 12px 40px rgba(15,23,42,0.05)',

        transition: 'all 0.25s ease',
      }}
    >
      <div className="flex flex-col xl:flex-row xl:items-center gap-5">

        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1 min-w-0">

          {/* image */}
          <div
            style={{
              width: '84px',
              height: '84px',

              borderRadius: '24px',

              overflow: 'hidden',

              flexShrink: 0,

              background: '#F1F5F9',

              border: '1px solid rgba(226,232,240,0.7)',

              boxShadow: '0 8px 25px rgba(15,23,42,0.06)',
            }}
          >
            {report.imageUrl ? (
              <img
                src={report.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  fontSize: '32px',
                }}
              >
                🕳️
              </div>
            )}
          </div>

          {/* content */}
          <div className="min-w-0 flex-1">

            {/* top */}
            <div className="flex flex-wrap items-center gap-3 mb-2">

              <div
                style={{
                  padding: '6px 12px',

                  borderRadius: '999px',

                  background:
                    'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.10))',

                  border: '1px solid rgba(96,165,250,0.16)',

                  color: '#2563EB',

                  fontSize: '11px',
                  fontWeight: '700',

                  letterSpacing: '0.08em',

                  textTransform: 'uppercase',
                }}
              >
                REPORT #{report.id}
              </div>

              <StatusBadge status={report.status} />
            </div>

            {/* city */}
            <h3
              style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#0F172A',

                marginBottom: '6px',

                letterSpacing: '-0.03em',
              }}
            >
              {report.city || 'Unknown Location'}
            </h3>

            {/* address */}
            {report.address && (
              <p
                style={{
                  color: '#64748B',
                  fontSize: '14px',

                  marginBottom: '10px',

                  lineHeight: 1.5,
                }}
              >
                {report.address}
              </p>
            )}

            {/* meta */}
            <div className="flex flex-wrap items-center gap-4">

              <div
                style={{
                  fontSize: '13px',
                  color: '#475569',
                  fontWeight: '600',
                }}
              >
                👤 {report.reporterName}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#64748B',
                }}
              >
                {report.reporterEmail}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#64748B',
                }}
              >
                📅 {formatDate(report.createdAt)}
              </div>

              {report.duplicateCount > 0 && (
                <div
                  style={{
                    padding: '5px 10px',

                    borderRadius: '999px',

                    background: 'rgba(249,115,22,0.10)',

                    border: '1px solid rgba(249,115,22,0.18)',

                    color: '#EA580C',

                    fontSize: '12px',
                    fontWeight: '700',
                  }}
                >
                  ⚠️ {report.duplicateCount} duplicates
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 xl:justify-end">

          <Link
            to={`/admin/reports/${report.id}`}
            style={{
              padding: '13px 18px',

              borderRadius: '16px',

              background:
                'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',

              color: '#fff',

              textDecoration: 'none',

              fontSize: '14px',
              fontWeight: '700',

              boxShadow: '0 10px 25px rgba(37,99,235,0.22)',

              transition: 'all 0.22s ease',

              whiteSpace: 'nowrap',
            }}
          >
            Manage Report →
          </Link>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN TABLE
// =====================================================

const AdminTable = ({ reports = [], loading = false }) => {

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!reports.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-5">

      {/* top header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          padding: '0 6px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#0F172A',
              letterSpacing: '-0.03em',
            }}
          >
            Recent Reports
          </div>

          <div
            style={{
              fontSize: '14px',
              color: '#64748B',
              marginTop: '4px',
            }}
          >
            Monitor and manage pothole reports across the city
          </div>
        </div>

        <div
          style={{
            padding: '10px 16px',

            borderRadius: '16px',

            background: 'rgba(255,255,255,0.75)',

            border: '1px solid rgba(226,232,240,0.8)',

            color: '#0F172A',

            fontSize: '14px',
            fontWeight: '700',

            backdropFilter: 'blur(10px)',
          }}
        >
          {reports.length} Reports
        </div>
      </div>

      {/* reports */}
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminTable;