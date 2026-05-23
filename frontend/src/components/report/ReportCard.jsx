import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate, timeAgo } from '../../utils/dateUtils';

/**
 * ReportCard — compact card showing report summary.
 */

const ReportCard = (props) => {

  const {
    report,
    reportNumber,
    showUser = false,
  } = props;

  const {
    id,
    imageUrl,
    description,
    address,
    city,
    status,
    duplicateCount,
    createdAt,
    reporterName,
  } = report;

  return (

    <Link
      to={`/reports/${id}`}
      className="
        bg-white border border-gray-100
        rounded-2xl p-4
        flex gap-4
        hover:shadow-lg hover:border-primary-100
        transition-all duration-200
        group
      "
    >

      {/* ================= IMAGE ================= */}

      <div
        className="
          flex-shrink-0
          w-24 h-24 sm:w-28 sm:h-28
          rounded-xl overflow-hidden
          bg-gray-100
        "
      >

        {imageUrl ? (

          <img
            src={imageUrl}
            alt={`Report ${reportNumber ?? id}`}
            className="
              w-full h-full object-cover
              group-hover:scale-105
              transition-transform duration-200
            "
          />

        ) : (

          <div
            className="
              w-full h-full
              flex items-center justify-center
              text-3xl text-gray-300
            "
          >
            🕳️
          </div>

        )}

      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex-1 min-w-0">

        {/* ================= TOP ================= */}

        <div className="flex items-start justify-between gap-2 mb-2">

          <div>

            <p className="text-sm font-bold text-gray-800">
              Report #{reportNumber ?? id}
            </p>

            <p className="text-xs text-gray-400 mt-0.5">
              🕐 {createdAt ? timeAgo(createdAt) : 'Just now'}
            </p>

          </div>

          <StatusBadge
            status={status}
            size="sm"
          />

        </div>

        {/* ================= LOCATION ================= */}

        {(address || city) && (

          <p className="text-sm text-gray-600 truncate mb-2">

            📍 {[address, city]
              .filter(Boolean)
              .join(', ')}

          </p>

        )}

        {/* ================= DESCRIPTION ================= */}

        {description && (

          <p
            className="
              text-xs text-gray-500
              line-clamp-2 mb-3
            "
          >
            {description}
          </p>

        )}

        {/* ================= FOOTER ================= */}

        <div className="flex items-center gap-3 flex-wrap text-xs">

          <span className="text-gray-400">
            {createdAt ? formatDate(createdAt) : 'Recently'}
          </span>

          {duplicateCount > 0 && (

            <span
              className="
                text-amber-700 bg-amber-50
                px-2 py-1 rounded-full
                font-medium
              "
            >
              ⚠️ {duplicateCount}
              {' '}
              duplicate{duplicateCount > 1 ? 's' : ''}

            </span>

          )}

          {showUser && reporterName && (

            <span className="text-gray-500">

              👤 {reporterName}

            </span>

          )}

        </div>

      </div>

    </Link>

  );
};

export default ReportCard;