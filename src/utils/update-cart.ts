import { calcAmountCart } from './calculate-amount-cart';

export const updateHeader = (newCount: number | string, array: CartData[]) => {
    const counterProduct: HTMLElement = document.querySelector('.cart-counter') as HTMLElement;
    counterProduct.innerHTML = String(newCount);

    const summ: HTMLElement = document.querySelector('.total-summ__num') as HTMLElement;
    summ.innerHTML = calcAmountCart(array) + ' ₽';
};
