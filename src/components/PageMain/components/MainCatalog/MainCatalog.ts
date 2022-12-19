import { PRODUCTS } from '../../../../const/products';
import { createElem } from '../../../../utils/create-element';
import { editPrice, newPrice } from '../../../../utils/edit-price';
import styles from './MainCatalog.module.scss';

export const renderMainCatalog = (): HTMLElement => {
    const catalog: HTMLElement = createElem('div', styles['catalog']);
    const catalogWrapper: HTMLElement = createElem('div', styles['catalog_wrapper']);

    const catalogProduct: HTMLElement = createElem('div', styles['catalog_products']);

    for (let i = 0; i < PRODUCTS.length; i++) {
        console.log();
        const productCard: HTMLElement = createElem('div', 'products-card');

        // оберка ссылки - здесь же ховер
        const productLink: HTMLElement = createElem('a', 'products-card__link');
        productLink.setAttribute('href', `/product/${PRODUCTS[i].id}`);
        productLink.setAttribute('target', '_blank');

        const productBodyWrapper = createElem('div', 'product-card__body-wrapper');

        // изображение товара
        const productImg: HTMLElement = createElem('div', 'product-card__image');

        const img: HTMLElement = createElem('img', 'image-product');
        img.setAttribute('src', PRODUCTS[i].thumbnail);

        productImg.append(img);

        // описание товара
        const productDesc: HTMLElement = createElem('div', 'product-card__descriptions');
        const productTitle: HTMLElement = createElem('div', 'product-card__title');
        productTitle.innerHTML = PRODUCTS[i].title;
        const productPrice: HTMLElement = createElem('div', 'product-card__price');
        const productPriceFull: HTMLElement = createElem('span', 'product-card__price-full');
        productPriceFull.innerHTML = String(PRODUCTS[i].price) + ' ₽'; //TODO - выводить цену с знаком рубля

        // проверка есть ли скидка
        if (PRODUCTS[i].discountPercentage !== 0) {
            const productPriceDiscount: HTMLElement = createElem('span', 'product-card__price-discount');
            productPriceFull.classList.add('old-price');
            productPriceDiscount.innerHTML = '–' + String(PRODUCTS[i].discountPercentage) + '%';

            const productPriceNew: HTMLElement = createElem('div', 'product-card__price-new');
            productPriceNew.innerHTML = newPrice(PRODUCTS[i].price, PRODUCTS[i].discountPercentage) + ' ₽';

            productPrice.append(productPriceFull, productPriceDiscount, productPriceNew);
        } else productPrice.append(productPriceFull);

        editPrice(PRODUCTS[i].price);

        productDesc.append(productTitle, productPrice);

        productBodyWrapper.append(productImg, productDesc);

        productLink.append(productBodyWrapper);

        productCard.append(productLink);

        catalogProduct.append(productCard);
    }

    catalogWrapper.append(catalogProduct);
    catalog.append(catalogWrapper);

    return catalog;
};
