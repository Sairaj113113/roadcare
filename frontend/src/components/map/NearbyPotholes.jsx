import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import Loader from "../common/Loader";
import { formatDate } from "../../utils/dateUtils";

const NearbyPotholes = ({
  reports = [],
  loading = false,
  error = "",
  onSelect,
}) => {

  if (loading) {
    return (
      <Loader
        size="sm"
        message="Loading nearby potholes..."
      />
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200
                   text-red-700 px-4 py-3 rounded-xl text-sm"
      >
        {error}
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎉</div>

        <h3 className="text-2xl font-bold text-gray-700">
          No Nearby Potholes
        </h3>

        <p className="text-gray-500 mt-2">
          Roads around you look safe right now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Nearby Potholes
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Real-time reports near your location
          </p>
        </div>

        <div
          className="px-4 py-2 rounded-xl
                     bg-blue-50 text-blue-700
                     text-sm font-semibold"
        >
          {reports.length} Found
        </div>
      </div>

      {/* GRID */}
      <div
        className="grid grid-cols-1
                   lg:grid-cols-2
                   gap-5"
      >

        {reports.map((report, index) => (

          <button
            key={report.id}
            onClick={() => onSelect?.(report)}
            className="group bg-white border border-gray-200
                       rounded-3xl p-4 text-left
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-300"
          >

            <div className="flex gap-4">

              {/* IMAGE */}
              <div
                className="w-28 h-28 rounded-2xl
                           overflow-hidden bg-gray-100
                           flex-shrink-0"
              >
                {report.imageUrl ? (
                  <img
                    src={report.imageUrl}
                    alt={`Report ${index + 1}`}
                    className="w-full h-full object-cover
                               group-hover:scale-105
                               transition duration-300"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center
                               justify-center text-4xl"
                  >
                    🕳️
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">

                <div
                  className="flex items-start
                             justify-between gap-3"
                >

                  <div>

                    <h3
                      className="font-bold text-gray-800
                                 text-lg"
                    >
                      Pothole Report
                    </h3>

                    {(report.address || report.city) && (
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {[report.address, report.city]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>

                  <StatusBadge
                    status={report.status}
                    size="sm"
                  />
                </div>

                {report.description && (
                  <p
                    className="text-sm text-gray-600
                               leading-relaxed line-clamp-2
                               mt-3"
                  >
                    {report.description}
                  </p>
                )}

                <div
                  className="flex items-center
                             justify-between mt-5"
                >

                  <span className="text-xs text-gray-400">
                    {formatDate(report.createdAt)}
                  </span>

                  <Link
                    to={`/reports/${report.id}`}
                    className="text-sm font-semibold
                               text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Details →
                  </Link>

                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NearbyPotholes;