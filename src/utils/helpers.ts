export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const validatePhoneNumber = (number: string): boolean =>
  /^[0-9]{10}$/.test(number);
