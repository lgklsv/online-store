import { quickSort } from '../utils/quick-sort';

/** Идентификаторы типов сортировок */
export const SORT_TYPE = {
    DEFAULT: 'DEFAULT',
    PRICES_ASC: 'PRICES_ASC',
    PRICES_DESC: 'PRICES_DESC',
    DISCOUNT_ASC: 'DISCOUNT_ASC',
    RATING: 'RATING',
} as const;

/** Опции сортировки для отрисовки в разметке */
export const SORT_OPTIONS: Record<SortTypes, string> = {
    [SORT_TYPE.DEFAULT]: 'По умолчанию',
    [SORT_TYPE.PRICES_ASC]: 'По возрастанию цены',
    [SORT_TYPE.PRICES_DESC]: 'По убыванию цены',
    [SORT_TYPE.DISCOUNT_ASC]: 'По размеру скидки',
    [SORT_TYPE.RATING]: 'По рейтингу',
};

/** Функции сортировки с соответствием типу сортировки через идентификатор */
export const SORT_FUNCTIONS: Record<SortTypes, SortFn> = {
    [SORT_TYPE.DEFAULT]: (products) => quickSort(products, 'id'),
    [SORT_TYPE.PRICES_ASC]: (products) => quickSort(products, 'discountPrice'),
    [SORT_TYPE.PRICES_DESC]: (products) => quickSort(products, 'discountPrice').reverse(),
    [SORT_TYPE.DISCOUNT_ASC]: (products) => quickSort(products, 'discountPercentage').reverse(),
    [SORT_TYPE.RATING]: (products) => quickSort(products, 'rating').reverse(),
};
