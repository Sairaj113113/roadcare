import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚧</span>
          <span className="font-semibold text-primary-700">RoadCare</span>
          <span className="text-gray-400 text-sm ml-2">Smart Pothole Reporting</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
          <Link to="/map"   className="hover:text-primary-600 transition-colors">Map</Link>
          <span>© {new Date().getFullYear()} RoadCare</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;