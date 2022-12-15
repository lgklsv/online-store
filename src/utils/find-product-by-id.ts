import { PRODUCTS } from '../const/products';

export const findProductById = function (id: number): Product | -1 {
    const foundProd = PRODUCTS.find((obj) => obj.id === id);
    return foundProd ? foundProd : -1;
};
