import { renderCartCheckoutReceipt } from '../components/Cart/CartCheckout/components/CartCheckoutReceipt/CartCheckoutReceipt';
import { renderCartItems } from '../components/Cart/CartItems/CartItems';
import { promocodeStorage } from '../const/promocodes';
import { productsCartData } from '../const/store';
import { calcAmountCart } from './calculate-amount-cart';
import { updateComponent } from './update-component';

export const updateHeader = (newCount: number | string, array: CartData[]): void => {
    const counterProduct: HTMLElement = document.querySelector('.cart-counter') as HTMLElement;
    counterProduct.innerHTML = String(newCount);

    const summ: HTMLElement = document.querySelector('.total-summ__num') as HTMLElement;
    summ.innerHTML = calcAmountCart(array) + ' ₽';
};

export const updateСartItemsContainer = (): void => {
    const parent = document.querySelector('.cart__items-container') as HTMLElement;

    const cartItems: HTMLElement = renderCartItems();

    const updatedCheckout = [parent.firstChild as ChildNode, cartItems];

    updateComponent(parent, ...(updatedCheckout as HTMLElement[]));
};

export const updateTotalSumm = (sum: string, total?: string, secondChild?: HTMLElement): void => {
    const parent = document.querySelector('.cart__checkout') as HTMLElement;

    const checkoutQty: HTMLElement = renderCartCheckoutReceipt('Количество', `${productsCartData.count}`, false);

    const checkoutSum: HTMLElement = renderCartCheckoutReceipt('Сумма', sum, false); // Данные будут приходить из обекта товаров корзины

    if (promocodeStorage.promo.length !== 0) {
        (checkoutSum.lastChild as HTMLElement).classList.add('old-price');
    }

    const checkoutTotal: HTMLElement = renderCartCheckoutReceipt('Итого', total ?? sum, true); // Данные будут рассчитываться с учетом промокода

    const updatedCheckout = [
        parent.firstChild as ChildNode,
        secondChild ?? (parent.childNodes[1] as ChildNode), // добавила новый блок с купонами
        checkoutQty,
        checkoutSum,
        checkoutTotal,
        parent.lastChild as ChildNode,
    ];

    updateComponent(parent, ...(updatedCheckout as HTMLElement[]));
};
