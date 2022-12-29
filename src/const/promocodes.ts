import { getLocalStorage } from '../utils/local-storage';
import { LOCAL_STORAGE_KEYS } from './local-storage';

export const promocodeStorage: PromocodesData = getLocalStorage(LOCAL_STORAGE_KEYS.PROMOCODES) ?? {
    promo: [],
    discount: 0,
};

export const PROMOCODES_NAMES = {
    RS: 'RS',
    EPAM: 'EPAM',
    SALE5: 'SALE5',
} as const;

/** Опции сортировки для отрисовки в разметке */
export const PROMOCODES_DISCOUNT: Record<PromoDiscount, number> = {
    [PROMOCODES_NAMES.RS]: 10,
    [PROMOCODES_NAMES.EPAM]: 25,
    [PROMOCODES_NAMES.SALE5]: 5,
};

// /** Функции сортировки с соответствием типу сортировки через идентификатор */
// export const PROMOCODES_DISCOUNT: Record<SortTypes, SortFn> = {
//     [SORT_TYPE.DEFAULT]: (products) => quickSort(products, 'id'),
//     [SORT_TYPE.PRICES_ASC]: (products) => quickSort(products, 'discountPrice'),
//     [SORT_TYPE.PRICES_DESC]: (products) => quickSort(products, 'discountPrice').reverse(),
//     [SORT_TYPE.DISCOUNT_ASC]: (products) => quickSort(products, 'discountPercentage').reverse(),
//     [SORT_TYPE.RATING]: (products) => quickSort(products, 'rating').reverse(),
// };
