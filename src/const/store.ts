import { newPrice } from '../utils/edit-price';
import { getLocalStorage } from '../utils/local-storage';
import { LOCAL_STORAGE_KEYS } from './local-storage';
import { PRODUCTS } from './products';

export const store: Store = {
    origin: PRODUCTS.map((product: Product) => ({
        ...product,
        discountPrice: Number(newPrice(product.price, product.discountPercentage)),
        search:
            product.title +
            ' ' +
            newPrice(product.price, product.discountPercentage) +
            ' ' +
            product.color +
            ' ' +
            product.category +
            ' ' +
            product.rating +
            ' ' +
            product.discountPercentage,
    })),

    sorted: [],
};

export const appliedFilters: AppliedFilters = {};

/** глобальная переменная, которая передается в local storage */
export const productsCartData: Cart = getLocalStorage(LOCAL_STORAGE_KEYS.PRODUCT) ?? {
    productsInCart: [],
    count: 0,
};

export const pagination: Pagination = {
    limit: 3,
    page: 1,
};
