import { newPrice } from '../utils/edit-price';
import { PRODUCTS } from './products';
import { AppliedFilters } from '../models/appliedFilters';

export const store: Store = {
    origin: PRODUCTS.map((product: Product) => ({
        ...product,
        discountPrice: Number(newPrice(product.price, product.discountPercentage)),
        search: product.title + ' ' + String(product.price) + ' ' + product.color,
    })),

    sort: PRODUCTS.map((product: Product) => ({
        ...product,
        discountPrice: Number(newPrice(product.price, product.discountPercentage)),
        search: product.title + ' ' + String(product.price) + ' ' + product.color,
    })),

    sort2: [],
};

export const appliedFilters: AppliedFilters = {};
