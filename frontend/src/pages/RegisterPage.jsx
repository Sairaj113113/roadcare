import { useState } from "react";

import {
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

import RegisterForm
from "../components/auth/RegisterForm";

import authService
from "../services/authService";

import useAuth
from "../hooks/useAuth";

/* FIREBASE */

import {
  auth,
  googleProvider
} from "../firebase";

import {
  signInWithPopup
} from "firebase/auth";

/* BACKGROUND */

import roadBg
from "../assets/images/road-login.png";

const RegisterPage = () => {

  const {
    login,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const navigate =
    useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // OTP FLOW

  const [showOtpModal, setShowOtpModal] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [otpLoading, setOtpLoading] =
    useState(false);

  const [otpError, setOtpError] =
    useState("");

  const [pendingUser, setPendingUser] =
    useState(null);

  /* GOOGLE MODAL */

  const [googleUser, setGoogleUser] =
    useState(null);

  const [showGoogleModal, setShowGoogleModal] =
    useState(false);

  // =====================================================
  // REDIRECT
  // =====================================================

  if (
    !authLoading &&
    isAuthenticated
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // =====================================================
  // NORMAL REGISTER
  // =====================================================

  const handleRegister = async (
    name,
    email,
    password
  ) => {

    setLoading(true);

    setError("");

    try {

      // save temporarily

      setPendingUser({
        name,
        email,
        password,
      });

      // send otp

      await authService.sendOtp(
        email
      );

      // open modal

      setShowOtpModal(true);

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        "Failed to send OTP.";

      setError(msg);

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOtp =
    async () => {

    if (!pendingUser) return;

    setOtpLoading(true);

    setOtpError("");

    try {

      // verify otp

      await authService.verifyOtp(
        pendingUser.email,
        otp
      );

      // register finally

      const data =
        await authService.register(
          pendingUser.name,
          pendingUser.email,
          pendingUser.password
        );

      // login

      login(data.token, {

        userId:
          data.userId,

        name:
          data.name,

        email:
          data.email,

        role:
          data.role,
      });

      // cleanup

      setShowOtpModal(false);

      setPendingUser(null);

      setOtp("");

      // redirect

      navigate(
        "/my-reports",
        {
          replace: true,
        }
      );

    } catch (err) {

      const msg =
        err.response?.data?.message ||
        "OTP verification failed.";

      setOtpError(msg);

    } finally {

      setOtpLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOtp =
    async () => {

    if (!pendingUser) return;

    try {

      await authService.sendOtp(
        pendingUser.email
      );

      alert(
        "OTP resent successfully."
      );

    } catch {

      alert(
        "Failed to resend OTP."
      );
    }
  };

  // =====================================================
  // GOOGLE REGISTER
  // =====================================================

  const handleGoogleRegister =
    async () => {

    if (loading) return;

    setLoading(true);

    setError("");

    try {

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      const user =
        result.user;

      setGoogleUser({

        name:
          user.displayName,

        email:
          user.email,

        photoUrl:
          user.photoURL,
      });

      setShowGoogleModal(true);

    } catch (err) {

      if (
        err.code ===
        "auth/popup-closed-by-user"
      ) {

        setLoading(false);

        return;
      }

      console.error(
        "Google popup error:",
        err
      );

      setError(
        "Google sign-up failed."
      );

    } finally {

      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE CONTINUE
  // =====================================================

  const continueGoogleSignup =
    async () => {

    if (!googleUser) return;

    setLoading(true);

    setError("");

    try {

      const data =
        await authService.googleLogin(

          googleUser.name,

          googleUser.email,

          googleUser.photoUrl
        );

      login(data.token, {

        userId:
          data.userId,

        name:
          data.name,

        email:
          data.email,

        role:
          data.role,
      });

      navigate(
        "/my-reports",
        {
          replace: true,
        }
      );

    } catch (err) {

      const msg =
        err.response?.data?.message ||

        "Google sign-up failed.";

      setError(msg);

    } finally {

      setLoading(false);

      setShowGoogleModal(false);
    }
  };

  const handleCancelGoogleModal =
    () => {

    setShowGoogleModal(false);

    setGoogleUser(null);
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="
      relative min-h-screen
      flex items-center
      justify-center
      overflow-hidden px-4
    ">

      {/* BACKGROUND */}

      <img
        src={roadBg}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0
          w-full h-full
          object-cover
        "
      />

      <div className="
        absolute inset-0
        bg-black/70
      " />

      {/* GLOWS */}

      <div className="
        absolute top-[-120px]
        left-[-120px]
        w-[350px] h-[350px]
        rounded-full
        bg-blue-500/20
        blur-3xl animate-pulse
      "/>

      <div className="
        absolute bottom-[-120px]
        right-[-120px]
        w-[350px] h-[350px]
        rounded-full
        bg-cyan-400/20
        blur-3xl animate-pulse
      "/>

      {/* CARD */}

      <div className="
        relative z-10
        w-full max-w-md
      ">

        <div className="
          backdrop-blur-2xl
          bg-white/8
          border border-white/10
          shadow-2xl
          rounded-[32px]
          p-8 text-white
        ">

          {/* TOP */}

          <div className="
            text-center mb-8
          ">

            <div className="
              w-20 h-20 mx-auto
              rounded-3xl
              bg-gradient-to-br
              from-blue-600
              to-cyan-500
              flex items-center
              justify-center
              shadow-lg
              shadow-cyan-500/30
              mb-5
            ">
              <span className="text-4xl">
                🚧
              </span>
            </div>

            <h1 className="
              text-3xl lg:text-4xl
              font-black text-white mb-3
            ">
              Create Account
            </h1>

            <p className="
              text-gray-200 text-sm
            ">
              Join RoadCare and help
              improve road safety.
            </p>

          </div>

          {/* GOOGLE */}

          <button
            type="button"

            onClick={
              handleGoogleRegister
            }

            disabled={loading}

            className="
              w-full h-14
              rounded-2xl
              bg-white text-gray-800
              font-semibold
              flex items-center
              justify-center gap-3
              hover:scale-[1.02]
              transition-all duration-300
              shadow-lg mb-5
            "
          >

            Continue with Google

          </button>

          {/* DIVIDER */}

          <div className="
            flex items-center
            gap-3 mb-5
          ">

            <div className="
              flex-1 h-px
              bg-white/20
            "/>

            <span className="
              text-xs text-gray-300
            ">
              OR
            </span>

            <div className="
              flex-1 h-px
              bg-white/20
            "/>

          </div>

          {/* REGISTER FORM */}

          <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
            error={error}
          />

          {/* LOGIN */}

          <p className="
            text-center text-sm
            text-gray-300 mt-6
          ">

            Already have an account?
            {" "}

            <Link
              to="/login"

              className="
                text-cyan-300
                font-semibold
              "
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

      {/* =====================================================
          OTP MODAL
      ===================================================== */}

      {showOtpModal && (

        <div className="
          fixed inset-0 z-50
          flex items-center
          justify-center
          bg-black/70
          backdrop-blur-md
          px-4
        ">

          <div className="
            w-full max-w-md
            rounded-3xl
            bg-[#111827]
            border border-white/10
            p-8
            shadow-2xl
          ">

            <div className="text-center">

              <div className="
                text-5xl mb-4
              ">
                📩
              </div>

              <h2 className="
                text-3xl font-black
                text-white
              ">
                Verify Email
              </h2>

              <p className="
                text-gray-400
                mt-3 leading-7
              ">
                Enter the OTP sent to
                <br />

                <span className="
                  text-cyan-300
                  font-semibold
                ">
                  {pendingUser?.email}
                </span>

              </p>

            </div>

            {/* OTP */}

            <input
              type="text"

              value={otp}

              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }

              placeholder="Enter OTP"

              className="
                mt-8
                w-full h-14
                rounded-2xl px-4
                bg-white/10
                border border-white/20
                text-center
                text-2xl
                tracking-[10px]
                text-white
                outline-none
                focus:border-cyan-400
              "
            />

            {/* ERROR */}

            {otpError && (

              <div className="
                mt-4 text-sm
                text-red-300
                text-center
              ">
                {otpError}
              </div>
            )}

            {/* VERIFY BUTTON */}

            <button
              onClick={
                handleVerifyOtp
              }

              disabled={otpLoading}

              className="
                mt-6
                w-full h-14
                rounded-2xl
                font-bold text-white
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
              "
            >

              {otpLoading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

            {/* RESEND */}

            <button
              onClick={
                handleResendOtp
              }

              className="
                mt-4
                w-full h-12
                rounded-2xl
                bg-white/10
                text-gray-300
              "
            >
              Resend OTP
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          GOOGLE MODAL
      ===================================================== */}

      {showGoogleModal &&
      googleUser && (

        <div className="
          fixed inset-0 z-50
          flex items-center
          justify-center
          bg-black/70
          backdrop-blur-md px-4
        ">

          <div className="
            w-full max-w-sm
            rounded-3xl
            bg-[#111827]
            border border-white/10
            p-8 text-center
          ">

            <h2 className="
              text-2xl font-black
              text-white mb-2
            ">
              Continue as
            </h2>

            <p className="
              text-cyan-300
              text-lg font-semibold
            ">
              {googleUser.name}
            </p>

            <p className="
              text-gray-400
              text-sm mb-6
            ">
              {googleUser.email}
            </p>

            <button
              onClick={
                continueGoogleSignup
              }

              className="
                w-full h-14
                rounded-2xl
                font-bold text-white
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                mb-3
              "
            >
              Continue
            </button>

            <button
              onClick={
                handleCancelGoogleModal
              }

              className="
                w-full h-12
                rounded-2xl
                bg-white/10
                text-gray-300
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

export default RegisterPage;