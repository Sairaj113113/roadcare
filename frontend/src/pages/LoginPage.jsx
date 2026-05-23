import { useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";

/* FIREBASE */
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

/* BACKGROUND IMAGE */
import roadBg from "../assets/images/road-login.png";

const LoginPage = () => {

  const {
    login,
    isAuthenticated,
    user,
    loading: authLoading,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* GOOGLE MODAL */
  const [googleUser, setGoogleUser] = useState(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // =====================================================
  // REDIRECT (already authenticated)
  // =====================================================

  if (!authLoading && isAuthenticated) {

    let destination = "/";

    if (user?.role === "SUPER_ADMIN") {

      destination = "/super-admin/dashboard";

    } else if (user?.role === "ADMIN") {

      destination = "/admin/dashboard";

    } else {

      destination = location.state?.from || "/";
    }

    return <Navigate to={destination} replace />;
  }

  // =====================================================
  // HELPER — destination after login
  // =====================================================

  const getDestination = (role) => {

    if (role === "SUPER_ADMIN") {

      return "/super-admin/dashboard";
    }

    if (role === "ADMIN") {

      return "/admin/dashboard";
    }

    return location.state?.from || "/";
  };

  // =====================================================
  // NORMAL EMAIL / PASSWORD LOGIN
  // =====================================================

  const handleLogin = async (email, password) => {

    setLoading(true);
    setError("");

    try {

      const data = await authService.login(email, password);

      login(data.token, {
        userId: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
        assignedCity: data.assignedCity,
      });

      navigate(getDestination(data.role), { replace: true });

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        "Invalid email or password.";

      setError(msg);

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN — step 1: open popup & capture user info
  // =====================================================

  const handleGoogleLogin = async () => {

    if (loading) return;

    setLoading(true);
    setError("");

    try {

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      setGoogleUser({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      });

      setShowGoogleModal(true);

    } catch (err) {

      // User closed the popup — don't treat it as an error
      if (err.code === "auth/popup-closed-by-user") {

        setLoading(false);
        return;
      }

      console.error("Google popup error:", err);

      setError(
        "Google sign-in failed. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN — step 2: confirm & authenticate
  // =====================================================

  const continueGoogleLogin = async () => {

    if (!googleUser) return;

    setLoading(true);
    setError("");

    try {

      const data = await authService.googleLogin(
        googleUser.name,
        googleUser.email,
        googleUser.photoUrl
      );

      login(data.token, {
        userId: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
        assignedCity: data.assignedCity,
      });

      navigate(getDestination(data.role), { replace: true });

    } catch (err) {

      console.error(
        "Google login backend error:",
        err
      );

      const msg =
        err.response?.data?.message ||
        "Google sign-in failed. Please try again.";

      setError(msg);

    } finally {

      setLoading(false);
      setShowGoogleModal(false);
    }
  };

  const handleCancelGoogleModal = () => {

    setShowGoogleModal(false);
    setGoogleUser(null);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="
      relative min-h-screen
      flex items-center justify-center
      overflow-hidden px-4
    ">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <img
        src={roadBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* GLOWS */}
      <div className="
        absolute top-[-120px] left-[-120px]
        w-[350px] h-[350px]
        rounded-full bg-blue-500/20
        blur-3xl animate-pulse
      "/>

      <div className="
        absolute bottom-[-120px] right-[-120px]
        w-[350px] h-[350px]
        rounded-full bg-cyan-400/20
        blur-3xl animate-pulse
      "/>

      {/* =====================================================
          CARD
      ===================================================== */}

      <div className="relative z-10 w-full max-w-md">

        <div className="
          backdrop-blur-2xl bg-white/8
          border border-white/10
          shadow-2xl rounded-[32px]
          p-8 text-white
        ">

          {/* TOP */}
          <div className="text-center mb-8">

            <div className="
              w-20 h-20 mx-auto rounded-3xl
              bg-gradient-to-br from-blue-600 to-cyan-500
              flex items-center justify-center
              shadow-lg shadow-cyan-500/30 mb-5
            ">
              <span className="text-4xl">🚧</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Welcome Back
            </h1>

            <p className="text-gray-200 text-sm">
              Sign in to continue to RoadCare.
            </p>

          </div>

          {/* LOGIN FORM */}
          <LoginForm
            onSubmit={handleLogin}
            onGoogleLogin={handleGoogleLogin}
            loading={loading}
            error={error}
            title="Sign In"
          />

          {/* REGISTER LINK */}
          <p className="text-center text-sm text-gray-300 mt-6">

            Don&apos;t have an account?{" "}

            <Link
              to="/register"
              className="
                text-cyan-300
                font-semibold
                hover:text-cyan-200
                transition
              "
            >
              Create one
            </Link>

          </p>

        </div>
      </div>

      {/* =====================================================
          GOOGLE CONFIRM MODAL
      ===================================================== */}

      {showGoogleModal && googleUser && (

        <div className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/70 backdrop-blur-md px-4
        ">

          <div className="
            w-full max-w-sm
            rounded-3xl bg-[#111827]
            border border-white/10
            p-8 text-center shadow-2xl
          ">

            {/* AVATAR */}
            {googleUser.photoUrl ? (

              <img
                src={googleUser.photoUrl}
                alt="Profile"
                className="
                  w-24 h-24 rounded-full mx-auto
                  border-4 border-cyan-400
                  shadow-lg shadow-cyan-500/30 mb-5
                "
              />

            ) : (

              <div className="
                w-24 h-24 rounded-full mx-auto
                border-4 border-cyan-400
                bg-gradient-to-br from-blue-600 to-cyan-500
                flex items-center justify-center
                text-4xl font-bold text-white
                shadow-lg shadow-cyan-500/30 mb-5
              ">
                {googleUser.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}

            <h2 className="text-2xl font-black text-white mb-2">
              Continue as
            </h2>

            <p className="text-cyan-300 text-lg font-semibold mb-1">
              {googleUser.name}
            </p>

            <p className="text-gray-400 text-sm mb-6">
              {googleUser.email}
            </p>

            {/* CONTINUE BUTTON */}
            <button
              type="button"
              onClick={continueGoogleLogin}
              disabled={loading}
              className="
                w-full h-14 rounded-2xl
                font-bold text-white
                bg-gradient-to-r from-blue-600 to-cyan-500
                hover:scale-[1.02]
                transition-all duration-300
                shadow-lg shadow-cyan-500/30
                mb-3
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >

              {loading ? (

                <span className="
                  flex items-center justify-center gap-2
                ">
                  <svg
                    className="animate-spin w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>

                  Signing In...
                </span>

              ) : (

                "Continue"
              )}

            </button>

            {/* CANCEL BUTTON */}
            <button
              type="button"
              onClick={handleCancelGoogleModal}
              disabled={loading}
              className="
                w-full h-12 rounded-2xl
                bg-white/10 text-gray-300
                hover:bg-white/20 transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

          </div>
        </div>

      )}

    </div>
  );
};

export default LoginPage;