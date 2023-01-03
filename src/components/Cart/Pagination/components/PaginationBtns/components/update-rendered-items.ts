import { renderCartItems } from '../../../../CartItems/CartItems';
import { getCartPage } from '../../../../../../utils/get-cart-page';
import { pagination } from '../../../../../../const/store';
import { productsCartData } from '../../../../../../const/store';
import { toQueryStringPag } from '../../QueryString/to-query-string-pag';

export const updateCartItems = (): void => {
    const cartItems = document.querySelector('.cart__items') as HTMLElement;
    cartItems.innerHTML = '';
    toQueryStringPag(pagination);
    const newItems = renderCartItems(getCartPage(productsCartData.productsInCart, pagination.page, pagination.limit));

    cartItems.append(newItems);
};
