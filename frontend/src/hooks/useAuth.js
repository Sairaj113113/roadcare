import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * useAuth — convenience hook for consuming AuthContext.
 *
 * Usage:
 *   const { currentUser, isAuthenticated, isAdmin, login, logout } = useAuth();
 *
 * Throws a descriptive error if used outside AuthProvider.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider. Wrap your app in <AuthProvider>.');
  }
  return context;
};

export default useAuth;