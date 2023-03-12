/* eslint-disable no-param-reassign */
import { promocodeStorage } from '../../../../../const/promocodes';
import { createElem } from '../../../../../utils/create-element';
import styles from './CartCheckoutPromo.module.scss';
import { addPromocodes } from './handlers/add-promocodes';
import { onClickPromocode } from './handlers/onclickPromocode';
import { onInputPromocode } from './handlers/onInputPromocode';

export const renderCartCheckoutPromo = (
  input: HTMLInputElement,
  title: HTMLElement,
  button: HTMLElement
): HTMLElement => {
  const promoWrap: HTMLElement = createElem('div', styles['checkout-coupon__wrapper']);

  if (promocodeStorage.promo.length !== 0) {
    addPromocodes(promoWrap);
  }

  input.oninput = () => onInputPromocode(input, title, button);
  button.onclick = () => onClickPromocode(promoWrap, title);

  return promoWrap;
};
