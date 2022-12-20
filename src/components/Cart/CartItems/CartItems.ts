import { createElem } from '../../../utils/create-element';
import styles from './CartItems.module.scss';
import { PRODUCTS } from '../../../const/products';
import { renderProductPrice } from '../../PageMain/components/MainToolbar/components/ProductPrice/ProductPrice';
// import { renderEmptyCart } from './components/CartEmpty/CartEmpty';

export const renderCartItems = (): HTMLElement => {
    const cartItems: HTMLElement = createElem('div', styles['cart__items']);

    // Тут будет если длина равна 0, то рендерим сообщение что в корзине пусто 
    const cartItemsTemp = 3;
    // if (cartItemsTemp === 0) {
    //     cartItems.append(renderEmptyCart());
    //     return cartItems;
    // }

    for (let i = 0; i < cartItemsTemp; i++) {
        const item: HTMLElement = createElem('div', 'cart-item');

        // Ссылка на товар 
        const itemLink: HTMLElement = createElem('a', 'cart-item__link');
        itemLink.setAttribute('href', `/product/${PRODUCTS[i].id}`);
        itemLink.setAttribute('target', '_blank');

        // Номер товара в корзине
        const itemNumber: HTMLElement = createElem('div', 'cart-item__number');
        itemNumber.innerHTML = (i + 1).toString();

        // Картинка товара
        const itemImage: HTMLElement = createElem('img', 'cart-item__image');
        itemImage.setAttribute('src', `${PRODUCTS[i].thumbnail}`);
        itemImage.setAttribute('alt', `${PRODUCTS[i].title}`);

        // Название товара
        const itemTitleContainer: HTMLElement = createElem('div', 'cart-item__heading');
        const itemBrand: HTMLElement = createElem('h2', 'cart-item__brand');
        itemBrand.innerHTML = `${PRODUCTS[i].brand}`;
        const itemTitle: HTMLElement = createElem('p', 'cart-item__title');
        itemTitle.innerHTML = `${PRODUCTS[i].title}`;

        itemTitleContainer.append(itemBrand, itemTitle);

        itemLink.append(itemNumber, itemImage, itemTitleContainer);

        // Количество товара и добавление количества
        const itemQuaintityContainer: HTMLElement = createElem('div', 'cart-item__quaintity-container');

        const itemQuaintity: HTMLElement = createElem('p', 'cart-item__quaintity');
        itemQuaintity.innerHTML = `На складе: ${PRODUCTS[i].stock}`;

        const itemCounter: HTMLElement = createElem('div', 'cart-item__counter');

        const minusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
        minusBtn.innerHTML = '-';

        const itemCounterQty: HTMLElement = createElem('div', 'cart-item__counter-qty');
        itemCounterQty.innerHTML = '1';

        const plusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
        plusBtn.innerHTML = '+';

        itemCounter.append(minusBtn, itemCounterQty, plusBtn);

        itemQuaintityContainer.append(itemQuaintity, itemCounter);

        //цена товара
        const itemPrice: HTMLElement = renderProductPrice(PRODUCTS[i], 'cart');

        item.append(itemLink, itemQuaintityContainer, itemPrice);

        cartItems.append(item);
    }
    return cartItems;
};
