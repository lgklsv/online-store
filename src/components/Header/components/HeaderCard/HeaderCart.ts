import { createElem } from '../../../../utils/create-element';
import styles from './HeaderCart.module.scss';

export const renderHeaderCart = (): HTMLElement => {
    const containerCart: HTMLElement = createElem('div', styles['header__cart']);

    const cartWrapper: HTMLElement = createElem('div', 'header__cart_container');
    const cartLink: HTMLElement = createElem('a', styles['header_cart-link']);
    cartLink.setAttribute('href', '/cart');

    const cartCounter: HTMLElement = createElem('div', styles['header_cart-counter']);
    const counterProduct: HTMLElement = createElem('span', styles['cart-counter']);
    counterProduct.innerHTML = '1';

    cartWrapper.append(cartLink);

    cartCounter.append(counterProduct);

    containerCart.append(cartWrapper, cartCounter);

    return containerCart;
};
