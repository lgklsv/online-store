import { formatPriceNum } from "./format-price";

export const calcAmountCart = (array: CartData[]): string => {
    let summ = 0;

    array.forEach((product) => {
        summ += product.product.discountPrice * product.quantity;
    });

    return formatPriceNum(summ);
};
