import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="text-8xl font-black text-gray-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link to="/"       className="btn-primary">Go Home</Link>
        <Link to="/map"    className="btn-secondary">View Map</Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;