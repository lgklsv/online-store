import { createElem } from '../../../../../../utils/create-element';
import styles from './ProductPrice.module.scss';
import { newPrice } from '../../../../../../utils/edit-price';
import { formatPriceNum } from '../../../../../../utils/format-price';

export const renderProductPrice = (product: Product, page: string, quantity?: number): HTMLElement => {
    const itemPrice: HTMLElement = createElem('div', styles['product-card__price']);
    const productPriceFull: HTMLElement = createElem('span', 'product-card__price-full');
    if (page === 'cart') {
        itemPrice.classList.add('product-card__price_cart');
        quantity && (productPriceFull.innerHTML = formatPriceNum(product.price * quantity) + ' ₽');
    } else {
        productPriceFull.innerHTML = formatPriceNum(product.price) + ' ₽';
    }

    // проверка есть ли скидка
    if (product.discountPercentage !== 0) {
        const productPriceDiscount: HTMLElement = createElem('span', 'product-card__price-discount');
        productPriceFull.classList.add('old-price');
        productPriceDiscount.innerHTML = '–' + String(product.discountPercentage) + '%';

        const productPriceNew: HTMLElement = createElem('div', 'product-card__price-new');

        if (page === 'cart') {
            productPriceNew.classList.add('product-card__price-new_cart');
            quantity &&
                (productPriceNew.innerHTML =
                    formatPriceNum(Number(newPrice(product.price, product.discountPercentage)) * quantity) + ' ₽');
        } else {
            productPriceNew.innerHTML = formatPriceNum(newPrice(product.price, product.discountPercentage)) + ' ₽';
        }

        itemPrice.append(productPriceFull, productPriceDiscount, productPriceNew); //
    } else itemPrice.append(productPriceFull); //

    return itemPrice;
};
