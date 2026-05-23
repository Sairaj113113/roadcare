import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const links = [
  { to: '/',             label: 'Home',             icon: '🏠', end: true },
  { to: '/report',       label: 'Report Pothole',   icon: '📍', userOnly: true },
  { to: '/my-reports',   label: 'My Reports',       icon: '📋', userOnly: true },
  { to: '/map',          label: 'Map',              icon: '🗺️' },
  { to: '/nearby',       label: 'Nearby Potholes',  icon: '📡' },
  { to: '/notifications',label: 'Notifications',    icon: '🔔', userOnly: true },
  { to: '/profile',      label: 'Profile',          icon: '👤', authOnly: true },
];

/**
 * Sidebar — vertical nav for MainLayout.
 * Hidden on mobile; shown as drawer or fixed panel on desktop.
 *
 * Props:
 *   isOpen    {boolean}  — controls visibility
 *   onClose   {function} — callback to close sidebar
 */
const Sidebar = ({ isOpen = false, onClose }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'bg-primary-50 text-primary-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const visibleLinks = links.filter((link) => {
    if (link.userOnly && (!isAuthenticated || isAdmin)) return false;
    if (link.authOnly && !isAuthenticated) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-20 lg:hidden"
        onClick={onClose}
      />
      {/* Panel */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="font-bold text-primary-700 text-lg">🚧 RoadCare</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-500">✕</button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navLinkClass}
              onClick={onClose}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;