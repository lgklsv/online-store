import { renderCartItems } from '../../../../CartItems/CartItems';
import { getCartPage } from '../../../../../../utils/get-cart-page';
import { pagination } from '../../../../../../const/store';
import { productsCartData } from '../../../../../../const/store';

export const updateCartItems = (): void => {
    const cartItems = document.querySelector('.cart__items') as HTMLElement;
    cartItems.innerHTML = '';
    const newItems = renderCartItems(getCartPage(productsCartData.productsInCart, pagination.page, pagination.limit));
    cartItems.append(newItems);
};
