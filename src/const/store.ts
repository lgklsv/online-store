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
            product.category,
    })),

    sort: PRODUCTS.map((product: Product) => ({
        ...product,
        discountPrice: Number(newPrice(product.price, product.discountPercentage)),
        search:
            product.title +
            ' ' +
            newPrice(product.price, product.discountPercentage) +
            ' ' +
            product.color +
            ' ' +
            product.category,
    })),

    sorted: [],
};

export const appliedFilters: AppliedFilters = {};

export const productsCartData: Cart = getLocalStorage(LOCAL_STORAGE_KEYS.PRODUCT) ?? {
    productsInCart: [],
    count: 0,
};
