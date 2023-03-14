/* eslint-disable no-param-reassign */
import { promocodeStorage, PROMOCODES_DISCOUNT } from '../../../../../../const/promocodes';
import { createElem } from '../../../../../../utils/create-element';
import { onClickDeletePromo } from './onClickDeletePromo';

export const addPromocodes = (parent: HTMLElement): void => {
  parent.innerHTML = '';

  promocodeStorage.promo.forEach((promo: string) => {
    const code = promo.toUpperCase();
    const promoBlock: HTMLElement = createElem('div', 'checkout-coupon__promo');
    const promoName: HTMLElement = createElem('div', 'checkout-coupon__promo-name');
    const promoDisc: HTMLElement = createElem('div', 'checkout-coupon__promo-discount');
    const promoDelete: HTMLElement = createElem('div', 'checkout-coupon__promo-delete');

    promoDelete.setAttribute('id', `${code}`);
    promoDelete.innerHTML = 'Удалить';
    promoDelete.onclick = (event) => onClickDeletePromo(event, parent);

    promoName.innerHTML = `${code}`;
    promoDisc.innerHTML = `– ${PROMOCODES_DISCOUNT[code as PromoDiscount]}%`;
    promoBlock.append(promoName, promoDisc, promoDelete);
    parent.append(promoBlock);
  });
};
