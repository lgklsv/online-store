import { productsCartData } from '../../../../const/store';
import { createElem } from '../../../../utils/create-element';
import styles from './HeaderCart.module.scss';
import { router } from '../../../../utils/router';

export const renderHeaderCart = (): HTMLElement => {
    const containerCart: HTMLElement = createElem('div', styles['header__cart']);

    const cartWrapper: HTMLElement = createElem('div', 'header__cart_container');
    const cartLink: HTMLElement = createElem('a', styles['header_cart-link']);
    cartLink.setAttribute('href', '/cart');

    cartLink.onclick = (e: Event): void => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const link = target.getAttribute('href');
        if (link) router(link);
    };

    const cartCounter: HTMLElement = createElem('div', styles['header_cart-counter']);
    const counterProduct: HTMLElement = createElem('span', styles['cart-counter']);
    counterProduct.innerHTML = String(productsCartData.count);

    cartWrapper.append(cartLink);

    cartCounter.append(counterProduct);

    containerCart.append(cartWrapper, cartCounter);

    return containerCart;
};
