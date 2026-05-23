// ===================== API =====================
export const API_BASE_URL = 'http://localhost:8080/api';

// ===================== AUTH =====================
export const TOKEN_KEY    = 'roadcare_token';
export const USER_KEY     = 'roadcare_user';

// ===================== REPORT STATUS =====================
export const STATUS = {
  PENDING:     'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED:    'RESOLVED',
};

export const STATUS_LABELS = {
  PENDING:     'Pending',
  IN_PROGRESS: 'In Progress',
  RESOLVED:    'Resolved',
};

export const STATUS_COLORS = {
  PENDING:     'bg-amber-100 text-amber-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  RESOLVED:    'bg-emerald-100 text-emerald-700',
};

// ===================== ROLES =====================
export const ROLES = {
  USER:  'USER',
  ADMIN: 'ADMIN',
};

// ===================== ROUTES =====================
export const ROUTES = {
  HOME:             '/',
  LOGIN:            '/login',
  REGISTER:         '/register',
  REPORT_POTHOLE:   '/report',
  MY_REPORTS:       '/my-reports',
  REPORT_DETAILS:   '/reports/:id',
  MAP:              '/map',
  NEARBY:           '/nearby',
  NOTIFICATIONS:    '/notifications',
  PROFILE:          '/profile',
  ABOUT:            '/about',
  UNAUTHORIZED:     '/unauthorized',
  // Admin
  ADMIN_LOGIN:      '/login',
  ADMIN_DASHBOARD:  '/admin/dashboard',
  ADMIN_REPORTS:    '/admin/reports',
  ADMIN_REPORT:     '/admin/reports/:id',
  ADMIN_UPDATE:     '/admin/reports/:id/update',
};

// ===================== MAP =====================
export const DEFAULT_MAP_CENTER = [17.385, 78.4867]; // Hyderabad
export const DEFAULT_MAP_ZOOM   = 13;
export const NEARBY_RADIUS_KM   = 5;
export const DUPLICATE_RADIUS_KM = 0.05;

// ===================== PAGINATION =====================
export const DEFAULT_PAGE_SIZE = 20;