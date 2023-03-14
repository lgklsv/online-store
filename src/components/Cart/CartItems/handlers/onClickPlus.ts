import { LOCAL_STORAGE_KEYS } from '../../../../const/local-storage';
import { promocodeStorage } from '../../../../const/promocodes';
import { productsCartData } from '../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../utils/calculate-amount-cart';
import { findProduct } from '../../../../utils/find-products';
import { formatPriceNum } from '../../../../utils/format-price';
import { setLocalStorage } from '../../../../utils/local-storage';
import { updateComponent } from '../../../../utils/update-component';
import { renderProductPrice } from '../../../PageMain/components/MainCatalog/components/ProductPrice/ProductPrice';
import { updateHeader, updateTotalSumm } from '../../handlers/update-cart';

export const onClickPlus = (event: Event, item: CartData) => {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const itemEl = target.closest('.cart-item') as HTMLElement;
    const itemCounterQty = itemEl.querySelector('.cart-item__counter-qty') as HTMLElement;
    const itemQuaintity = itemEl.querySelector('.cart-item__quaintity') as HTMLElement;
    const itemLink = itemEl.querySelector('.cart-item__link') as HTMLElement;
    const plusBtn = itemEl.querySelector('.plus-btn') as HTMLElement;
    const itemQuaintityContainer = itemEl.querySelector('.cart-item__quaintity-container') as HTMLElement;

    const findedProduct = findProduct(item.product.id, item.size) as CartData;

    if (findedProduct.quantity >= (findedProduct.remainder as number)) {
      plusBtn.setAttribute('disabled', 'true'); // делаем кнопку неактивной
      itemQuaintity.classList.add('quaintity-remainder'); // добавляем стиль
      return;
    }

    findedProduct.quantity++;
    itemCounterQty.innerHTML = String(findedProduct.quantity);

    productsCartData.count++;
    itemCounterQty.innerHTML = String(findedProduct.quantity);
    itemQuaintity.innerHTML = `На складе: ${Number(item.remainder) - findedProduct.quantity}`;

    const updatedItem = [
      itemLink,
      itemQuaintityContainer,
      renderProductPrice(item.product, 'cart', findedProduct.quantity),
    ];

    setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);

    updateComponent(itemEl, ...updatedItem);
    updateHeader(productsCartData.count, productsCartData.productsInCart);

    let total = calcAmountCart(productsCartData.productsInCart); // общая сумма товаров в корзине
    total = total.replace(' ', '');
    updateTotalSumm(`${formatPriceNum(total)} ₽`, calcDiscount(total, promocodeStorage.discount));
  }
};
