import { PRODUCTS } from '../../../../const/products';
import { createElem } from '../../../../utils/create-element';
import { editPrice } from '../../../../utils/edit-price';
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
        productPrice.innerHTML = String(PRODUCTS[i].price); //TODO - выводить цену с знаком рубля
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
