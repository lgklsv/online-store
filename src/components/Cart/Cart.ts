import { LOCAL_STORAGE_KEYS } from '../../const/local-storage';
import { promocodeStorage } from '../../const/promocodes';
import { productsCartData } from '../../const/store';
import { calcAmountCart } from '../../utils/calculate-amount-cart';
import { createElem } from '../../utils/create-element';
import { updateHeader, updateTotalSumm } from '../../utils/update-cart';
import { updateComponent } from '../../utils/update-component';
import styles from './Cart.module.scss';
import { renderCartCheckout } from './CartCheckout/CartCheckout';
import { renderCartItems } from './CartItems/CartItems';
import { renderEmptyCart } from './CartItems/components/CartEmpty/CartEmpty';
import { renderCheckoutModal } from './CheckoutModal/CheckoutModal';
import { toggleModal } from './CheckoutModal/components/ToggleModal';

export const renderCartPage = (): HTMLElement => {
    const main: HTMLElement = createElem('main', 'main');
    const mainContainer: HTMLElement = createElem('div', 'main__container');
    const modalContainer: HTMLElement = createElem('div', 'main__modal-container');
    const mainContent: HTMLElement = createElem('div', styles['cart']);

    // Cart items (left part)
    const cartItemsContainer: HTMLElement = createElem('div', 'cart__items-container');
    const cartHeadingContainer: HTMLElement = createElem('div', 'cart__items-heading-container');
    const cartHeading: HTMLElement = createElem('h1', 'cart__heading');
    cartHeading.innerHTML = 'Товары в корзине';

    const cartDeleteAllBtn: HTMLElement = createElem('p', 'cart__delete-all-btn');
    cartDeleteAllBtn.innerHTML = 'Удалить все';

    cartHeadingContainer.append(cartHeading, cartDeleteAllBtn);

    const cartItems: HTMLElement = renderCartItems();

    cartItemsContainer.append(cartHeadingContainer, cartItems);

    // Cart checkout (right part)
    const cartCheckoutContainer: HTMLElement = createElem('div', 'cart__checkout-container');
    const checkoutHeading: HTMLElement = createElem('h1', 'cart__heading');
    checkoutHeading.innerHTML = 'Итого';
    const cartCheckout: HTMLElement = renderCartCheckout();

    // Modal for checkout
    const overlay: HTMLElement = createElem('div', 'checkout-modal__overlay');
    overlay.classList.add('hidden_overlay');

    overlay.onclick = (): void => {
        const modal = document.querySelector('.checkout-modal') as HTMLElement;
        toggleModal(modal, overlay);
    };
    modalContainer.append(renderCheckoutModal(), overlay);

    cartCheckoutContainer.append(checkoutHeading, cartCheckout);
    mainContent.append(cartItemsContainer, cartCheckoutContainer);
    mainContainer.append(mainContent);
    main.append(mainContainer, modalContainer);

    cartDeleteAllBtn.onclick = () => {
        const cartItems = document.querySelector('.cart__items') as HTMLElement;
        cartItems.innerHTML = '';
        cartItems.append(renderEmptyCart());

        localStorage.removeItem(LOCAL_STORAGE_KEYS.PRODUCT); //очищаем Local storage
        productsCartData.productsInCart = [];
        productsCartData.count = 0;
        updateHeader(productsCartData.count, productsCartData.productsInCart);
        updateTotalSumm(`${calcAmountCart(productsCartData.productsInCart)} ₽`);

        promocodeStorage.discount = 0;
        promocodeStorage.promo = [];
        localStorage.removeItem(LOCAL_STORAGE_KEYS.PROMOCODES); //очищаем Local storage

        const updatedCartCheckout = [cartCheckoutContainer.firstChild as ChildNode, renderCartCheckout()];
        updateComponent(cartCheckoutContainer, ...(updatedCartCheckout as HTMLElement[]));
    };

    return main;
};
