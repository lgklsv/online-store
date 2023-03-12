/* eslint-disable no-param-reassign */
import { LOCAL_STORAGE_KEYS } from '../../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT } from '../../../../../../const/promocodes';
import { productsCartData } from '../../../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../../../utils/calculate-amount-cart';
import { createElem } from '../../../../../../utils/create-element';
import { formatPriceNum } from '../../../../../../utils/format-price';
import { setLocalStorage } from '../../../../../../utils/local-storage';
import { updateTotalSumm } from '../../../../../../utils/update-cart';

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

    promoDelete.onclick = (event: Event) => {
      let index = 0;
      const findedPromo = promocodeStorage.promo.find((promocode: string, i: number) => {
        index = i; // получаем индекс найденного товара в массиве
        return (event.target as HTMLElement).id === promocode;
      });

      promocodeStorage.discount -= PROMOCODES_DISCOUNT[findedPromo as PromoDiscount];
      promocodeStorage.promo.splice(index, 1); // удаляем товар из массива
      setLocalStorage(promocodeStorage, LOCAL_STORAGE_KEYS.PROMOCODES);

      let total = calcAmountCart(productsCartData.productsInCart); // общая сумма товаров в корзине
      total = total.replace(' ', '');

      updateTotalSumm(`${formatPriceNum(total)} ₽`, calcDiscount(total, promocodeStorage.discount));
      addPromocodes(parent);
    };

    promoName.innerHTML = `${code}`;
    promoDisc.innerHTML = `– ${PROMOCODES_DISCOUNT[code as PromoDiscount]}%`;
    promoBlock.append(promoName, promoDisc, promoDelete);
    parent.append(promoBlock);
  });
};
