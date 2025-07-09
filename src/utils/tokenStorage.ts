// src/utils/tokenStorage.ts

export const saveToken = (
  name: string,
  value: string,
  seconds?: number
): void => {
  const expiry = seconds ? Date.now() + seconds * 1000 : null;
  localStorage.setItem(name, JSON.stringify({ value, expiry }));
};

export const getToken = (name: string): string | null => {
  const itemStr = localStorage.getItem(name);
  if (!itemStr) return null;

  try {
    const { value, expiry } = JSON.parse(itemStr);
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(name);
      return null;
    }
    return value;
  } catch {
    localStorage.removeItem(name);
    return null;
  }
};

export const deleteToken = (name: string): void => {
  localStorage.removeItem(name);
};
