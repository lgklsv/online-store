import { LOCAL_STORAGE_KEYS } from '../../../../../../../../const/local-storage';
import { productsCartData } from '../../../../../../../../const/store';
import { space } from '../../../../../../../../const/store-name';
import { createElem } from '../../../../../../../../utils/create-element';
import { createLink } from '../../../../../../../../utils/create-link-element';
import { setLocalStorage } from '../../../../../../../../utils/local-storage';
import { updateHeaderCount } from '../../../../../../../../utils/update-cart';
import { helperForSize, updateInfoProd } from '../../Information';
import styles from './InfoOrderProducts.module.scss';

export const renderOrderAddCart = (product: ExtendedProduct, size: string): ReturnElements => {
    // Добавить в корзину

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
        console.log('Добавили в корзину');
        productsCartData.count++;

        const productData: CartData = {
            product: product,
            size: helperForSize.sizeForData,
            quantity: helperForSize.countSizeProducts,
        };

        productsCartData.productsInCart.push(productData); //изменяем глобальный объект

        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);

        updateHeaderCount(productsCartData.count); // изменения данных в хэдере
        updateInfoProd(product, true, helperForSize.countSizeProducts);
    };

    return { productActions, orderSize, productOrder };
};

export const renderOrderProductQuantity = (
    countProduct: number,
    activeSize: string,
    product: ExtendedProduct
): HTMLElement => {
    // Измененная кнопка с кол-вом
    const productCardMore: HTMLElement = createElem('div', styles['product-page__cart-more']);
    const productCartIconMinus: HTMLElement = createElem('button', styles['product-page__cart-icon']);
    productCartIconMinus.innerHTML = '–';

    const productCartIconPlus: HTMLElement = createElem('button', styles['product-page__cart-icon']);
    productCartIconPlus.innerHTML = '+';

    const productCartDescriptions: HTMLElement = createElem('span', styles['product-page__cart-descriptions']);
    productCartDescriptions.innerHTML = String(countProduct) + `${space}` + 'в корзине';

    productCartIconPlus.onclick = () => {
        productsCartData.count++; // обновили общий счетчик
        updateHeaderCount(productsCartData.count); //обновили элемент корзины

        const findedProduct = productsCartData.productsInCart.find((data) => {
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity++;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине'; // обновить данные внутри блока
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);

        // console.log(productsCartData);
    };

    productCartIconMinus.onclick = () => {
        let index = 0;
        const findedProduct = productsCartData.productsInCart.find((data, i) => {
            index = i;
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity--;

        if (findedProduct.quantity === 0) {
            productsCartData.productsInCart.splice(index, 1);
            updateInfoProd(product, false, findedProduct.quantity); //перерендерить страницу
        }

        productsCartData.count--;
        updateHeaderCount(productsCartData.count); //обновили элемент корзины

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине'; // обновить данные внутри блока
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
    };

    productCardMore.append(productCartIconMinus, productCartDescriptions, productCartIconPlus);
    return productCardMore;
};

export const renderOrderButton = (): HTMLElement => {
    // Кнопка перехода в корзину
    const productCartLink: HTMLElement = createLink(
        '/cart',
        styles['product-order__checkout'],
        false,
        'Оформить заказ'
    );
    productCartLink.classList.add(styles['product-page__order']);
    return productCartLink;
};

export const renderSize = (product: ExtendedProduct, orderSize: HTMLElement): HTMLElement => {
    const sizeWrapp: HTMLElement = createElem('div', styles['product-page__size-wrapper']);
    const sizeTitle: HTMLElement = createElem('h1', styles['product-page__size-title']);
    sizeTitle.innerHTML = 'Доступные размеры';
    const sizePlate: HTMLElement = createElem('h3', styles['product-page__size-plate']);
    const sizes: HTMLElement[] = [];

    product.sizes.forEach((elem, index) => {
        const productSize: HTMLElement = createElem('div', styles['product-page__sizes']);
        productSize.innerHTML = elem;
        sizes.push(productSize);

        if (index === 0) {
            helperForSize.sizeForData = elem;
            productSize.classList.add('active-size');
        }

        productSize.onclick = () => {
            helperForSize.sizeForData = elem;
            console.log(helperForSize, 'helperForSize');
            // если выбрали новый размер, должна снова появится кнопка добавить в корзину
            if (helperForSize.activSize !== elem) {
                // проверка данных из глобального объекта, чтобы понять добавляли ли мы этот размер в корзину или нет(проверка по id и размеру)
                const findedProduct = productsCartData.productsInCart.find((data) => {
                    return product.id === data.product.id && String(data.size) === elem;
                });

                console.log('findedProduct===', findedProduct);

                if (!findedProduct) {
                    console.log('данные НЕ совпадают');
                    updateInfoProd(product, false, helperForSize.countSizeProducts);
                } else {
                    console.log('данные совпадают', findedProduct);
                    updateInfoProd(product, true, findedProduct.quantity);
                }
            }

            // изменение стиля размера
            sizes.forEach((size) => {
                size.classList.remove('active-size');
            });

            productSize.classList.add('active-size');
            orderSize.innerHTML = elem; //изменяем содержимое кнопки
            helperForSize.activSize = elem;
        };

        sizePlate.append(productSize);
    });

    sizeWrapp.append(sizeTitle, sizePlate);
    return sizeWrapp;
};

interface ReturnElements {
    [key: string]: HTMLElement;
}
