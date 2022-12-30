import { LOCAL_STORAGE_KEYS } from '../../../../../../../../const/local-storage';
import { productsCartData } from '../../../../../../../../const/store';
import { space } from '../../../../../../../../const/store-name';
import { addInCart } from '../../../../../../../../utils/add-in-cart';
import { createElem } from '../../../../../../../../utils/create-element';
import { createLink } from '../../../../../../../../utils/create-link-element';
import { findProduct } from '../../../../../../../../utils/find-products';
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
        updateInfoProd(product, true, helperForSize.countSizeProducts);
    };

    return { productActions, orderSize, productOrder };
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

interface RenderProductQuantity {
    countProduct: number;
    activeSize?: string;
    product: ExtendedProduct;
    onEmptyCount: () => void;
    page: string;
}

export const renderProductQuantity = ({
    countProduct = 1,
    activeSize = helperForSize.sizeForData,
    product,
    onEmptyCount,
    page = 'page',
}: RenderProductQuantity): HTMLElement => {
    const productCardMore: HTMLElement = createElem('div', styles[`product-${page}__cart-more`]);
    const productCartIconMinus: HTMLElement = createElem('button', styles[`product-${page}__cart-icon`]);
    productCartIconMinus.innerHTML = '–';

    const productCartIconPlus: HTMLElement = createElem('button', styles[`product-${page}__cart-icon`]);
    productCartIconPlus.innerHTML = '+';

    const productCartDescriptions: HTMLElement = createElem('span', styles[`product-${page}__cart-descriptions`]);
    productCartDescriptions.innerHTML = String(countProduct) + `${space}` + 'в корзине';

    productCartIconPlus.onclick = () => {
        const findedProduct = findProduct(product.id, activeSize) as CartData;
        if (findedProduct.quantity >= (findedProduct.remainder as number)) {
            productCartIconPlus.setAttribute('disabled', 'true'); // делаем кнопку неактивной
            productCartDescriptions.innerHTML = 'Этот размер закончился'; //выводим сообщение
            productCartDescriptions.classList.add('product-page__stop-order');

            setInterval(() => {
                productCartDescriptions.innerHTML = String(findedProduct.quantity) + `${space}` + 'в корзине';
                productCartDescriptions.classList.remove('product-page__stop-order');
            }, 3000); //возвращаем исходное значение кнопки

            return;
        }

        productsCartData.count++;

        findedProduct.quantity++;

        // Отнимает значения в блоке отображения кол-ва товаров
        // const a = document.querySelector('.product-page__data-item-value') as HTMLElement;
        // a.innerHTML = `${Number(findedProduct.remainder) - findedProduct.quantity}`;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине';
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
        updateHeader(productsCartData.count, productsCartData.productsInCart);
    };

    productCartIconMinus.onclick = () => {
        productCartIconPlus.removeAttribute('disabled'); //делаем кнопку увеличения активной
        // itemQuaintity.classList.remove('quaintity-remainder');

        let index = 0;
        const findedProduct = productsCartData.productsInCart.find((data, i) => {
            index = i; // получаем индекс найденного товара в массиве
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity--;

        if (findedProduct.quantity === 0) {
            productsCartData.productsInCart.splice(index, 1); // удаляем товар из массива
            onEmptyCount(); // кол-во равно нулю, возващаем кнопку добавить в корзину
        }

        productsCartData.count--;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине';
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
        updateHeader(productsCartData.count, productsCartData.productsInCart); //обновили элемент корзины
    };

    productCardMore.append(productCartIconMinus, productCartDescriptions, productCartIconPlus);
    return productCardMore;
};

export const renderStopOrder = (): HTMLElement => {
    const productStopOrder: HTMLElement = createElem('div', styles['product-page__stop-order']);
    productStopOrder.innerHTML = 'Это максимальное количество доступное для заказа';

    return productStopOrder;
};
