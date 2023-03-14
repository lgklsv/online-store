import { promocodeStorage } from '../../../const/promocodes';
import { productsCartData } from '../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../utils/calculate-amount-cart';
import { createElem } from '../../../utils/create-element';
import { createInput } from '../../../utils/create-input-element';
import styles from './CartCheckout.scss';
import { renderCartCheckoutPromo } from './components/CartCheckoutPromo/CartCheckoutPromo';
import { renderCartCheckoutReceipt } from './components/CartCheckoutReceipt/CartCheckoutReceipt';
import { showModal } from './handlers/show-modal';

export const renderCartCheckout = (): HTMLElement => {
  const cartCheckout: HTMLElement = createElem('div', styles['cart__checkout']);

  const checkoutCoupon: HTMLElement = createElem('div', 'checkout-coupon');
  const couponTitleWrap: HTMLElement = createElem('p', 'checkout-coupon__title-wrapper');

  const couponTitle: HTMLElement = createElem('p', 'checkout-coupon__title');
  couponTitle.innerHTML = 'Промокод';

  const couponPromo: HTMLElement = createElem('p', 'checkout-coupon__title');
  couponPromo.id = 'coupon-badge';
  couponPromo.innerHTML = ''; // блок для вывода сообщения о найденном промокоде при совпадении значений

  couponTitleWrap.append(couponTitle, couponPromo);

  const couponBody: HTMLElement = createElem('div', 'checkout-coupon__body');

  const couponInput: HTMLInputElement = createInput('text', 'checkout-coupon__input');
  couponInput.id = 'coupon-input';
  couponInput.setAttribute('placeholder', 'Введите промокод');

  const couponBtn: HTMLElement = createElem('button', 'checkout-coupon__btn');
  couponBtn.innerHTML = 'Применить';
  couponBtn.id = 'coupon-btn';
  couponBtn.setAttribute('disabled', 'true'); // делаем кнопку неактивной

  // облочка для блока с промокодами
  const promoWrap = renderCartCheckoutPromo(couponInput, couponBtn);

  couponBody.append(couponInput, couponBtn);
  checkoutCoupon.append(couponTitleWrap, couponBody);

  const checkoutQty: HTMLElement = renderCartCheckoutReceipt('Количество', `${productsCartData.count}`, false);

  const checkoutSum: HTMLElement = renderCartCheckoutReceipt(
    'Сумма',
    `${calcAmountCart(productsCartData.productsInCart)} ₽`,
    false
  );

  let checkoutTotal: HTMLElement = renderCartCheckoutReceipt(
    'Итого',
    `${calcAmountCart(productsCartData.productsInCart)} ₽`,
    true
  );

  // проверка на данные о купонах
  if (promocodeStorage.promo.length !== 0) {
    let total = calcAmountCart(productsCartData.productsInCart); // общая сумма товаров в корзине
    total = total.replace(' ', '');
    (checkoutSum.lastChild as HTMLElement).classList.add('old-price');
    checkoutTotal = renderCartCheckoutReceipt('Итого', calcDiscount(total, promocodeStorage.discount), true);
  }

  const checkoutBtn: HTMLElement = createElem('button', 'cart__checkout-btn');
  checkoutBtn.innerHTML = 'Оформить заказ';

  checkoutBtn.onclick = showModal;

  cartCheckout.append(checkoutCoupon, promoWrap, checkoutQty, checkoutSum, checkoutTotal, checkoutBtn);

  return cartCheckout;
};
