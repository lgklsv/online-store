/* eslint-disable no-param-reassign */
import { LOCAL_STORAGE_KEYS } from '../../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT } from '../../../../../../const/promocodes';
import { productsCartData } from '../../../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../../../utils/calculate-amount-cart';
import { formatPriceNum } from '../../../../../../utils/format-price';
import { setLocalStorage } from '../../../../../../utils/local-storage';
import { updateTotalSumm } from '../../../../handlers/update-cart';
import { addPromocodes } from './addPromocodesHandler';
import { resetCouponInputs } from './resetInputsHandler';

export const onClickPromocode = (promoWrap: HTMLElement) => {
  const promoDataInput = document.getElementById('coupon-input') as HTMLInputElement;
  const couponBadge = document.getElementById('coupon-badge') as HTMLElement;

  const promoData = promoDataInput.value.toUpperCase();
  resetCouponInputs();

  // проверяем есть ли данный промокод в глобальнои объекте
  const findedPromocode = promocodeStorage.promo.find((promocode: string) => {
    return promoData === promocode;
  });

  if (!findedPromocode) {
    // изменяем глобальный объект
    promocodeStorage.promo.push(promoData);
    promocodeStorage.discount += PROMOCODES_DISCOUNT[promoData as PromoDiscount];

    // обновляем локальное хранилище
    setLocalStorage(promocodeStorage, LOCAL_STORAGE_KEYS.PROMOCODES);
    addPromocodes(promoWrap);

    // изменяем общую сумму корзины
    let total = calcAmountCart(productsCartData.productsInCart); // общая сумма товаров в корзине
    total = total.replace(' ', '');

    updateTotalSumm(`${formatPriceNum(total)} ₽`, calcDiscount(total, promocodeStorage.discount), promoWrap);

    return;
  }

  if (findedPromocode) {
    couponBadge.innerHTML = 'Промокод уже активирован';
    setTimeout(() => {
      couponBadge.innerHTML = '';
    }, 2000);
  }
};
