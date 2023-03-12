/* eslint-disable no-param-reassign */
import { LOCAL_STORAGE_KEYS } from '../../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT } from '../../../../../../const/promocodes';
import { productsCartData } from '../../../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../../../utils/calculate-amount-cart';
import { formatPriceNum } from '../../../../../../utils/format-price';
import { setLocalStorage } from '../../../../../../utils/local-storage';
import { updateTotalSumm } from '../../../../../../utils/update-cart';
import { addPromocodes } from './add-promocodes';

export const onClickPromocode = (promoWrap: HTMLElement, title: HTMLElement) => {
  const promoDataInput = document.querySelector('.checkout-coupon__input') as HTMLInputElement;
  const promoData = promoDataInput.value;
  promoDataInput.value = '';
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
    title.innerHTML = 'Промокод уже активирован';
    setTimeout(() => {
      title.innerHTML = '';
    }, 2000);
  }
};
