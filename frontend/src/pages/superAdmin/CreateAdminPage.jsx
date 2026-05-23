import { useState } from "react";

import superAdminService
  from "../../services/superAdminService";

// =====================================================
// CREATE ADMIN PAGE
// =====================================================

const CreateAdminPage = () => {

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

    assignedCity: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setSuccess("");

    setError("");

    try {

      await superAdminService.createAdmin(
        formData
      );

      setSuccess(
        "Admin created successfully."
      );

      setFormData({

        name: "",

        email: "",

        password: "",

        assignedCity: "",
      });

    } catch (err) {

      const msg =
        err.response?.data?.message ||

        err.response?.data ||

        "Failed to create admin.";

      setError(msg);

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="max-w-3xl mx-auto">

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
              #0F172A 0%,
              #111827 45%,
              #1D4ED8 100%
            )
            `,

          boxShadow:
            "0 25px 60px rgba(15,23,42,0.16)",

          marginBottom: "28px",
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
            Admin Management
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
            Create City Admin
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
            Assign new administrators
            to cities and expand
            RoadCare monitoring
            operations.
          </p>

        </div>

      </section>

      {/* =====================================================
          FORM CARD
      ===================================================== */}

      <div
        style={{
          background: "#ffffff",

          borderRadius: "30px",

          padding: "34px",

          border:
            "1px solid rgba(226,232,240,0.9)",

          boxShadow:
            "0 12px 40px rgba(15,23,42,0.06)",
        }}
      >

        {/* SUCCESS */}

        {success && (

          <div
            style={{
              padding: "16px 18px",

              borderRadius: "18px",

              background:
                "rgba(34,197,94,0.08)",

              border:
                "1px solid rgba(34,197,94,0.14)",

              color: "#15803D",

              fontSize: "14px",
              fontWeight: "600",

              marginBottom: "24px",
            }}
          >
            {success}
          </div>
        )}

        {/* ERROR */}

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

              marginBottom: "24px",
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NAME */}

          <div>

            <label
              className="
                block mb-2
                text-sm font-semibold
                text-slate-700
              "
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required

              placeholder="Enter admin name"

              className="
                w-full h-14
                rounded-2xl
                border border-slate-200
                px-5 outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

          {/* EMAIL */}

          <div>

            <label
              className="
                block mb-2
                text-sm font-semibold
                text-slate-700
              "
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required

              placeholder="Enter email"

              className="
                w-full h-14
                rounded-2xl
                border border-slate-200
                px-5 outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              className="
                block mb-2
                text-sm font-semibold
                text-slate-700
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required

              placeholder="Enter password"

              className="
                w-full h-14
                rounded-2xl
                border border-slate-200
                px-5 outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

          {/* CITY */}

          <div>

            <label
              className="
                block mb-2
                text-sm font-semibold
                text-slate-700
              "
            >
              Assigned City
            </label>

            <input
              type="text"
              name="assignedCity"
              value={formData.assignedCity}
              onChange={handleChange}
              required

              placeholder="Example: Hyderabad"

              className="
                w-full h-14
                rounded-2xl
                border border-slate-200
                px-5 outline-none
                focus:border-blue-500
                transition
              "
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}

            className="
              w-full h-14
              rounded-2xl
              text-white font-bold
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              hover:scale-[1.01]
              transition-all duration-300
              shadow-lg shadow-cyan-500/20
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:scale-100
            "
          >

            {loading
              ? "Creating Admin..."
              : "Create Admin"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateAdminPage;