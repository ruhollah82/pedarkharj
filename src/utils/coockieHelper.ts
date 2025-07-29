import Cookies from "js-cookie";

export const setAuthCookie = (
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {}
) => {
  const secureOptions: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    ...options,
  };

  Cookies.set(name, value, secureOptions);
};

// Get a cookie
export const getAuthCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// Remove a cookie
export const removeAuthCookie = (
  name: string,
  options: Cookies.CookieAttributes = {}
) => {
  const removeOptions: Cookies.CookieAttributes = {
    path: "/",
    ...options,
  };

  Cookies.remove(name, removeOptions);
};

// Remove all authentication cookies
export const clearAuthCookies = () => {
  removeAuthCookie("accessToken");
  removeAuthCookie("refreshToken");
  removeAuthCookie("userData");
};
