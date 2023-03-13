/* eslint-disable no-param-reassign */
import { PROMOCODES_DISCOUNT, PROMOCODES_NAMES } from '../../../../../../const/promocodes';
import { resetCouponInputs } from './resetInputsHandler';

export const onInputPromocode = () => {
  const promoDataInput = document.getElementById('coupon-input') as HTMLInputElement;
  const valueInput: string = promoDataInput.value.toLocaleLowerCase().trim();
  const couponBadge = document.getElementById('coupon-badge') as HTMLElement;
  const couponBtn = document.getElementById('coupon-btn') as HTMLElement;

  Object.entries(PROMOCODES_NAMES).forEach(([key, value]) => {
    if (valueInput === value.toLocaleLowerCase()) {
      couponBadge.innerHTML = `${key}  –${PROMOCODES_DISCOUNT[value]}%`;
      couponBtn.removeAttribute('disabled');
      return;
    }
    if (valueInput === '') {
      resetCouponInputs();
    }
  });
};
