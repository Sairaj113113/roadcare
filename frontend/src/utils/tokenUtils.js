import { TOKEN_KEY, USER_KEY } from './constants';

// ===================== TOKEN =====================

export const saveToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const hasToken = () => !!getToken();

// ===================== USER =====================

export const saveUser = (user) => {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const removeUser = () => localStorage.removeItem(USER_KEY);

// ===================== SESSION =====================

/** Save both token and user profile in one call (used after login/register). */
export const saveSession = (token, user) => {
  saveToken(token);
  saveUser(user);
};

/** Clear all auth data from localStorage (used on logout). */
export const clearSession = () => {
  removeToken();
  removeUser();
};

/** Return the role stored in the user object, or null. */
export const getStoredRole = () => {
  const user = getUser();
  return user?.role ?? null;
};

/** Return true if the stored user has ADMIN role. */
export const isAdmin = () => getStoredRole() === 'ADMIN';