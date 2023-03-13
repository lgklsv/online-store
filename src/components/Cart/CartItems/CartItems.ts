import { createElem } from '../../../utils/create-element';
import styles from './CartItems.module.scss';
import { renderProductPrice } from '../../PageMain/components/MainCatalog/components/ProductPrice/ProductPrice';
import { productsCartData, pagination } from '../../../const/store';
import { newNameProduct } from '../../../utils/edit-name-products';
import { setLocalStorage } from '../../../utils/local-storage';
import { LOCAL_STORAGE_KEYS } from '../../../const/local-storage';
import { findProduct } from '../../../utils/find-products';
import { calcAmountCart, calcDiscount } from '../../../utils/calculate-amount-cart';
import { updateHeader, updateTotalSumm, updateСartItemsContainer } from '../handlers/update-cart';
import { updateComponent } from '../../../utils/update-component';
import { updatePaginationBtns } from '../Pagination/components/PaginationBtns/components/update-paginaiton-btns';
import { promocodeStorage } from '../../../const/promocodes';
import { formatPriceNum } from '../../../utils/format-price';
import { renderEmptyCart } from './components/CartEmpty/CartEmpty';

export const renderCartItems = (curPageItems: CartData[]): HTMLElement => {
  const cartItems: HTMLElement = createElem('div', styles['cart__items']);

  curPageItems.forEach((PRODUCTS, i) => {
    const item: HTMLElement = createElem('div', 'cart-item');

    // Ссылка на товар
    const itemLink: HTMLElement = createElem('a', 'cart-item__link');
    itemLink.setAttribute('href', `/product/${PRODUCTS.product.id}`);
    itemLink.setAttribute('target', '_blank');

    const itemIndex = i + 1 + (pagination.page - 1) * pagination.limit;

    // Номер товара в корзине
    const itemNumber: HTMLElement = createElem('div', 'cart-item__number');
    itemNumber.innerHTML = itemIndex.toString();

    // Картинка товара
    const itemImage: HTMLElement = createElem('img', 'cart-item__image');
    itemImage.setAttribute('src', `${PRODUCTS.product.thumbnail}`);
    itemImage.setAttribute('alt', `${PRODUCTS.product.title}`);

    // Название товара
    const itemTitleContainer: HTMLElement = createElem('div', 'cart-item__heading');

    const itemBrand: HTMLElement = createElem('h2', 'cart-item__brand');
    itemBrand.innerHTML = `${PRODUCTS.product.brand}`;
    const itemTitle: HTMLElement = createElem('p', 'cart-item__title');
    itemTitle.innerHTML = `${newNameProduct(PRODUCTS.product.brand, PRODUCTS.product.title)}`;

    // Размер товара
    const info: HTMLElement = createElem('div', 'cart-item__info-container');

    const itemSize: HTMLElement = createElem('p', 'cart-item__size');
    itemSize.innerHTML = `Размер: ${PRODUCTS.size}`;

    const productRating = createElem('div', 'cart-item__raiting');
    productRating.innerHTML = `Рейтинг:${String(PRODUCTS.product.rating)}`;

    info.append(itemSize, productRating);
    itemTitleContainer.append(itemBrand, itemTitle, info);

    itemLink.append(itemNumber, itemImage, itemTitleContainer);

    // Количество товара и добавление количества
    const itemQuaintityContainer: HTMLElement = createElem('div', 'cart-item__quaintity-container');

    const itemQuaintity: HTMLElement = createElem('p', 'cart-item__quaintity');
    itemQuaintity.innerHTML = `На складе: ${Number(PRODUCTS.remainder) - PRODUCTS.quantity}`;

    const itemCounter: HTMLElement = createElem('div', 'cart-item__counter');

    const minusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
    minusBtn.innerHTML = '-';

    const itemCounterQty: HTMLElement = createElem('div', 'cart-item__counter-qty');
    itemCounterQty.innerHTML = `${PRODUCTS.quantity}`;

    const plusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
    plusBtn.innerHTML = '+';

    itemCounter.append(minusBtn, itemCounterQty, plusBtn);

    itemQuaintityContainer.append(itemQuaintity, itemCounter);

    // Цена товара
    const itemPrice: HTMLElement = renderProductPrice(PRODUCTS.product, 'cart', PRODUCTS.quantity);

    plusBtn.onclick = () => {
      const findedProduct = findProduct(PRODUCTS.product.id, PRODUCTS.size) as CartData;

      if (findedProduct.quantity >= (findedProduct.remainder as number)) {
        plusBtn.setAttribute('disabled', 'true'); // делаем кнопку неактивной
        itemQuaintity.classList.add('quaintity-remainder'); // добавляем стиль
        return;
      }

      findedProduct.quantity++;
      itemCounterQty.innerHTML = String(findedProduct.quantity);

      productsCartData.count++;
      itemCounterQty.innerHTML = String(findedProduct.quantity);
      itemQuaintity.innerHTML = `На складе: ${Number(PRODUCTS.remainder) - findedProduct.quantity}`;

      const updatedItem = [
        itemLink,
        itemQuaintityContainer,
        renderProductPrice(PRODUCTS.product, 'cart', findedProduct.quantity),
      ];

      setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);

      updateComponent(item, ...updatedItem);
      updateHeader(productsCartData.count, productsCartData.productsInCart);

      let total = calcAmountCart(productsCartData.productsInCart); // общая сумма товаров в корзине
      total = total.replace(' ', '');
      updateTotalSumm(`${formatPriceNum(total)} ₽`, calcDiscount(total, promocodeStorage.discount));
    };

    minusBtn.onclick = () => {
      let index = 0;

      const findedProduct = productsCartData.productsInCart.find((data, i) => {
        index = i; // получаем индекс найденного товара в массиве
        return PRODUCTS.product.id === data.product.id && String(data.size) === PRODUCTS.size;
      }) as CartData;

      findedProduct.quantity--;
      itemCounterQty.innerHTML = String(findedProduct.quantity);
      itemQuaintity.innerHTML = `На складе: ${Number(PRODUCTS.remainder) - findedProduct.quantity}`;

      plusBtn.removeAttribute('disabled'); // делаем кнопку увеличения активной
      itemQuaintity.classList.remove('quaintity-remainder');

      productsCartData.count--;

      if (findedProduct.quantity === 0) {
        productsCartData.productsInCart.splice(index, 1); // удаляем товар из массива
        updateСartItemsContainer();
      }

      item.innerHTML = '';
      const itemPrice: HTMLElement = renderProductPrice(PRODUCTS.product, 'cart', findedProduct.quantity);
      // здесь же можно обновить данные о кол-ве товара
      item.append(itemLink, itemQuaintityContainer, itemPrice);
      const updatedItem = [
        itemLink,
        itemQuaintityContainer,
        renderProductPrice(PRODUCTS.product, 'cart', findedProduct.quantity),
      ];

      setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);

      updateComponent(item, ...updatedItem);
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
    };

    item.append(itemLink, itemQuaintityContainer, itemPrice);
    cartItems.append(item);
  });

  return cartItems;
};
