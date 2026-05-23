import { NavLink } from 'react-router-dom';

const LINKS = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: '📊',
  },
  {
    to: '/admin/reports',
    label: 'Reports',
    icon: '📋',
  },
  {
    to: '/map',
    label: 'Map',
    icon: '🗺️',
  },
];

const AdminSidebar = () => {
  return (
    <aside
      className="w-72 bg-gray-900 text-white
                 min-h-screen p-6 hidden lg:flex
                 flex-col"
    >

      {/* Brand */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          🚧 RoadCare
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">

        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl
               transition-all duration-200
               ${isActive
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
               }`
            }
          >
            <span className="text-lg">
              {link.icon}
            </span>

            <span className="font-medium">
              {link.label}
            </span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
};

export default AdminSidebar;