import { createElem } from '../../../../../../../../utils/create-element';
import { updateInfoProd } from '../../Information';
import styles from './InfoSize.module.scss';
import { productCardBuilder } from './product-cart-builder';

export const helperForSize: HelperSize = {
    activSize: '', // флаг размера, сравниваем с текущим
    countSizeProducts: 1,
    sizeForData: '',
};

export const renderSize = (product: ExtendedProduct, orderSize: HTMLElement): HTMLElement => {
    const sizeWrapp: HTMLElement = createElem('div', styles['product-page__size-wrapper']);
    const sizeTitle: HTMLElement = createElem('h1', styles['product-page__size-title']);
    sizeTitle.innerHTML = 'Доступные размеры';
    const sizePlate: HTMLElement = createElem('h3', styles['product-page__size-plate']);

    product.sizes.forEach(
        productCardBuilder({
            product,
            sizeContainer: sizePlate,
            orderSize,
            onFoundProduct: (count) => updateInfoProd(product, true, count),
            onNotFoundProduct: (count) => updateInfoProd(product, false, count),
        })
    );

    sizeWrapp.append(sizeTitle, sizePlate);
    return sizeWrapp;
};
