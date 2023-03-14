import styles from './CartCheckoutReceipt.module.scss';
import { createElem } from '../../../../../utils/create-element';

export const renderCartCheckoutReceipt = (title: string, sum: string, bold: boolean): HTMLElement => {
  const checkoutReceipt: HTMLElement = createElem('div', styles['cart__checkout-receipt']);
  const checkoutReceiptTitle: HTMLElement = createElem(
    'p',
    `${bold ? 'cart__checkout-receipt-title_b' : 'cart__checkout-receipt-title'}`
  );
  checkoutReceiptTitle.innerHTML = title;
  const checkoutReceiptAmount: HTMLElement = createElem(
    'p',
    `${bold ? 'cart__checkout-receipt-amount_b' : 'cart__checkout-receipt-amount'}`
  );
  checkoutReceiptAmount.innerHTML = sum; // Данные будут приходить из обекта товаров корзины

  checkoutReceipt.append(checkoutReceiptTitle, checkoutReceiptAmount);
  return checkoutReceipt;
};
