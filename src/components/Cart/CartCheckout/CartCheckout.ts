import { productsCartData } from '../../../const/store';
import { calcAmountCart } from '../../../utils/calculate-amount-cart';
import { createElem } from '../../../utils/create-element';
import { createInput } from '../../../utils/create-input-element';
import styles from './CartCheckout.scss';
import { renderCartCheckoutReceipt } from './components/CartCheckoutReceipt/CartCheckoutReceipt';

export const renderCartCheckout = (): HTMLElement => {
    const cartCheckout: HTMLElement = createElem('div', styles['cart__checkout']);

    const checkoutCoupon: HTMLElement = createElem('div', 'checkout-coupon');
    const couponTitle: HTMLElement = createElem('p', 'checkout-coupon__title');
    couponTitle.innerHTML = 'Промокод';

    const couponBody: HTMLElement = createElem('div', 'checkout-coupon__body');

    const couponInput: HTMLElement = createInput('text', 'checkout-coupon__input');
    couponInput.setAttribute('placeholder', 'Введите промокод');

    const couponBtn: HTMLElement = createElem('button', 'checkout-coupon__btn');
    couponBtn.innerHTML = 'Применить';

    couponBody.append(couponInput, couponBtn);
    checkoutCoupon.append(couponTitle, couponBody);

    // console.log(productsCartData);

    const checkoutQty: HTMLElement = renderCartCheckoutReceipt('Количество', `${productsCartData.count}`, false);

    const checkoutSum: HTMLElement = renderCartCheckoutReceipt(
        'Сумма',
        `${calcAmountCart(productsCartData.productsInCart)} ₽`,
        false
    ); // Данные будут приходить из обекта товаров корзины

    const checkoutTotal: HTMLElement = renderCartCheckoutReceipt(
        'Итого',
        `${calcAmountCart(productsCartData.productsInCart)} ₽`,
        true
    ); // Данные будут рассчитываться с учетом промокода

    const checkoutBtn: HTMLElement = createElem('button', 'cart__checkout-btn');
    checkoutBtn.innerHTML = 'Оформить заказ';

    cartCheckout.append(checkoutCoupon, checkoutQty, checkoutSum, checkoutTotal, checkoutBtn);

    return cartCheckout;
};
