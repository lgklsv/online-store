import { space } from '../../../../../../../../const/store-name';
import { createElem } from '../../../../../../../../utils/create-element';
import { createLink } from '../../../../../../../../utils/create-link-element';
import styles from './InfoOrderProducts.module.scss';

export const renderOrderAddCart = (product: ExtendedProduct): ReturnElements => {
    // Добавить в корзину
    const productActions: HTMLElement = createElem('div', styles['product-page__actions']);
    const productOrder: HTMLElement = createElem('button', styles['product-page__order']);
    const orderTitle: HTMLElement = createElem('span', styles['product-page__order-title']);
    const orderSize: HTMLElement = createElem('span', styles['product-page__order-size']);

    productOrder.append(orderTitle, orderSize);

    orderTitle.innerHTML = 'Добавить в корзину';
    orderSize.innerHTML = product.sizes[0];

    productActions.append(productOrder);

    return { productActions, orderSize };
};

export const renderOrderProductQuantity = (countProduct: number): HTMLElement => {
    // Измененная кнопка с кол-вом
    const productCardMore: HTMLElement = createElem('div', styles['product-page__cart-more']);
    const productCartIconMinus: HTMLElement = createElem('button', styles['product-page__cart-icon']);
    productCartIconMinus.innerHTML = '–';
    const productCartIconPlus: HTMLElement = createElem('button', styles['product-page__cart-icon']);
    productCartIconPlus.innerHTML = '+';
    const productCartDescriptions: HTMLElement = createElem('span', styles['product-page__cart-descriptions']);
    productCartDescriptions.innerHTML = String(countProduct) + `${space}` + 'в корзине';

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

interface ReturnElements {
    [key: string]: HTMLElement;
}
