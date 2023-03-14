export const setLocalStorage = (value: Cart | PromocodesData, key: string): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const storageItem = localStorage.getItem(key);
  if (!storageItem) {
    return null;
  }

  return JSON.parse(storageItem);
};
