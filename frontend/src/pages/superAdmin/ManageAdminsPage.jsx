import { useEffect, useState } from "react";

import Loader
  from "../../components/common/Loader";

import superAdminService
  from "../../services/superAdminService";

// =====================================================
// MANAGE ADMINS PAGE
// =====================================================

const ManageAdminsPage = () => {

  const [admins, setAdmins] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState({
      open: false,
      admin: null,
    });

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // =====================================================
  // FETCH ADMINS
  // =====================================================

  const fetchAdmins = async () => {

    try {

      const data =
        await superAdminService.getAdmins();

      setAdmins(data);

    } catch {

      setError(
        "Failed to load admins."
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // DELETE ADMIN
  // =====================================================

  const confirmDelete = (admin) => {

    setDeleteModal({
      open: true,
      admin,
    });
  };

  const closeDeleteModal = () => {

    setDeleteModal({
      open: false,
      admin: null,
    });
  };

  const handleDelete = async () => {

    if (!deleteModal.admin) return;

    setDeleteLoading(true);

    try {

      await superAdminService.deleteAdmin(
        deleteModal.admin.id
      );

      setAdmins((prev) =>
        prev.filter(
          (admin) =>
            admin.id !== deleteModal.admin.id
        )
      );

      closeDeleteModal();

    } catch {

      alert(
        "Failed to delete admin."
      );

    } finally {

      setDeleteLoading(false);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    fetchAdmins();

  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <Loader message="Loading admins..." />
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (

    <>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteModal.open && (

        <div
          className="
            fixed inset-0
            z-[999]
            flex items-center
            justify-center
            p-5
          "
        >

          {/* overlay */}

          <div
            onClick={closeDeleteModal}

            className="
              absolute inset-0
              bg-black/50
              backdrop-blur-sm
            "
          />

          {/* modal */}

          <div
            className="
              relative z-10
              w-full max-w-md
              rounded-[32px]
              bg-white
              p-8
              shadow-2xl
            "
          >

            {/* icon */}

            <div
              className="
                w-20 h-20
                rounded-[28px]
                flex items-center
                justify-center
                text-4xl
                mx-auto
              "
              style={{
                background:
                  "rgba(239,68,68,0.10)",
              }}
            >
              🗑️
            </div>

            {/* title */}

            <h2
              className="
                mt-6
                text-center
                text-3xl
                font-extrabold
                text-slate-900
              "
            >
              Delete Admin?
            </h2>

            {/* desc */}

            <p
              className="
                mt-4
                text-center
                text-slate-500
                leading-7
              "
            >
              You are about to remove
              {" "}
              <span className="font-bold text-slate-800">
                {deleteModal.admin?.name}
              </span>
              {" "}
              from the RoadCare
              platform.
            </p>

            <p
              className="
                mt-2
                text-center
                text-sm
                text-red-500
                font-semibold
              "
            >
              This action cannot be undone.
            </p>

            {/* actions */}

            <div
              className="
                mt-8
                flex items-center
                gap-4
              "
            >

              <button
                onClick={closeDeleteModal}

                className="
                  flex-1 h-14
                  rounded-2xl
                  border border-slate-200
                  font-bold
                  text-slate-700
                  hover:bg-slate-100
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}

                className="
                  flex-1 h-14
                  rounded-2xl
                  font-bold
                  text-white
                  transition-all
                  disabled:opacity-60
                "

                style={{
                  background:
                    `
                    linear-gradient(
                      135deg,
                      #DC2626 0%,
                      #EF4444 100%
                    )
                    `,
                }}
              >

                {deleteLoading
                  ? "Deleting..."
                  : "Delete"}

              </button>

            </div>

          </div>

        </div>
      )}

      <div className="space-y-8">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          style={{
            position: "relative",

            overflow: "hidden",

            borderRadius: "34px",

            padding: "36px",

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

          <div className="relative z-10">

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
              Admin Control Center
            </div>

            <h1
              style={{
                fontSize: "46px",

                lineHeight: 1.05,

                fontWeight: "800",

                color: "#ffffff",

                letterSpacing: "-0.05em",
              }}
            >
              Manage City Admins
            </h1>

            <p
              style={{
                marginTop: "16px",

                color:
                  "rgba(226,232,240,0.78)",

                fontSize: "17px",

                lineHeight: 1.7,

                maxWidth: "700px",
              }}
            >
              Monitor and manage all
              city-level RoadCare
              administrators from one
              centralized dashboard.
            </p>

          </div>

        </section>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (

          <div
            style={{
              padding: "16px 18px",

              borderRadius: "18px",

              background:
                "rgba(239,68,68,0.08)",

              border:
                "1px solid rgba(239,68,68,0.14)",

              color: "#DC2626",

              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div
          style={{
            background: "#ffffff",

            borderRadius: "30px",

            overflow: "hidden",

            border:
              "1px solid rgba(226,232,240,0.9)",

            boxShadow:
              "0 12px 40px rgba(15,23,42,0.06)",
          }}
        >

          <div
            style={{
              padding: "24px 28px",

              borderBottom:
                "1px solid rgba(226,232,240,0.9)",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >

            <div>

              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#0F172A",
                }}
              >
                City Administrators
              </div>

              <div
                style={{
                  marginTop: "6px",

                  fontSize: "14px",

                  color: "#64748B",
                }}
              >
                Total Admins:
                {" "}
                {admins.length}
              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  style={{
                    background: "#F8FAFC",
                  }}
                >

                  <th className="
                    text-left px-6 py-4
                    text-sm font-bold
                    text-slate-600
                  ">
                    Admin
                  </th>

                  <th className="
                    text-left px-6 py-4
                    text-sm font-bold
                    text-slate-600
                  ">
                    Email
                  </th>

                  <th className="
                    text-left px-6 py-4
                    text-sm font-bold
                    text-slate-600
                  ">
                    Assigned City
                  </th>

                  <th className="
                    text-right px-6 py-4
                    text-sm font-bold
                    text-slate-600
                  ">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {admins.map((admin) => (

                  <tr
                    key={admin.id}

                    className="
                      border-t
                      border-slate-100
                    "
                  >

                    <td className="px-6 py-5">

                      <div className="
                        flex items-center gap-4
                      ">

                        <div
                          className="
                            w-12 h-12 rounded-2xl
                            flex items-center
                            justify-center
                            text-white font-bold
                          "
                          style={{
                            background:
                              `
                              linear-gradient(
                                135deg,
                                #2563EB 0%,
                                #06B6D4 100%
                              )
                              `,
                          }}
                        >
                          {admin.name?.[0]}
                        </div>

                        <div>

                          <div className="
                            font-bold text-slate-900
                          ">
                            {admin.name}
                          </div>

                          <div className="
                            text-sm text-slate-500
                          ">
                            ADMIN
                          </div>

                        </div>

                      </div>

                    </td>

                    <td className="
                      px-6 py-5
                      text-slate-700
                    ">
                      {admin.email}
                    </td>

                    <td className="px-6 py-5">

                      <div
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          px-4 py-2
                          text-sm font-bold
                        "
                        style={{
                          background:
                            "rgba(37,99,235,0.10)",

                          color: "#2563EB",
                        }}
                      >
                        {admin.assignedCity}
                      </div>

                    </td>

                    <td className="
                      px-6 py-5
                      text-right
                    ">

                      <button
                        onClick={() =>
                          confirmDelete(admin)
                        }

                        className="
                          h-11 px-5
                          rounded-2xl
                          text-sm font-bold
                          transition-all
                        "

                        style={{
                          background:
                            "rgba(239,68,68,0.10)",

                          color: "#DC2626",
                        }}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </>
  );
};

export default ManageAdminsPage;