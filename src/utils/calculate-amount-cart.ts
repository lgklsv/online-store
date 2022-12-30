import { formatPriceNum } from "./format-price";

export const calcAmountCart = (array: CartData[]): string => {
    let summ = 0;

    array.forEach((product) => {
        summ += product.product.discountPrice * product.quantity;
    });

    return formatPriceNum(summ);
};

export const calcDiscount = (total: string | number, discount: string | number): string => {
    const percent = Math.floor(Number(total) / 100) * Number(discount);

    return formatPriceNum(Number(total) - percent) + ' ₽';
};
