// auth.js

const TOKEN_KEY = 'myAppAuthToken';

const Auth = {
  login: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  loggedIn: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export default Auth;
