import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/report/StatusBadge';
import Loader from '../components/common/Loader';
import reportService from '../services/reportService';
import { formatDate } from '../utils/dateUtils';

/**
 * ReportDetailsPage — full detail view for a single pothole report.
 * Accessible to the owner and admins.
 */
const ReportDetailsPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {

    const fetch = async () => {

      try {

        const data =
          await reportService.getReportById(id);

        setReport(data);

      } catch (err) {

        if (err.response?.status === 404) {

          setError('Report not found.');

        } else {

          setError(
            err.response?.data?.message
            || 'Failed to load report details.'
          );
        }

      } finally {

        setLoading(false);
      }
    };

    fetch();

  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <Loader message="Loading report…" />
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (

      <div className="page-container max-w-2xl text-center py-16">

        <span className="text-5xl">😕</span>

        <p className="text-red-600 mt-4 mb-6">
          {error}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="btn-secondary"
        >
          ← Go Back
        </button>

      </div>
    );
  }

  // =========================================================
  // REPORT DATA
  // =========================================================

  const {

    imageUrl,
    description,
    address,
    city,

    latitude,
    longitude,

    status,
    duplicateCount,

    reporterName,
    reporterEmail,

    createdAt,
    updatedAt,

    // =====================================================
    // AI FIELDS
    // =====================================================

    aiSeverity,
    aiConfidence,
    aiDescription,
    aiRecommendedAction,

  } = report;

  // =========================================================
  // AI BADGE COLORS
  // =========================================================

  const severityStyles = {

    HIGH:
      'bg-red-100 text-red-700 border border-red-200',

    MEDIUM:
      'bg-yellow-100 text-yellow-700 border border-yellow-200',

    LOW:
      'bg-green-100 text-green-700 border border-green-200',
  };

  return (

    <div className="page-container max-w-2xl">

      {/* =====================================================
          BACK BUTTON
      ====================================================== */}

      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-1
          text-sm text-gray-500
          hover:text-gray-800
          mb-6
          transition-colors
        "
      >
        ← Back
      </button>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Report #{id}
        </h1>

        <StatusBadge status={status} />

      </div>

      {/* =====================================================
          IMAGE
      ====================================================== */}

      {imageUrl && (

        <div className="
          rounded-xl overflow-hidden
          mb-6
          max-h-72
          bg-gray-100
        ">

          <img
            src={imageUrl}
            alt={`Pothole report #${id}`}
            className="w-full h-full object-cover"
          />

        </div>
      )}

      {/* =====================================================
          DETAILS CARD
      ====================================================== */}

      <div className="card space-y-5 mb-6">

        {/* ===================================================
            AI SEVERITY
        ==================================================== */}

        {aiSeverity && (

          <div>

            <p className="
              text-xs font-semibold text-gray-400
              uppercase tracking-wide mb-2
            ">
              AI Road Risk Analysis
            </p>

            <div className="flex items-center gap-3 flex-wrap">

              <span
                className={`
                  px-3 py-1 rounded-full
                  text-sm font-semibold
                  ${severityStyles[aiSeverity] || ''}
                `}
              >
                {aiSeverity === 'HIGH' && '🔴'}
                {aiSeverity === 'MEDIUM' && '🟡'}
                {aiSeverity === 'LOW' && '🟢'}

                {' '}
                {aiSeverity} SEVERITY
              </span>

              {aiConfidence && (

                <span className="
                  text-sm text-gray-500
                ">
                  Confidence:
                  {' '}
                  {Math.round(aiConfidence)}%
                </span>
              )}

            </div>

          </div>
        )}

        {/* ===================================================
            LOCATION
        ==================================================== */}

        <div>

          <p className="
            text-xs font-semibold text-gray-400
            uppercase tracking-wide mb-1
          ">
            Location
          </p>

          <p className="text-sm text-gray-700">

            📍 {[
              address,
              city
            ].filter(Boolean).join(', ')
              || 'No address provided'}

          </p>

          {latitude && longitude && (

            <div className="flex items-center gap-3 mt-1">

              <p className="
                text-xs text-gray-400 font-mono
              ">
                {Number(latitude).toFixed(6)},
                {' '}
                {Number(longitude).toFixed(6)}
              </p>

              <Link
                to={`/map`}
                className="
                  text-xs text-primary-600
                  hover:underline font-medium
                "
              >
                🗺️ View on Map
              </Link>

            </div>
          )}

        </div>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        {description && (

          <div>

            <p className="
              text-xs font-semibold text-gray-400
              uppercase tracking-wide mb-1
            ">
              Description
            </p>

            <p className="
              text-sm text-gray-700 leading-relaxed
            ">
              {description}
            </p>

          </div>
        )}

        {/* ===================================================
            METADATA
        ==================================================== */}

        <div className="
          grid grid-cols-2 gap-4
          pt-2 border-t border-gray-100
        ">

          <div>

            <p className="
              text-xs font-semibold text-gray-400
              uppercase tracking-wide mb-1
            ">
              Submitted
            </p>

            <p className="text-sm text-gray-700">
              {formatDate(createdAt)}
            </p>

          </div>

          <div>

            <p className="
              text-xs font-semibold text-gray-400
              uppercase tracking-wide mb-1
            ">
              Last Updated
            </p>

            <p className="text-sm text-gray-700">
              {formatDate(updatedAt)}
            </p>

          </div>

          {duplicateCount > 0 && (

            <div>

              <p className="
                text-xs font-semibold text-gray-400
                uppercase tracking-wide mb-1
              ">
                Duplicates
              </p>

              <p className="
                text-sm text-amber-600 font-medium
              ">
                ⚠️ {duplicateCount}
                {' '}
                duplicate report
                {duplicateCount > 1 ? 's' : ''}
              </p>

            </div>
          )}

          <div>

            <p className="
              text-xs font-semibold text-gray-400
              uppercase tracking-wide mb-1
            ">
              Reporter
            </p>

            <p className="text-sm text-gray-700">
              {reporterName}
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div className="flex gap-3">

        <Link
          to="/my-reports"
          className="
            btn-secondary flex-1 justify-center
          "
        >
          ← My Reports
        </Link>

        <Link
          to="/report"
          className="
            btn-primary flex-1 justify-center
          "
        >
          + New Report
        </Link>

      </div>

    </div>
  );
};

export default ReportDetailsPage;