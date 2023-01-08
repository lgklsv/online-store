import { formatPriceNum } from './format-price';

export const calcAmountCart = (array: CartData[]): string => {
    let summ = 0;

    array.forEach((product) => {
        summ += product.product.discountPrice * product.quantity;
    });

    return formatPriceNum(summ);
};

export const calcDiscount = (total: string | number, discount: string | number): string => {
    let numTotal = Number(total);
    let numDiscount = Number(discount);

    if (total < 0) numTotal = 0;
    if (discount < 0) numDiscount = 0;

    const percent = Math.floor(numTotal / 100) * numDiscount;

    return formatPriceNum(numTotal - percent) + ' ₽';
};
