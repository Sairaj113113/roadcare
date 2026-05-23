import { useEffect, useState } from "react";

import Loader from "../components/common/Loader";
import ReportList from "../components/report/ReportList";

import reportService from "../services/reportService";

const MyReportsPage = () => {

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= FETCH REPORTS =================

  useEffect(() => {

    const fetchReports = async () => {

      try {

        const data =
          await reportService.getMyReports();

        console.log("MY REPORTS:", data);

        setReports(data || []);

      } catch (err) {

        console.error(err);

        setError("Failed to load your reports.");

      } finally {

        setLoading(false);
      }
    };

    fetchReports();

  }, []);

  // ================= LOADING =================

  if (loading) {

    return (
      <Loader message="Loading your reports..." />
    );
  }

  // ================= COUNTS =================

  const pendingCount = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const resolvedCount = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  const progressCount = reports.filter(
    (r) => r.status === "IN_PROGRESS"
  ).length;

  // ================= UI =================

  return (

    <div className="space-y-8 pb-10">

      {/* ================= HERO ================= */}

      <section
        className="relative overflow-hidden
                   rounded-3xl
                   bg-gradient-to-r
                   from-indigo-700
                   via-blue-600
                   to-cyan-500
                   px-8 py-7
                   text-white
                   shadow-lg"
      >

        <div className="relative z-10">

          <div
            className="flex flex-col
                       lg:flex-row
                       lg:items-center
                       lg:justify-between
                       gap-6"
          >

            {/* LEFT */}
            <div className="max-w-2xl">

              <h1
                className="text-3xl
                           lg:text-4xl
                           font-extrabold
                           mb-3"
              >
                📋 My Reports
              </h1>

              <p
                className="text-blue-100
                           text-base
                           leading-relaxed"
              >
                Track all potholes you reported
                and monitor their repair status.
              </p>

            </div>

            {/* RIGHT STATS */}
            <div
              className="grid grid-cols-3
                         gap-3"
            >

              <div
                className="bg-white/10
                           backdrop-blur-md
                           rounded-2xl
                           px-5 py-4
                           text-center
                           min-w-[110px]"
              >

                <p className="text-xs text-blue-100">
                  Pending
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {pendingCount}
                </h3>

              </div>

              <div
                className="bg-white/10
                           backdrop-blur-md
                           rounded-2xl
                           px-5 py-4
                           text-center
                           min-w-[110px]"
              >

                <p className="text-xs text-blue-100">
                  Progress
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {progressCount}
                </h3>

              </div>

              <div
                className="bg-white/10
                           backdrop-blur-md
                           rounded-2xl
                           px-5 py-4
                           text-center
                           min-w-[110px]"
              >

                <p className="text-xs text-blue-100">
                  Resolved
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {resolvedCount}
                </h3>

              </div>

            </div>
          </div>
        </div>

        {/* Glow */}
        <div
          className="absolute
                     -top-20
                     -right-20
                     w-72 h-72
                     bg-cyan-300/20
                     rounded-full
                     blur-3xl"
        />

      </section>

      {/* ================= ERROR ================= */}

      {error && (

        <div
          className="
            bg-red-50
            border border-red-200
            text-red-700
            px-4 py-3
            rounded-2xl
            text-sm
          "
        >
          {error}
        </div>

      )}

      {/* ================= EMPTY ================= */}

      {!reports.length && !error ? (

        <div
          className="
            bg-white
            border border-gray-200
            rounded-3xl
            p-14
            text-center
            shadow-sm
          "
        >

          <div className="text-6xl mb-5">
            🛣️
          </div>

          <h2
            className="
              text-2xl
              font-bold
              text-gray-700
              mb-3
            "
          >
            No Reports Yet
          </h2>

          <p
            className="
              text-gray-500
              max-w-md
              mx-auto
            "
          >
            Start helping your community by
            reporting dangerous potholes nearby.
          </p>

        </div>

      ) : (

        <section
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border border-gray-100
            p-6
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              flex items-center
              justify-between
              mb-6
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-800
                "
              >
                Report History
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                View and manage your submitted
                pothole reports.
              </p>

            </div>

            <div
              className="
                px-4 py-2
                rounded-xl
                bg-blue-50
                text-blue-700
                text-sm
                font-semibold
              "
            >
              {reports.length} Reports
            </div>

          </div>

          <ReportList reports={reports} />

        </section>

      )}

    </div>
  );
};

export default MyReportsPage;