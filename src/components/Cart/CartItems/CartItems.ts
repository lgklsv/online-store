import styles from './CartItems.module.scss';
import { createElem } from '../../../utils/create-element';
import { renderProductPrice } from '../../PageMain/components/MainCatalog/components/ProductPrice/ProductPrice';
import { pagination } from '../../../const/store';
import { newNameProduct } from '../../../utils/edit-name-products';
import { onClickMinus } from './handlers/onClickMinus';
import { onClickPlus } from './handlers/onClickPlus';

export const renderCartItems = (curPageItems: CartData[]): HTMLElement => {
  const cartItems: HTMLElement = createElem('div', styles['cart__items']);

  curPageItems.forEach((item, i) => {
    const itemEl: HTMLElement = createElem('div', 'cart-item');

    // Ссылка на товар
    const itemLink: HTMLElement = createElem('a', 'cart-item__link');
    itemLink.setAttribute('href', `/product/${item.product.id}`);
    itemLink.setAttribute('target', '_blank');

    const itemIndex = i + 1 + (pagination.page - 1) * pagination.limit;

    // Номер товара в корзине
    const itemNumber: HTMLElement = createElem('div', 'cart-item__number');
    itemNumber.innerHTML = itemIndex.toString();

    // Картинка товара
    const itemImage: HTMLElement = createElem('img', 'cart-item__image');
    itemImage.setAttribute('src', `${item.product.thumbnail}`);
    itemImage.setAttribute('alt', `${item.product.title}`);

    // Название товара
    const itemTitleContainer: HTMLElement = createElem('div', 'cart-item__heading');

    const itemBrand: HTMLElement = createElem('h2', 'cart-item__brand');
    itemBrand.innerHTML = `${item.product.brand}`;
    const itemTitle: HTMLElement = createElem('p', 'cart-item__title');
    itemTitle.innerHTML = `${newNameProduct(item.product.brand, item.product.title)}`;

    // Размер товара
    const info: HTMLElement = createElem('div', 'cart-item__info-container');

    const itemSize: HTMLElement = createElem('p', 'cart-item__size');
    itemSize.innerHTML = `Размер: ${item.size}`;

    const productRating = createElem('div', 'cart-item__raiting');
    productRating.innerHTML = `Рейтинг:${String(item.product.rating)}`;

    info.append(itemSize, productRating);
    itemTitleContainer.append(itemBrand, itemTitle, info);

    itemLink.append(itemNumber, itemImage, itemTitleContainer);

    // Количество товара и добавление количества
    const itemQuaintityContainer: HTMLElement = createElem('div', 'cart-item__quaintity-container');

    const itemQuaintity: HTMLElement = createElem('p', 'cart-item__quaintity');
    itemQuaintity.innerHTML = `На складе: ${Number(item.remainder) - item.quantity}`;

    const itemCounter: HTMLElement = createElem('div', 'cart-item__counter');

    const minusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
    minusBtn.innerHTML = '-';

    const itemCounterQty: HTMLElement = createElem('div', 'cart-item__counter-qty');
    itemCounterQty.innerHTML = `${item.quantity}`;

    const plusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
    plusBtn.classList.add('plus-btn');
    plusBtn.innerHTML = '+';

    itemCounter.append(minusBtn, itemCounterQty, plusBtn);

    itemQuaintityContainer.append(itemQuaintity, itemCounter);

    // Цена товара
    const itemPrice: HTMLElement = renderProductPrice(item.product, 'cart', item.quantity);

    plusBtn.onclick = (event: Event) => onClickPlus(event, item);

    minusBtn.onclick = (event: Event) => onClickMinus(event, item);

    itemEl.append(itemLink, itemQuaintityContainer, itemPrice);
    cartItems.append(itemEl);
  });

  return cartItems;
};
