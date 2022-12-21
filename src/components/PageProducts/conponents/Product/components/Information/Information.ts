import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import styles from './Information.module.scss';

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    const informationContainer: HTMLElement = createElem('div', styles['product-page__info-container']);
    const informationCard: HTMLElement = createElem('div', styles['product-page__card']);

    // заголовок
    const headerWrapper: HTMLElement = createElem('div', styles['product-page__header-wrapper']);
    const headerProduct: HTMLElement = createElem('h1', styles['product-page__header']);
    headerProduct.innerHTML = product.brand;
    const descrProduct: HTMLElement = createElem('h3', styles['product-page__header-descrip']);
    descrProduct.innerHTML = `${product.sex}  ${product.category} ${newNameProduct(product.brand, product.title)}`;

    headerWrapper.append(headerProduct, descrProduct);

    // размерный ряд
    const sizeWrapp: HTMLElement = createElem('div', styles['product-page__size-wrapper']);
    const sizeTitle: HTMLElement = createElem('h1', styles['product-page__size-title']);
    sizeTitle.innerHTML = 'Доступные размеры';
    const sizePlate: HTMLElement = createElem('h3', styles['product-page__size-plate']);

    product.sizes.forEach((elem) => {
        const productSize: HTMLElement = createElem('div', styles['product-page__sizes']);
        productSize.innerHTML = elem;
        sizePlate.append(productSize);
    });

    sizeWrapp.append(sizeTitle, sizePlate);

    informationCard.append(headerWrapper, sizeWrapp);

    informationContainer.append(informationCard);

    return informationContainer;
};
