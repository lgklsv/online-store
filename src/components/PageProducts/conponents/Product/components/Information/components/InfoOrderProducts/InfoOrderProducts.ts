import { LOCAL_STORAGE_KEYS } from '../../../../../../../../const/local-storage';
import { productsCartData } from '../../../../../../../../const/store';
import { space } from '../../../../../../../../const/store-name';
import { addInCart } from '../../../../../../../../utils/add-in-cart';
import { createElem } from '../../../../../../../../utils/create-element';
import { createLink } from '../../../../../../../../utils/create-link-element';
import { setLocalStorage } from '../../../../../../../../utils/local-storage';
import { updateHeader } from '../../../../../../../../utils/update-cart';

import { updateInfoProd } from '../../Information';
import { helperForSize } from '../InfoSize/InfoSize';
import styles from './InfoOrderProducts.module.scss';

export const renderOrderAddCart = (product: ExtendedProduct, size: string): ReturnElements => {
    const productActions: HTMLElement = createElem('div', styles['product-page__actions']);
    const productOrder: HTMLElement = createElem('button', styles['product-page__order']);
    const orderTitle: HTMLElement = createElem('span', styles['product-page__order-title']);
    const orderSize: HTMLElement = createElem('span', styles['product-page__order-size']);

    productOrder.append(orderTitle, orderSize);
    orderTitle.innerHTML = 'Добавить в корзину';

    if (size === '') {
        orderSize.innerHTML = product.sizes[0];
    } else orderSize.innerHTML = size;

    productActions.append(productOrder);

    productOrder.onclick = () => {
        addInCart(product, helperForSize);
        // productsCartData.count++;

        // const productData: CartData = {
        //     product: product,
        //     size: helperForSize.sizeForData,
        //     quantity: helperForSize.countSizeProducts,
        // };

        // productsCartData.productsInCart.push(productData); //изменяем глобальный объект
        // setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT); //обновляем Local Storage

        // updateHeader(productsCartData.count, productsCartData.productsInCart); // изменения данных в хэдере
        // updateInfoProd(product, true, helperForSize.countSizeProducts);
    };

    return { productActions, orderSize, productOrder };
};

export const renderOrderProductQuantity = (
    countProduct: number,
    activeSize: string,
    product: ExtendedProduct
): HTMLElement => {
    const productCardMore: HTMLElement = createElem('div', styles['product-page__cart-more']);
    const productCartIconMinus: HTMLElement = createElem('button', styles['product-page__cart-icon']);
    productCartIconMinus.innerHTML = '–';

    const productCartIconPlus: HTMLElement = createElem('button', styles['product-page__cart-icon']);
    productCartIconPlus.innerHTML = '+';

    const productCartDescriptions: HTMLElement = createElem('span', styles['product-page__cart-descriptions']);
    productCartDescriptions.innerHTML = String(countProduct) + `${space}` + 'в корзине';

    productCartIconPlus.onclick = () => {
        productsCartData.count++;

        const findedProduct = productsCartData.productsInCart.find((data) => {
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity++;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине';
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
        updateHeader(productsCartData.count, productsCartData.productsInCart);
    };

    productCartIconMinus.onclick = () => {
        let index = 0;
        const findedProduct = productsCartData.productsInCart.find((data, i) => {
            index = i; // получаем индекс найденного товара в массиве
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity--;

        if (findedProduct.quantity === 0) {
            productsCartData.productsInCart.splice(index, 1); // удаляем товар из массива
            updateInfoProd(product, false, findedProduct.quantity);
        }

        productsCartData.count--;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине';
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
        updateHeader(productsCartData.count, productsCartData.productsInCart); //обновили элемент корзины
    };

    productCardMore.append(productCartIconMinus, productCartDescriptions, productCartIconPlus);
    return productCardMore;
};

export const renderOrderButton = (): HTMLElement => {
    const productCartLink: HTMLElement = createLink(
        '/cart',
        styles['product-order__checkout'],
        false,
        'Оформить заказ'
    );
    productCartLink.classList.add(styles['product-page__order']);
    return productCartLink;
};
