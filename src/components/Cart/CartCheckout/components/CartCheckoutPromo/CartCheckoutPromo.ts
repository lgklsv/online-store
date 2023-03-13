/* eslint-disable no-param-reassign */
import { promocodeStorage } from '../../../../../const/promocodes';
import { createElem } from '../../../../../utils/create-element';
import { addPromocodes } from './handlers/addPromocodesHandler';
import { onClickPromocode } from './handlers/onclickPromocode';
import { onInputPromocode } from './handlers/onInputPromocode';
import styles from './CartCheckoutPromo.module.scss';

export const renderCartCheckoutPromo = (input: HTMLInputElement, button: HTMLElement): HTMLElement => {
  const promoWrap: HTMLElement = createElem('div', styles['checkout-coupon__wrapper']);

  if (promocodeStorage.promo.length !== 0) {
    addPromocodes(promoWrap);
  }

  input.oninput = onInputPromocode;
  button.onclick = () => onClickPromocode(promoWrap);

  return promoWrap;
};
