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
        sizeQuantity: product.sizes.map(() => getRandomInt(47)),
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

        sizeQuantity: product.sizes.map(() => getRandomInt(47)),
        // sizeQuantity: convertToObj(product.sizes) as SizeObj,
    })),

    sorted: [],
};

export const appliedFilters: AppliedFilters = {};

/** глобальная переменная, которая передается в local storage */
export const productsCartData: Cart = getLocalStorage(LOCAL_STORAGE_KEYS.PRODUCT) ?? {
    productsInCart: [],
    count: 0,
};

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// const convertToObj = (sizes: string[]) => {
//     const arr = sizes.map(() => getRandomInt(47));
//     const obj = sizes.reduce((acc, element, index) => {
//         return {
//             ...acc,
//             [element]: arr[index],
//         };
//     }, {});

//     return obj;
// };
