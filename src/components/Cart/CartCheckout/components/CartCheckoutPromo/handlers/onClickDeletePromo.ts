import { LOCAL_STORAGE_KEYS } from '../../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT } from '../../../../../../const/promocodes';
import { productsCartData } from '../../../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../../../utils/calculate-amount-cart';
import { formatPriceNum } from '../../../../../../utils/format-price';
import { setLocalStorage } from '../../../../../../utils/local-storage';
import { updateTotalSumm } from '../../../../handlers/update-cart';
import { addPromocodes } from './addPromocodesHandler';

export const onClickDeletePromo = (event: Event, parent: HTMLElement) => {
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
