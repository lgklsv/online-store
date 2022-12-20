import { quickSort } from '../utils/quick-sort';

/** Идентификаторы типов сортировок */
export const SORT_TYPE = {
    DEFAULT: 'DEFAULT',
    PRICES_ASC: 'PRICES_ASC',
    PRICES_DESC: 'PRICES_DESC',
    DISCOUNT_ASC: 'DISCOUNT_ASC',
    DISCOUNT_DESC: 'DISCOUNT_DESC',
} as const;

/** Опции сортировки для отрисовки в разметке */
export const SORT_OPTIONS: Record<SortTypes, string> = {
    [SORT_TYPE.DEFAULT]: 'По умолчанию',
    [SORT_TYPE.PRICES_ASC]: 'По возрастанию цены',
    [SORT_TYPE.PRICES_DESC]: 'По убыванию цены',
    [SORT_TYPE.DISCOUNT_ASC]: 'По возрастанию скидки',
    [SORT_TYPE.DISCOUNT_DESC]: 'По убыванию скидки',
};

/** Функции сортировки с соответствием типу сортировки через идентификатор */
export const SORT_FUNCTIONS: Record<SortTypes, SortFn> = {
    [SORT_TYPE.DEFAULT]: (products: ExtendedProduct[]) => quickSort(products, 'e'),
    [SORT_TYPE.PRICES_ASC]: (products: ExtendedProduct[]) => quickSort(products, 'f').reverse(),
    [SORT_TYPE.PRICES_DESC]: (products: ExtendedProduct[]) => quickSort(products, 'd').reverse(),
    [SORT_TYPE.DISCOUNT_ASC]: (products: ExtendedProduct[]) => quickSort(products, 'd').reverse(),
    [SORT_TYPE.DISCOUNT_DESC]: (products: ExtendedProduct[]) => quickSort(products, 'e').reverse(),
};

/** массив с вариантами сортировки */
export const sortOptions: string[] = [
    'По умолчанию',
    'По возрастанию цены',
    'По убыванию цены',
    'По возрастанию скидки',
    'По убыванию скидки',
];

export const sortId: string[] = [
    'defaul-sort',
    'ascending-prices',
    'descending-prices',
    'ascending-discounts',
    'descending-discounts',
];

// export const sortObj = {
//     'ascending_prices': () => {},
//     'descending-prices',
//     'ascending-discounts',
//     'descending-discounts',
// }
