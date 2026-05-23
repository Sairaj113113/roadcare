import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import AdminTable from '../../components/admin/AdminTable';
import ReportFilters from '../../components/admin/ReportFilters';

import adminService from '../../services/adminService';
import useAuth from '../../hooks/useAuth';

/**
 * AdminReportsPage
 *
 * City-scoped report management page.
 * Admin sees ONLY reports from assigned city.
 */
const AdminReportsPage = () => {

  const { currentUser } = useAuth();

  const [searchParams] = useSearchParams();

  const initialStatus =
    searchParams.get('status') || 'ALL';

  const [allReports, setAllReports] = useState([]);
  const [filtered, setFiltered]     = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const [status, setStatus] = useState(initialStatus);

  // ================= LOAD REPORTS =================

  useEffect(() => {

    adminService.getAllReports()

      .then((data) => {

        setAllReports(data);
        setFiltered(data);
      })

      .catch(() => {

        setError('Failed to load reports.');
      })

      .finally(() => {

        setLoading(false);
      });

  }, []);

  // ================= APPLY FILTERS =================

  useEffect(() => {

    if (loading) return;

    const applyFilters = async () => {

      try {

        const data = await adminService.filterReports({
          status
        });

        setFiltered(data);

      } catch {

        // fallback client-side filtering

        let result = allReports;

        if (status !== 'ALL') {

          result = result.filter(
            (r) => r.status === status
          );
        }

        setFiltered(result);
      }
    };

    const timer = setTimeout(applyFilters, 300);

    return () => clearTimeout(timer);

  }, [status, allReports, loading]);

  // ================= RESET =================

  const handleReset = useCallback(() => {

    setStatus('ALL');

  }, []);

  return (

    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between flex-wrap gap-3">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            City Reports
          </h1>

          <div className="flex items-center gap-3 flex-wrap mt-1">

            <p className="text-sm text-gray-500">

              {filtered.length} of {allReports.length}
              {' '}
              report{allReports.length !== 1 ? 's' : ''}

            </p>

            <div
              className="inline-flex items-center gap-2
                         bg-blue-50 text-blue-700
                         px-3 py-1 rounded-full
                         text-xs font-semibold"
            >
              📍 {currentUser?.assignedCity}
            </div>

          </div>

        </div>

      </div>

      {/* ================= ERROR ================= */}

      {error && (

        <div
          className="bg-red-50 border border-red-200
                     text-red-700 text-sm
                     px-4 py-3 rounded-lg"
        >
          {error}
        </div>
      )}

      {/* ================= FILTERS ================= */}

      <div className="card py-4">

        <ReportFilters
          status={status}
          onStatusChange={setStatus}
          onReset={handleReset}
          loading={loading}
        />

      </div>

      {/* ================= TABLE ================= */}

      <AdminTable
        reports={filtered}
        loading={loading}
      />

    </div>
  );
};

export default AdminReportsPage;