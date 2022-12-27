import { createElem } from '../../../utils/create-element';
import styles from './CartItems.module.scss';
import { renderProductPrice } from '../../PageMain/components/MainCatalog/components/ProductPrice/ProductPrice';
import { productsCartData } from '../../../const/store';
import { renderEmptyCart } from './components/CartEmpty/CartEmpty';
import { newNameProduct } from '../../../utils/edit-name-products';
import { setLocalStorage } from '../../../utils/local-storage';
import { LOCAL_STORAGE_KEYS } from '../../../const/local-storage';
import { updateHeader } from '../../../utils/update-cart';
import { findProduct } from '../../../utils/find-products';
import { calcAmountCart } from '../../../utils/calculate-amount-cart';
import { renderCartCheckoutReceipt } from '../CartCheckout/components/CartCheckoutReceipt/CartCheckoutReceipt';
import { updateComponent } from '../../../utils/update-component';

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

        //цена товара
        const itemPrice: HTMLElement = renderProductPrice(PRODUCTS.product, 'cart', PRODUCTS.quantity);

        plusBtn.onclick = () => {
            console.log('Нажимаю кнопочку +');
            productsCartData.count++;

            const findedProduct = findProduct(PRODUCTS.product.id, PRODUCTS.size) as CartData;
            findedProduct.quantity++;

            itemCounterQty.innerHTML = String(findedProduct.quantity);
            setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
            updateHeader(productsCartData.count, productsCartData.productsInCart);

            // обновить цену товара
            item.innerHTML = '';
            const itemPrice: HTMLElement = renderProductPrice(PRODUCTS.product, 'cart', findedProduct.quantity);
            // здесь же можно обновить данные о кол-ве товара
            item.append(itemLink, itemQuaintityContainer, itemPrice);

            // обновить глобальну цену
            updateTotalSumm(`${calcAmountCart(productsCartData.productsInCart)} ₽`);
            // обновить данные о кол-ве товара
        };

        item.append(itemLink, itemQuaintityContainer, itemPrice);
        cartItems.append(item);
    });

    return cartItems;
};

export const updateTotalSumm = (sum: string, total?: string) => {
    const parent = document.querySelector('.cart__checkout') as HTMLElement;

    const checkoutQty: HTMLElement = renderCartCheckoutReceipt('Количество', `${productsCartData.count}`, false);

    const checkoutSum: HTMLElement = renderCartCheckoutReceipt('Сумма', sum, false); // Данные будут приходить из обекта товаров корзины

    const checkoutTotal: HTMLElement = renderCartCheckoutReceipt('Итого', total ?? sum, true); // Данные будут рассчитываться с учетом промокода

    const updatedCheckout = [
        parent.firstChild as ChildNode,
        checkoutQty,
        checkoutSum,
        checkoutTotal,
        parent.lastChild as ChildNode,
    ];

    updateComponent(parent, ...(updatedCheckout as HTMLElement[]));
};

// const updateSummProduct = (product: ExtendedProduct, quantity: number, node: HTMLElement) => {
//     const itemPrice: HTMLElement = renderProductPrice(product, 'cart', quantity);
// };
