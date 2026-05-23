import { Link } from 'react-router-dom';

const MapMarker = ({ report }) => {

  if (!report) return null;

  return (

    <div className="w-60">

      {/* Image */}
      {report.imageUrl && (

        <div
          className="h-32 rounded-lg
                     overflow-hidden mb-3"
        >

          <img
            src={report.imageUrl}
            alt="Pothole"
            className="w-full h-full object-cover"
          />

        </div>
      )}

      {/* Title */}
      <h3
        className="font-bold text-gray-800
                   text-sm mb-2"
      >
        Pothole Report
      </h3>

      {/* Address */}
      {(report.address || report.city) && (

        <p className="text-xs text-gray-500 mb-2">

          📍 {[report.address, report.city]
            .filter(Boolean)
            .join(', ')}

        </p>
      )}

      {/* Description */}
      {report.description && (

        <p
          className="text-sm text-gray-700
                     mb-3 line-clamp-3"
        >
          {report.description}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-2">

        <Link
          to={`/reports/${report.id}`}
          className="text-sm text-blue-600
                     font-medium hover:underline"
        >
          View Details →
        </Link>

        <a
          href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center
                     bg-blue-600 text-white text-sm
                     px-3 py-2 rounded-xl
                     hover:bg-blue-700 transition"
        >
          📍 Open in Google Maps
        </a>

      </div>

    </div>
  );
};

export default MapMarker;