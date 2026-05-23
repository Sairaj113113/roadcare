const CARDS = [
  {
    key: 'totalReports',
    label: 'Total Reports',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)',
    glow: 'rgba(15,23,42,0.16)',
    iconBg: 'rgba(255,255,255,0.10)',
    valueColor: '#ffffff',
    labelColor: 'rgba(255,255,255,0.74)',
    sub: 'All submitted reports',
    getValue: (s) => s?.totalReports ?? 0,
  },

  {
    key: 'pendingCount',
    label: 'Pending',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 7V12L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    glow: 'rgba(245,158,11,0.24)',
    iconBg: 'rgba(255,255,255,0.16)',
    valueColor: '#ffffff',
    labelColor: 'rgba(255,255,255,0.78)',
    sub: 'Awaiting review',
    getValue: (s) => s?.pendingCount ?? 0,
  },

  {
    key: 'inProgressCount',
    label: 'In Progress',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-7.8 7.8-3 1 1-3 7.8-7.8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    glow: 'rgba(37,99,235,0.24)',
    iconBg: 'rgba(255,255,255,0.16)',
    valueColor: '#ffffff',
    labelColor: 'rgba(255,255,255,0.78)',
    sub: 'Repair underway',
    getValue: (s) => s?.inProgressCount ?? 0,
  },

  {
    key: 'resolvedCount',
    label: 'Resolved',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    glow: 'rgba(16,185,129,0.24)',
    iconBg: 'rgba(255,255,255,0.16)',
    valueColor: '#ffffff',
    labelColor: 'rgba(255,255,255,0.78)',
    sub: 'Successfully fixed',
    getValue: (s) => s?.resolvedCount ?? 0,
  },

  
];

// =====================================================
// SKELETON CARD
// =====================================================

const SkeletonCard = () => (
  <div
    className="animate-pulse"
    style={{
      borderRadius: '26px',
      padding: '24px',
      minHeight: '180px',

      background: '#ffffff',

      border: '1px solid rgba(226,232,240,0.8)',

      boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
    }}
  >
    <div className="flex items-center justify-between mb-8">
      <div className="w-14 h-14 rounded-2xl bg-gray-200" />
      <div className="w-24 h-5 rounded-full bg-gray-100" />
    </div>

    <div className="w-20 h-10 rounded-lg bg-gray-200 mb-3" />

    <div className="w-32 h-4 rounded bg-gray-100" />
  </div>
);

// =====================================================
// DASHBOARD CARDS
// =====================================================

const DashboardCards = ({ stats = null, loading = false }) => {

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className="group relative overflow-hidden"
          style={{
            borderRadius: '28px',

            padding: '24px',

            minHeight: '185px',

            background: card.gradient,

            boxShadow: `0 18px 40px ${card.glow}`,

            transition: 'all 0.28s ease',

            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* top glow */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',

              width: '180px',
              height: '180px',

              borderRadius: '50%',

              background: 'rgba(255,255,255,0.08)',

              filter: 'blur(10px)',
            }}
          />

          {/* content */}
          <div className="relative z-10 flex flex-col h-full">

            {/* top */}
            <div className="flex items-start justify-between mb-8">

              <div
                style={{
                  width: '58px',
                  height: '58px',

                  borderRadius: '20px',

                  background: card.iconBg,

                  backdropFilter: 'blur(10px)',

                  border: '1px solid rgba(255,255,255,0.10)',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  color: '#ffffff',

                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                }}
              >
                {card.icon}
              </div>

              <div
                style={{
                  padding: '7px 12px',

                  borderRadius: '999px',

                  background: 'rgba(255,255,255,0.12)',

                  border: '1px solid rgba(255,255,255,0.12)',

                  color: card.labelColor,

                  fontSize: '11px',
                  fontWeight: '700',

                  letterSpacing: '0.08em',

                  textTransform: 'uppercase',

                  backdropFilter: 'blur(8px)',
                }}
              >
                {card.label}
              </div>
            </div>

            {/* value */}
            <div className="mt-auto">

              <div
                style={{
                  fontSize: '48px',
                  lineHeight: 1,

                  fontWeight: '800',

                  letterSpacing: '-0.04em',

                  color: card.valueColor,

                  marginBottom: '10px',
                }}
              >
                {card.getValue(stats)}
              </div>

              <div
                style={{
                  color: card.labelColor,

                  fontSize: '14px',

                  lineHeight: 1.5,

                  fontWeight: '500',
                }}
              >
                {card.sub}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;