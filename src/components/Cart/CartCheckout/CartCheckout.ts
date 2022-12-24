import { PRODUCTS } from '../../../const/products';
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

    const checkoutQty: HTMLElement = renderCartCheckoutReceipt('Количество', '3', false);

    const checkoutSum: HTMLElement = renderCartCheckoutReceipt(
        'Сумма',
        `${PRODUCTS[0].price + PRODUCTS[1].price + PRODUCTS[2].price} ₽`,
        false
    ); // Данные будут приходить из обекта товаров корзины

    const checkoutTotal: HTMLElement = renderCartCheckoutReceipt(
        'Итого',
        `${PRODUCTS[0].price + PRODUCTS[1].price + PRODUCTS[2].price} ₽`,
        true
    ); // Данные будут рассчитываться с учетом промокода

    const checkoutBtn: HTMLElement = createElem('button', 'cart__checkout-btn');
    checkoutBtn.innerHTML = 'Оформить заказ';

    checkoutBtn.onclick = (e: Event): void => {
        const overlay = document.querySelector('.checkout-modal__overlay') as HTMLElement;
        if (overlay) {
            overlay.classList.remove('hidden_overlay');
        }
        const modal = document.querySelector('.checkout-modal') as HTMLElement;
        if (modal) {
            modal.classList.add('active');
        }
    };

    cartCheckout.append(checkoutCoupon, checkoutQty, checkoutSum, checkoutTotal, checkoutBtn);

    return cartCheckout;
};
