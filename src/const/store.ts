import { newPrice } from '../utils/edit-price';
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

export const productsCartData: Cart = {
    productsInCart: [],
    count: 0,
};
