import { productsCartData } from '../../../../const/store';
import { createElem } from '../../../../utils/create-element';
import styles from './HeaderCart.module.scss';
import { router } from '../../../../utils/router';

export const renderHeaderCart = (): HTMLElement => {
  const containerCart: HTMLElement = createElem('div', styles['header__cart']);
  const cartIcon: HTMLElement = createElem('div', 'header__cart-icon');

  containerCart.onclick = (): void => router('/cart');

  const cartCounter: HTMLElement = createElem('div', styles['header_cart-counter']);
  const counterProduct: HTMLElement = createElem('span', styles['cart-counter']);
  counterProduct.innerHTML = String(productsCartData.count);

  cartCounter.append(counterProduct);

  containerCart.append(cartIcon, cartCounter);
  return containerCart;
};
