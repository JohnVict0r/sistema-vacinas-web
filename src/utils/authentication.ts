const TOKEN_KEY = "@Token";
const PROFILE_KEY = "@Profile";
const FIRST_ACCESS_KEY = "@First-Access";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY) || null;
export const setAuthToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY);

export const getProfile = () =>
  JSON.parse(localStorage.getItem(PROFILE_KEY) || "") || null;

export const setProfile = (profile: any) =>
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

export const setFirstAccess = () => {
  localStorage.setItem(FIRST_ACCESS_KEY, "true");
};

export const isFirstAccess = () =>
  localStorage.getItem(FIRST_ACCESS_KEY) ? false : true;
