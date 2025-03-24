import { useCallback } from "react";

const setLocalStorage = (
  name: string,
  value: string,
  seconds?: number
): void => {
  const expiry = seconds ? Date.now() + seconds * 1000 : null;
  const item = JSON.stringify({ value, expiry });
  localStorage.setItem(name, item);
};

const getLocalStorage = (name: string): string | null => {
  const itemStr = localStorage.getItem(name);
  if (!itemStr) return null;

  try {
    const { value, expiry } = JSON.parse(itemStr);
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(name); // auto-expire
      return null;
    }
    return value;
  } catch (err) {
    localStorage.removeItem(name); // invalid data, cleanup
    return null;
  }
};

const deleteLocalStorage = (name: string): void => {
  localStorage.removeItem(name);
};

const useAuthToken = () => {
  const saveToken = useCallback(
    (name: string, token: string, seconds?: number) => {
      setLocalStorage(name, token, seconds);
    },
    []
  );

  const getToken = useCallback((name: string): string | null => {
    return getLocalStorage(name);
  }, []);

  const deleteToken = useCallback((name: string) => {
    deleteLocalStorage(name);
  }, []);

  return { saveToken, getToken, deleteToken };
};

export default useAuthToken;
