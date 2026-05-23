import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import StatusBadge from '../../components/report/StatusBadge';
import StatusUpdateForm from '../../components/admin/StatusUpdateForm';
import Loader from '../../components/common/Loader';

import adminService from '../../services/adminService';

import { formatDate } from '../../utils/dateUtils';

const AdminReportDetailsPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  const [updateError, setUpdateError] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  // ================= FETCH REPORT =================

  const fetchReport = useCallback(async () => {

    setLoading(true);

    try {

      const data = await adminService.getReportById(id);

      setReport(data);

    } catch (err) {

      setError(
        err.response?.status === 404
          ? 'Report not found.'
          : 'Failed to load report.'
      );

    } finally {

      setLoading(false);
    }

  }, [id]);

  useEffect(() => {

    fetchReport();

  }, [fetchReport]);

  // ================= UPDATE STATUS =================

  const handleStatusUpdate = async ({ status, remarks }) => {

    setUpdateLoading(true);

    setUpdateError('');

    try {

      const updated = await adminService.updateReportStatus(id, {
        status,
        remarks,
      });

      setReport(updated);

      setShowModal(false);

      setSuccessMsg(
        `Status updated to ${status.replace('_', ' ')}`
      );

      setTimeout(() => {

        setSuccessMsg('');

      }, 4000);

    } catch (err) {

      setUpdateError(
        err.response?.data?.message ||
        'Failed to update status.'
      );

    } finally {

      setUpdateLoading(false);
    }
  };

  // ================= LOADING =================

  if (loading) {

    return (
      <Loader message="Loading report..." />
    );
  }

  // ================= ERROR =================

  if (error) {

    return (

      <div className="text-center py-20">

        <div className="text-6xl mb-4">
          😕
        </div>

        <p className="text-red-600 mb-6">
          {error}
        </p>

        <button
          onClick={() => navigate('/admin/reports')}
          className="px-5 py-3 rounded-xl
                     bg-primary-600 text-white
                     hover:bg-primary-700
                     transition-colors"
        >
          ← Back to Reports
        </button>

      </div>
    );
  }

  // ================= DATA =================

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
  } = report;

  // ================= UI =================

  return (

    <div className="max-w-7xl mx-auto space-y-6">

      {/* ================= MODAL ================= */}

      {showModal && (

        <StatusUpdateForm
          currentStatus={status}
          reportId={id}
          onSubmit={handleStatusUpdate}
          onCancel={() => {

            setShowModal(false);

            setUpdateError('');
          }}
          loading={updateLoading}
          error={updateError}
        />
      )}

      {/* ================= TOP BAR ================= */}

      <div
        className="flex items-start justify-between
                   gap-4 flex-wrap"
      >

        <div>

          <button
            onClick={() => navigate('/admin/reports')}
            className="text-sm text-gray-500
                       hover:text-primary-600
                       transition-colors"
          >
            ← Back to Reports
          </button>

          <div className="flex items-center gap-3 mt-2 flex-wrap">

            <h1 className="text-3xl font-bold text-gray-900">
              Report #{id}
            </h1>

            <StatusBadge status={status} />

          </div>

          <p className="text-gray-500 mt-2">
            📍 {[address, city]
              .filter(Boolean)
              .join(', ')}
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl
                     bg-primary-600 text-white
                     hover:bg-primary-700
                     font-medium text-sm
                     shadow-sm transition-all"
        >
          ✏️ Update Status
        </button>

      </div>

      {/* ================= SUCCESS ================= */}

      {successMsg && (

        <div
          className="bg-emerald-50 border
                     border-emerald-200
                     text-emerald-700
                     px-4 py-3 rounded-2xl
                     text-sm"
        >
          ✅ {successMsg}
        </div>
      )}

      {/* ================= MAIN GRID ================= */}

      <div
        className="grid grid-cols-1
                   xl:grid-cols-3
                   gap-6"
      >

        {/* ===================================================== */}
        {/* LEFT SIDE */}
        {/* ===================================================== */}

        <div className="xl:col-span-2 space-y-6">

          {/* IMAGE */}

          {imageUrl && (

            <div
              className="bg-white rounded-3xl
                         overflow-hidden
                         shadow-sm border
                         border-gray-100"
            >

              <img
                src={imageUrl}
                alt={`Report ${id}`}
                className="w-full h-[420px]
                           object-cover"
              />

            </div>
          )}

          {/* DESCRIPTION */}

          {description && (

            <div
              className="bg-white rounded-3xl
                         shadow-sm border
                         border-gray-100 p-6"
            >

              <h2
                className="text-lg font-semibold
                           text-gray-900 mb-4"
              >
                Description
              </h2>

              <p
                className="text-gray-700
                           leading-relaxed"
              >
                {description}
              </p>

            </div>
          )}

          {/* LOCATION */}

          <div
            className="bg-white rounded-3xl
                       shadow-sm border
                       border-gray-100 p-6"
          >

            <h2
              className="text-lg font-semibold
                         text-gray-900 mb-4"
            >
              Location
            </h2>

            <p
              className="text-gray-800
                         font-medium"
            >
              📍 {[address, city]
                .filter(Boolean)
                .join(', ')}
            </p>

            {latitude && longitude && (

              <p
                className="text-sm text-gray-500
                           mt-2 font-mono"
              >
                {Number(latitude).toFixed(6)},
                {' '}
                {Number(longitude).toFixed(6)}
              </p>
            )}

            {latitude && longitude && (

              <a
                href={`https://maps.google.com/?q=${latitude},${longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center
                           gap-2 mt-5
                           px-5 py-3 rounded-2xl
                           bg-primary-600 text-white
                           hover:bg-primary-700
                           text-sm font-medium
                           transition-colors"
              >
                🗺 Open in Google Maps
              </a>
            )}

          </div>

        </div>

        {/* ===================================================== */}
        {/* RIGHT SIDE */}
        {/* ===================================================== */}

        <div className="space-y-5">

          {/* REPORTER */}

          <div
            className="bg-white rounded-3xl
                       shadow-sm border
                       border-gray-100 p-6"
          >

            <h2
              className="text-lg font-semibold
                         text-gray-900 mb-4"
            >
              Reporter
            </h2>

            <div className="flex items-center gap-4">

              <div
                className="w-14 h-14 rounded-full
                           bg-primary-100
                           flex items-center
                           justify-center
                           text-primary-700
                           font-bold text-xl"
              >
                {reporterName?.charAt(0)?.toUpperCase()}
              </div>

              <div>

                <p
                  className="font-semibold
                             text-gray-900"
                >
                  {reporterName}
                </p>

                <p
                  className="text-sm
                             text-gray-500"
                >
                  {reporterEmail}
                </p>

              </div>

            </div>

          </div>

          {/* STATUS */}

          <div
            className="bg-white rounded-3xl
                       shadow-sm border
                       border-gray-100 p-6"
          >

            <h2
              className="text-lg font-semibold
                         text-gray-900 mb-4"
            >
              Current Status
            </h2>

            <StatusBadge
              status={status}
              size="sm"
            />

          </div>

          {/* TIMELINE */}

          <div
            className="bg-white rounded-3xl
                       shadow-sm border
                       border-gray-100 p-6 space-y-5"
          >

            <div>

              <p
                className="text-xs uppercase
                           tracking-wide
                           text-gray-400
                           mb-1"
              >
                Submitted
              </p>

              <p className="font-medium text-gray-800">
                {formatDate(createdAt)}
              </p>

            </div>

            <div>

              <p
                className="text-xs uppercase
                           tracking-wide
                           text-gray-400
                           mb-1"
              >
                Last Updated
              </p>

              <p className="font-medium text-gray-800">
                {formatDate(updatedAt)}
              </p>

            </div>

          </div>

          {/* DUPLICATES */}

          {duplicateCount > 0 && (

            <div
              className="bg-amber-50 rounded-3xl
                         border border-amber-200
                         p-6"
            >

              <h2
                className="text-lg font-semibold
                           text-amber-800 mb-2"
              >
                Duplicate Reports
              </h2>

              <p
                className="text-3xl font-bold
                           text-amber-700"
              >
                {duplicateCount}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminReportDetailsPage;