import { LOCAL_STORAGE_KEYS } from '../../../const/local-storage';
import { promocodeStorage } from '../../../const/promocodes';
import { productsCartData } from '../../../const/store';
import { calcAmountCart } from '../../../utils/calculate-amount-cart';
import { updateComponent } from '../../../utils/update-component';
import { renderCartCheckout } from '../CartCheckout/CartCheckout';
import { renderEmptyCart } from '../CartItems/components/CartEmpty/CartEmpty';
import { updateHeader, updateTotalSumm } from './update-cart';

export const onClearCart = () => {
  const cartItems = document.querySelector('.main__container') as HTMLElement;
  const cartCheckoutContainer = document.querySelector('.cart__checkout-container') as HTMLElement;
  cartItems.innerHTML = '';
  cartItems.append(renderEmptyCart());

  localStorage.removeItem(LOCAL_STORAGE_KEYS.PRODUCT); // очищаем Local storage
  productsCartData.productsInCart = [];
  productsCartData.count = 0;
  updateHeader(productsCartData.count, productsCartData.productsInCart);
  updateTotalSumm(`${calcAmountCart(productsCartData.productsInCart)} ₽`);

  promocodeStorage.discount = 0;
  promocodeStorage.promo = [];
  localStorage.removeItem(LOCAL_STORAGE_KEYS.PROMOCODES); // очищаем Local storage

  const updatedCartCheckout = [cartCheckoutContainer.firstChild as ChildNode, renderCartCheckout()];
  updateComponent(cartCheckoutContainer, ...(updatedCartCheckout as HTMLElement[]));
};
