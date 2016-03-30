import cookie from 'react-cookie';
import jwt from 'jsonwebtoken';

export const AUTH_TOKEN = 'token';

export function setAuthToken(token) {
  cookie.save('token', token, { path: '/' });
}

export function getAuthToken() {
  return cookie && cookie.load(AUTH_TOKEN);
}

export function getCurrentUser() {
  const token = getAuthToken();
  return jwt.decode(token);
}

export function isAuthenticated() {
  const user = getCurrentUser();
  return user !== null;
}
