import { createElem } from '../../utils/create-element';
import styles from './Cart.module.scss';
import { renderCartItems } from './CartItems/CartItems';

export const renderCartPage = (): HTMLElement => {
    const main: HTMLElement = createElem('main', 'main');
    const mainContainer: HTMLElement = createElem('div', 'main__container');
    const mainContent: HTMLElement = createElem('div', styles['cart']);

    const cartItemsContainer: HTMLElement = createElem('div', 'cart__items-container');
    const cartCheckoutContainer: HTMLElement = createElem('div', 'cart__checkout-container');

    // Cart items (left part)
    const cartHeading: HTMLElement = createElem('h1', 'cart__heading');
    cartHeading.innerHTML = 'Товары в корзине';
    const cartItems: HTMLElement = renderCartItems();

    cartItemsContainer.append(cartHeading, cartItems);

    // Cart checkout (right part)

    mainContent.append(cartItemsContainer, cartCheckoutContainer);
    mainContainer.append(mainContent);
    main.append(mainContainer);

    return main;
};
