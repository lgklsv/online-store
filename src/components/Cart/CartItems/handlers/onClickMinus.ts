import { LOCAL_STORAGE_KEYS } from '../../../../const/local-storage';
import { promocodeStorage } from '../../../../const/promocodes';
import { productsCartData } from '../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../utils/calculate-amount-cart';
import { formatPriceNum } from '../../../../utils/format-price';
import { setLocalStorage } from '../../../../utils/local-storage';
import { updateComponent } from '../../../../utils/update-component';
import { renderProductPrice } from '../../../PageMain/components/MainCatalog/components/ProductPrice/ProductPrice';
import { updateHeader, updateTotalSumm, updateСartItemsContainer } from '../../handlers/update-cart';
import { updatePaginationBtns } from '../../Pagination/components/PaginationBtns/components/update-paginaiton-btns';
import { renderEmptyCart } from '../components/CartEmpty/CartEmpty';

export const onClickMinus = (event: Event, item: CartData) => {
  const { target } = event;
  if (target instanceof HTMLElement) {
    const itemEl = target.closest('.cart-item') as HTMLElement;
    const itemCounterQty = itemEl.querySelector('.cart-item__counter-qty') as HTMLElement;
    const itemQuaintity = itemEl.querySelector('.cart-item__quaintity') as HTMLElement;
    const itemLink = itemEl.querySelector('.cart-item__link') as HTMLElement;
    const plusBtn = itemEl.querySelector('.plus-btn') as HTMLElement;
    const itemQuaintityContainer = itemEl.querySelector('.cart-item__quaintity-container') as HTMLElement;

    let index = 0;
    const findedProduct = productsCartData.productsInCart.find((data, i) => {
      index = i; // получаем индекс найденного товара в массиве
      return item.product.id === data.product.id && String(data.size) === item.size;
    }) as CartData;

    findedProduct.quantity--;
    itemCounterQty.innerHTML = String(findedProduct.quantity);
    itemQuaintity.innerHTML = `На складе: ${Number(item.remainder) - findedProduct.quantity}`;

    plusBtn.removeAttribute('disabled'); // делаем кнопку увеличения активной
    itemQuaintity.classList.remove('quaintity-remainder');

    productsCartData.count--;

    if (findedProduct.quantity === 0) {
      productsCartData.productsInCart.splice(index, 1); // удаляем товар из массива
      updateСartItemsContainer();
    }

    itemEl.innerHTML = '';
    const itemPrice: HTMLElement = renderProductPrice(item.product, 'cart', findedProduct.quantity);
    // здесь же можно обновить данные о кол-ве товара
    itemEl.append(itemLink, itemQuaintityContainer, itemPrice);
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
    updatePaginationBtns();

    const mainContainer = document.querySelector('.main__container') as HTMLElement;
    if (productsCartData.count === 0) {
      mainContainer.innerHTML = '';
      mainContainer.append(renderEmptyCart());
    }
  }
};
