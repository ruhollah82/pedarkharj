// hooks/useAuthToken.ts
import { useCallback } from "react";

const setCookie = (name: string, value: string, seconds: number): void => {
  let expires = "";
  if (seconds) {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${
    value || ""
  }${expires}; path=/; Secure; SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-1; path=/`;
};

const useCookie = () => {
  // Save a token with a specific name and expiration time in seconds
  const saveToken = useCallback(
    (name: string, token: string, seconds: number) => {
      setCookie(name, token, seconds);
    },
    []
  );

  // Get a token by name
  const getToken = useCallback((name: string): string | null => {
    return getCookie(name);
  }, []);

  // Delete a token by name
  const deleteToken = useCallback((name: string) => {
    deleteCookie(name);
  }, []);

  return { saveToken, getToken, deleteToken };
};

export default useCookie;
