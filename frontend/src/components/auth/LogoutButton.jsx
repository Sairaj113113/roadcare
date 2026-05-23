import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * LogoutButton — triggers logout and redirects to login page.
 *
 * Props:
 *   className   {string}  — override/extend button classes
 *   redirectTo  {string}  — where to navigate after logout (default: '/login')
 *   children    {node}    — button label (default: 'Logout')
 */
const LogoutButton = ({
  className = 'btn-secondary',
  redirectTo = '/login',
  children = 'Logout',
}) => {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(redirectTo, { replace: true });
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
};

export default LogoutButton;