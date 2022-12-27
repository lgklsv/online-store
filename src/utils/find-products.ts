import { productsCartData } from '../const/store';

export const findProduct = (id: number, size: string) => {
    return productsCartData.productsInCart.find((data) => {
        return id === data.product.id && String(data.size) === size;
    });
};
