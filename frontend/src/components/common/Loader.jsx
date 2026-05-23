/**
 * Loader — full-page or inline loading spinner.
 *
 * Props:
 *   fullPage  {boolean} — center on full viewport (default: false)
 *   message   {string}  — optional message below spinner
 *   size      {string}  — 'sm' | 'md' | 'lg' (default: 'md')
 */
const Loader = ({ fullPage = false, message = '', size = 'md' }) => {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-primary-200 border-t-primary-600 animate-spin`}
      />
      {message && (
        <p className="text-sm text-gray-500">{message}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
};

export default Loader;