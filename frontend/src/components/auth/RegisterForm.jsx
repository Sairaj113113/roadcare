import { useState } from "react";

// =====================================================
// EYE ICONS
// =====================================================

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18"/>
  </svg>
);

// =====================================================
// FIELD — plain text / email
// =====================================================

const Field = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  loading,
}) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm text-gray-200">
      {label}
    </label>

    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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

    {error && (
      <p className="text-red-300 text-sm mt-2">{error}</p>
    )}
  </div>
);

// =====================================================
// PASSWORD FIELD — with show/hide toggle
// =====================================================

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  loading,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm text-gray-200">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-200
            transition-colors
          "
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {error && (
        <p className="text-red-300 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

// =====================================================
// REGISTER FORM
// =====================================================

const RegisterForm = ({
  onSubmit,
  loading = false,
  error = "",
}) => {

  const [form, setForm] = useState({
    name:     "",
    email:    "",
    password: "",
    confirm:  "",
  });

  const [errors, setErrors] = useState({});

  // =====================================================
  // SET FIELD
  // =====================================================

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // =====================================================
  // VALIDATE
  // =====================================================

  const validate = () => {

    const e = {};

    if (!form.name.trim()) {
      e.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      e.name = "Name must be at least 2 characters.";
    }

    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email.";
    }

    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }

    if (!form.confirm) {
      e.confirm = "Please confirm your password.";
    } else if (form.password !== form.confirm) {
      e.confirm = "Passwords do not match.";
    }

    return e;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!onSubmit) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    await onSubmit(
      form.name.trim(),
      form.email.trim().toLowerCase(),
      form.password
    );
  };

  return (

    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      <h2 className="text-2xl font-bold text-white text-center">
        Create Account
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

      {/* NAME */}

      <Field
        id="name"
        label="Full Name"
        value={form.name}
        onChange={set("name")}
        error={errors.name}
        placeholder="John Doe"
        autoComplete="name"
        loading={loading}
      />

      {/* EMAIL */}

      <Field
        id="email"
        label="Email Address"
        type="email"
        value={form.email}
        onChange={set("email")}
        error={errors.email}
        placeholder="you@example.com"
        autoComplete="email"
        loading={loading}
      />

      {/* PASSWORD */}

      <PasswordField
        id="password"
        label="Password"
        value={form.password}
        onChange={set("password")}
        error={errors.password}
        placeholder="Minimum 6 characters"
        autoComplete="new-password"
        loading={loading}
      />

      {/* CONFIRM PASSWORD */}

      <PasswordField
        id="confirm"
        label="Confirm Password"
        value={form.confirm}
        onChange={set("confirm")}
        error={errors.confirm}
        placeholder="Repeat password"
        autoComplete="new-password"
        loading={loading}
      />

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
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

    </form>
  );
};

export default RegisterForm;