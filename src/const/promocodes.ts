import { getLocalStorage } from '../utils/local-storage';
import { LOCAL_STORAGE_KEYS } from './local-storage';

/** Глобальный объект, который передает данные о промокодах в local storage */
export const promocodeStorage: PromocodesData = getLocalStorage(LOCAL_STORAGE_KEYS.PROMOCODES) ?? {
  promo: [],
  discount: 0,
};

export const PROMOCODES_NAMES = {
  RS: 'RS',
  EPAM: 'EPAM',
  SALE5: 'SALE5',
} as const;

export const PROMOCODES_DISCOUNT: Record<PromoDiscount, number> = {
  [PROMOCODES_NAMES.RS]: 10,
  [PROMOCODES_NAMES.EPAM]: 25,
  [PROMOCODES_NAMES.SALE5]: 5,
};
