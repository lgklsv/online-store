import { createElem } from '../../../../../../utils/create-element';
import styles from './ProductPrice.module.scss';
import { newPrice } from '../../../../../../utils/edit-price';

export const renderProductPrice = (product: Product, page: string): HTMLElement => {
    const itemPrice: HTMLElement = createElem('div', styles['product-card__price']);
    if (page === 'cart') itemPrice.classList.add('product-card__price_cart');
    const productPriceFull: HTMLElement = createElem('span', 'product-card__price-full');
    productPriceFull.innerHTML = String(product.price) + ' ₽';

    // проверка есть ли скидка
    if (product.discountPercentage !== 0) {
        const productPriceDiscount: HTMLElement = createElem('span', 'product-card__price-discount');
        productPriceFull.classList.add('old-price');
        productPriceDiscount.innerHTML = '–' + String(product.discountPercentage) + '%';

        const productPriceNew: HTMLElement = createElem('div', 'product-card__price-new');
        productPriceNew.innerHTML = newPrice(product.price, product.discountPercentage) + ' ₽';
        if (page === 'cart') productPriceNew.classList.add('product-card__price-new_cart');

        itemPrice.append(productPriceFull, productPriceDiscount, productPriceNew); //
    } else itemPrice.append(productPriceFull); //

    return itemPrice;
};
