import { pagination } from '../../../../../../const/store';

export const updateLimits = (): void => {
  const cartItems = document.querySelector('.cart__limit-input') as HTMLInputElement;
  cartItems.value = pagination.limit.toString();
};
