import { useState } from "react";

const LoginForm = ({
  onSubmit,
  onGoogleLogin,
  loading = false,
  error = "",
  title = "Sign In",
}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // ================= VALIDATE =================

  const validate = () => {

    const e = {};

    if (!email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Enter a valid email.";
    }

    if (!password) {
      e.password = "Password is required.";
    }

    return e;
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!onSubmit) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    await onSubmit(email.trim().toLowerCase(), password);
  };

  return (

    <div className="space-y-6">

      {/* ================= GOOGLE BUTTON ================= */}

      <button
        type="button"
        onClick={onGoogleLogin}
        disabled={loading}
        className="
          w-full h-14
          rounded-2xl
          bg-white
          text-gray-800
          font-semibold
          flex items-center
          justify-center
          gap-3
          hover:scale-[1.02]
          transition-all
          duration-300
          shadow-lg
          disabled:opacity-60
          disabled:cursor-not-allowed
          disabled:hover:scale-100
        "
      >

        {/* GOOGLE ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-6 h-6"
        >
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
          <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5.2C29.1 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 7.1l6.1 5.2C39.9 36.7 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"/>
        </svg>

        Continue with Google

      </button>

      {/* ================= DIVIDER ================= */}

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-sm text-gray-300">OR</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      {/* ================= FORM ================= */}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">

        <h2 className="text-2xl font-bold text-white text-center">
          {title}
        </h2>

        {/* SERVER ERROR */}

        {error && (
          <div className="
            bg-red-500/10
            border border-red-400/30
            text-red-200
            text-sm
            px-4 py-3
            rounded-2xl
          ">
            {error}
          </div>
        )}

        {/* EMAIL */}

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-200"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="
              w-full h-14
              rounded-2xl px-4
              bg-white/10
              border border-white/20
              text-white
              placeholder:text-gray-400
              outline-none
              backdrop-blur-md
              focus:border-cyan-400
              focus:ring-4
              focus:ring-cyan-400/20
              transition-all
              disabled:opacity-60
            "
          />

          {errors.email && (
            <p className="text-red-300 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-200"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className="
                w-full h-14
                rounded-2xl px-4 pr-12
                bg-white/10
                border border-white/20
                text-white
                placeholder:text-gray-400
                outline-none
                backdrop-blur-md
                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-400/20
                transition-all
                disabled:opacity-60
              "
            />

            {/* SHOW / HIDE PASSWORD TOGGLE */}
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-200
                transition-colors
              "
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye-off icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.485A3 3 0 0013.5 13.5m-3.023-3.015A3 3 0 0112 9a3 3 0 013 3m0 0a3 3 0 01-.477 1.585M4.5 4.5C3 6 2 8 2 12c0 5 4.477 9 10 9a9.95 9.95 0 005.5-1.5M6.5 6.5C4.8 7.8 3.5 9.8 3.5 12c0 4.142 3.806 7.5 8.5 7.5"/>
                </svg>
              ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-300 text-sm mt-2">{errors.password}</p>
          )}
        </div>

        {/* FORGOT PASSWORD */}

        <div className="text-right -mt-2">
          <button
            type="button"
            className="text-sm text-cyan-300 hover:text-cyan-200 transition"
            onClick={() => {/* hook up forgot password here */}}
          >
            Forgot password?
          </button>
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full h-14
            rounded-2xl
            font-bold text-white
            bg-gradient-to-r from-blue-600 to-cyan-500
            hover:scale-[1.02]
            transition-all duration-300
            shadow-lg shadow-cyan-500/30
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Signing In...
            </span>
          ) : (
            title
          )}
        </button>

      </form>

    </div>
  );
};

export default LoginForm;