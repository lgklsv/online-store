import { LOCAL_STORAGE_KEYS } from '../../const/local-storage';
import { promocodeStorage } from '../../const/promocodes';
import { productsCartData } from '../../const/store';
import { calcAmountCart } from '../../utils/calculate-amount-cart';
import { createElem } from '../../utils/create-element';
import { getCartPage } from '../../utils/get-cart-page';
import { updateHeader, updateTotalSumm } from '../../utils/update-cart';
import { updateComponent } from '../../utils/update-component';
import styles from './Cart.module.scss';
import { renderCartCheckout } from './CartCheckout/CartCheckout';
import { renderCartItems } from './CartItems/CartItems';
import { renderEmptyCart } from './CartItems/components/CartEmpty/CartEmpty';
import { renderCheckoutModal } from './CheckoutModal/CheckoutModal';
import { toggleModal } from './CheckoutModal/components/ToggleModal';
import { renderLimits } from './Pagination/components/Limits/Limits';
import { renderPagination } from './Pagination/Pagination';
import { pagination } from '../../const/store';

export const renderCartPage = (): HTMLElement => {
    const main: HTMLElement = createElem('main', 'main');
    const mainContainer: HTMLElement = createElem('div', 'main__container');

    if (productsCartData.count === 0) {
        mainContainer.innerHTML = '';
        mainContainer.append(renderEmptyCart());
        main.append(mainContainer);
        return main;
    }

    const modalContainer: HTMLElement = createElem('div', 'main__modal-container');
    const mainContent: HTMLElement = createElem('div', styles['cart']);

    // Cart items (left part)
    const cartItemsContainer: HTMLElement = createElem('div', 'cart__items-container');
    const cartHeadingContainer: HTMLElement = createElem('div', 'cart__items-heading-container');
    const cartHeading: HTMLElement = createElem('h1', 'cart__heading');
    cartHeading.innerHTML = 'Товары в корзине';

    const cartTools: HTMLElement = createElem('div', 'cart__tools');
    const limitContainer: HTMLElement = renderLimits(pagination.limit);

    const paginationEl: HTMLElement = createElem('div', 'cart__pagination');
    const paginationContainer: HTMLElement = renderPagination(
        pagination.page,
        Math.ceil(productsCartData.productsInCart.length / pagination.limit)
    );
    paginationEl.append(paginationContainer);

    const cartDeleteAllBtn: HTMLElement = createElem('p', 'cart__delete-all-btn');
    cartDeleteAllBtn.innerHTML = 'Удалить все';

    cartTools.append(limitContainer, paginationEl, cartDeleteAllBtn);

    cartHeadingContainer.append(cartHeading, cartTools);

    const cartItems: HTMLElement = renderCartItems(
        getCartPage(productsCartData.productsInCart, pagination.page, pagination.limit)
    );

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
        const cartItems = document.querySelector('.main__container') as HTMLElement;
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
