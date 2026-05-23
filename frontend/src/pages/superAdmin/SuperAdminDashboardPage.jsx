import { Link, Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import Loader from "../../components/common/Loader";

// =====================================================
// SUPER ADMIN DASHBOARD
// =====================================================

const SuperAdminDashboardPage = () => {

  const {
    currentUser,
    isAuthenticated,
    loading,
  } = useAuth();

  // =====================================================
  // REDIRECT
  // =====================================================

  if (!loading && !isAuthenticated) {

    return <Navigate to="/login" replace />;
  }

  if (loading) {

    return (
      <Loader message="Loading dashboard..." />
    );
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
          position: "relative",

          overflow: "hidden",

          borderRadius: "34px",

          padding: "34px",

          background:
            `
            linear-gradient(
              135deg,
              #020617 0%,
              #0F172A 45%,
              #1D4ED8 100%
            )
            `,

          boxShadow:
            "0 25px 60px rgba(15,23,42,0.16)",
        }}
      >

        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",

            width: "320px",
            height: "320px",

            borderRadius: "50%",

            background:
              "rgba(59,130,246,0.18)",

            filter: "blur(90px)",
          }}
        />

        {/* glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-100px",

            width: "260px",
            height: "260px",

            borderRadius: "50%",

            background:
              "rgba(6,182,212,0.16)",

            filter: "blur(90px)",
          }}
        />

        <div className="relative z-10">

          <div className="
            flex flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
          ">

            {/* LEFT */}
            <div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",

                  padding: "10px 16px",

                  borderRadius: "999px",

                  background:
                    "rgba(255,255,255,0.08)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  backdropFilter: "blur(10px)",

                  color:
                    "rgba(255,255,255,0.82)",

                  fontSize: "12px",
                  fontWeight: "700",

                  letterSpacing: "0.08em",

                  textTransform: "uppercase",

                  marginBottom: "20px",
                }}
              >
                Global RoadCare Control Center
              </div>

              <h1
                style={{
                  fontSize: "48px",
                  lineHeight: 1.05,

                  fontWeight: "800",

                  color: "#ffffff",

                  letterSpacing: "-0.05em",

                  maxWidth: "760px",
                }}
              >
                Welcome,
                {" "}
                <span
                  style={{
                    background:
                      `
                      linear-gradient(
                        135deg,
                        #60A5FA 0%,
                        #22D3EE 100%
                      )
                      `,

                    WebkitBackgroundClip: "text",

                    WebkitTextFillColor:
                      "transparent",
                  }}
                >
                  {currentUser?.name ||
                    "Super Admin"}
                </span>
              </h1>

              <p
                style={{
                  marginTop: "16px",

                  color:
                    "rgba(226,232,240,0.78)",

                  fontSize: "17px",

                  lineHeight: 1.7,

                  maxWidth: "720px",
                }}
              >
                Manage city admins, monitor
                nationwide pothole reports,
                and control RoadCare operations
                across all connected cities.
              </p>

            </div>

            {/* RIGHT */}
            <div
              style={{
                minWidth: "300px",

                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius: "28px",

                padding: "26px",

                backdropFilter: "blur(14px)",
              }}
            >

              <div
                style={{
                  color:
                    "rgba(226,232,240,0.7)",

                  fontSize: "12px",

                  fontWeight: "700",

                  letterSpacing: "0.08em",

                  textTransform: "uppercase",

                  marginBottom: "16px",
                }}
              >
                Platform Access Level
              </div>

              <div
                style={{
                  fontSize: "42px",

                  fontWeight: "800",

                  color: "#ffffff",

                  letterSpacing: "-0.05em",
                }}
              >
                SUPER ADMIN
              </div>

              <div
                style={{
                  marginTop: "14px",

                  color:
                    "rgba(226,232,240,0.72)",

                  fontSize: "14px",

                  lineHeight: 1.6,
                }}
              >
                Full platform control with
                access to all cities,
                reports, and administrators.
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section
        className="
          grid grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >

        {/* MANAGE ADMINS */}

        <Link
          to="/super-admin/admins"
          style={{
            position: "relative",

            overflow: "hidden",

            borderRadius: "30px",

            padding: "30px",

            textDecoration: "none",

            background:
              `
              linear-gradient(
                135deg,
                #2563EB 0%,
                #06B6D4 100%
              )
              `,

            boxShadow:
              "0 18px 40px rgba(37,99,235,0.22)",
          }}
        >

          <div className="relative z-10">

            <div
              style={{
                width: "74px",
                height: "74px",

                borderRadius: "24px",

                background:
                  "rgba(255,255,255,0.14)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: "34px",

                marginBottom: "24px",
              }}
            >
              👨‍💼
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: "#fff",
              }}
            >
              Manage Admins
            </div>

            <div
              style={{
                marginTop: "12px",

                color:
                  "rgba(255,255,255,0.82)",

                fontSize: "15px",

                lineHeight: 1.6,
              }}
            >
              View, manage and control
              city-level administrators
              across the platform.
            </div>

          </div>
        </Link>

        {/* CREATE ADMIN */}

        <Link
          to="/super-admin/create-admin"
          style={{
            position: "relative",

            overflow: "hidden",

            borderRadius: "30px",

            padding: "30px",

            textDecoration: "none",

            background:
              `
              linear-gradient(
                135deg,
                #059669 0%,
                #10B981 100%
              )
              `,

            boxShadow:
              "0 18px 40px rgba(16,185,129,0.22)",
          }}
        >

          <div className="relative z-10">

            <div
              style={{
                width: "74px",
                height: "74px",

                borderRadius: "24px",

                background:
                  "rgba(255,255,255,0.14)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: "34px",

                marginBottom: "24px",
              }}
            >
              ➕
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: "800",
                color: "#fff",
              }}
            >
              Create New Admin
            </div>

            <div
              style={{
                marginTop: "12px",

                color:
                  "rgba(255,255,255,0.82)",

                fontSize: "15px",

                lineHeight: 1.6,
              }}
            >
              Assign administrators to
              cities and expand RoadCare
              monitoring operations.
            </div>

          </div>
        </Link>

      </section>

    </div>
  );
};

export default SuperAdminDashboardPage;