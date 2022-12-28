import { LOCAL_STORAGE_KEYS } from '../../const/local-storage';
import { productsCartData } from '../../const/store';
import { calcAmountCart } from '../../utils/calculate-amount-cart';
import { createElem } from '../../utils/create-element';
import { updateHeader } from '../../utils/update-cart';
import styles from './Cart.module.scss';
import { renderCartCheckout } from './CartCheckout/CartCheckout';
import { renderCartItems, updateTotalSumm } from './CartItems/CartItems';
import { renderEmptyCart } from './CartItems/components/CartEmpty/CartEmpty';
import { renderCheckoutModal } from './CheckoutModal/CheckoutModal';
import { toggleModal } from './CheckoutModal/components/ToggleModal';
import { renderLimits } from './Pagination/components/Limits/Limits';
import { renderPagination } from './Pagination/Pagination';

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

    const cartTools: HTMLElement = createElem('div', 'cart__tools');

    const limitContainer: HTMLElement = renderLimits(5);
    const paginationContainer: HTMLElement = renderPagination(1);

    const cartDeleteAllBtn: HTMLElement = createElem('p', 'cart__delete-all-btn');
    cartDeleteAllBtn.innerHTML = 'Удалить все';

    cartDeleteAllBtn.onclick = () => {
        const cartItems = document.querySelector('.cart__items') as HTMLElement;
        cartItems.innerHTML = '';
        cartItems.append(renderEmptyCart());

        localStorage.removeItem(LOCAL_STORAGE_KEYS.PRODUCT); //очищаем Local storage
        productsCartData.productsInCart = [];
        productsCartData.count = 0;
        updateHeader(productsCartData.count, productsCartData.productsInCart);
        updateTotalSumm(`${calcAmountCart(productsCartData.productsInCart)} ₽`);
    };

    cartTools.append(limitContainer, paginationContainer, cartDeleteAllBtn);

    cartHeadingContainer.append(cartHeading, cartTools);

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

    return main;
};
