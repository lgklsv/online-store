import { createElem } from '../../../utils/create-element';
import styles from './CartItems.module.scss';
import { renderProductPrice } from '../../PageMain/components/MainCatalog/components/ProductPrice/ProductPrice';
import { productsCartData } from '../../../const/store';
import { renderEmptyCart } from './components/CartEmpty/CartEmpty';
import { newNameProduct } from '../../../utils/edit-name-products';

export const renderCartItems = (): HTMLElement => {
    const cartItems: HTMLElement = createElem('div', styles['cart__items']);

    if (productsCartData.count === 0) {
        cartItems.append(renderEmptyCart());
        return cartItems;
    }

    productsCartData.productsInCart.forEach((PRODUCTS, i) => {
        const item: HTMLElement = createElem('div', 'cart-item');

        // Ссылка на товар
        const itemLink: HTMLElement = createElem('a', 'cart-item__link');
        itemLink.setAttribute('href', `/product/${PRODUCTS.product.id}`);
        itemLink.setAttribute('target', '_blank');

        // Номер товара в корзине
        const itemNumber: HTMLElement = createElem('div', 'cart-item__number');
        itemNumber.innerHTML = (i + 1).toString();

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
        const itemSize: HTMLElement = createElem('p', 'cart-item__size');
        itemSize.innerHTML = `Размер: ${PRODUCTS.size}`;

        itemTitleContainer.append(itemBrand, itemTitle, itemSize);

        itemLink.append(itemNumber, itemImage, itemTitleContainer);

        // Количество товара и добавление количества
        const itemQuaintityContainer: HTMLElement = createElem('div', 'cart-item__quaintity-container');

        const itemQuaintity: HTMLElement = createElem('p', 'cart-item__quaintity');
        itemQuaintity.innerHTML = `На складе: ${PRODUCTS.product.stock}`;

        const itemCounter: HTMLElement = createElem('div', 'cart-item__counter');

        const minusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
        minusBtn.innerHTML = '-';

        const itemCounterQty: HTMLElement = createElem('div', 'cart-item__counter-qty');
        itemCounterQty.innerHTML = `${PRODUCTS.quantity}`;

        const plusBtn: HTMLElement = createElem('button', 'cart-item__counter-btn');
        plusBtn.innerHTML = '+';

        itemCounter.append(minusBtn, itemCounterQty, plusBtn);

        itemQuaintityContainer.append(itemQuaintity, itemCounter);
        console.log(PRODUCTS);

        //цена товара
        const itemPrice: HTMLElement = renderProductPrice(PRODUCTS.product, 'cart', PRODUCTS.quantity);

        item.append(itemLink, itemQuaintityContainer, itemPrice);
        cartItems.append(item);
    });

    return cartItems;
};
