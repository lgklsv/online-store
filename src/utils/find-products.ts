import { productsCartData } from '../const/store';

export const findProduct = (id: number, size: string): CartData | undefined => {
    // let index = 0;
    return productsCartData.productsInCart.find((data, i) => {
        // index = i;
        // console.log(index);
        return id === data.product.id && String(data.size) === size;
    });

    // return findedProduct;
};

// export interface FindProduct {
//     findedProduct: CartData | undefined;
//     index: number;
// }
