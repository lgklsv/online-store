export const calcAmountCart = (array: CartData[]): string => {
    console.log(array);

    let summ = 0;

    array.forEach((product) => {
        summ += product.product.discountPrice * product.quantity;
    });

    return String(summ);
};
