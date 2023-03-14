import { renderCartCheckoutReceipt } from '../CartCheckout/components/CartCheckoutReceipt/CartCheckoutReceipt';
import { renderCartItems } from '../CartItems/CartItems';
import { promocodeStorage } from '../../../const/promocodes';
import { productsCartData, pagination } from '../../../const/store';
import { calcAmountCart } from '../../../utils/calculate-amount-cart';
import { updateComponent } from '../../../utils/update-component';
import { getCartPage } from '../../../utils/get-cart-page';

export const updateHeader = (newCount: number | string, array: CartData[]): void => {
  const counterProduct: HTMLElement = document.querySelector('.cart-counter') as HTMLElement;
  counterProduct.innerHTML = String(newCount);

  const summ: HTMLElement = document.querySelector('.total-summ__num') as HTMLElement;
  summ.innerHTML = `${calcAmountCart(array)} ₽`;
};

export const updateСartItemsContainer = (): void => {
  const parent = document.querySelector('.cart__items-container') as HTMLElement;

  const cartItems: HTMLElement = renderCartItems(
    getCartPage(productsCartData.productsInCart, pagination.page, pagination.limit)
  );

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
