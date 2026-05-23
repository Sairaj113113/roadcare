import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

/**
 * App — root component of the RoadCare frontend.
 *
 * Provider hierarchy (outer → inner):
 *   AuthProvider  — JWT auth state, login/logout
 *   UserProvider  — unread count, extended user UI state
 *   AppRoutes     — React Router v6 route tree
 */
const App = () => (
  <AuthProvider>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </AuthProvider>
);

export default App;