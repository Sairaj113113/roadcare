import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div
      className="min-h-[70vh] flex items-center
                 justify-center px-4"
    >

      <div
        className="max-w-lg w-full bg-white border
                   border-gray-200 rounded-3xl
                   p-10 text-center shadow-sm"
      >

        <div className="text-7xl mb-5">
          🚫
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-500 leading-relaxed mb-8">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center
                     px-6 py-3 rounded-xl bg-primary-600
                     hover:bg-primary-700 text-white
                     font-medium transition-colors"
        >
          ← Back Home
        </Link>

      </div>
    </div>
  );
};

export default UnauthorizedPage;