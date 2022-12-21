import { createElem } from '../../utils/create-element';
import { renderProduct } from './conponents/Product/Product';
import { renderProductPageToolbar } from './conponents/Toolbar/Toolbar';
import styles from './PageProducts.module.scss';

export const renderProductPage = (product: ExtendedProduct): HTMLElement => {
    const main: HTMLElement = createElem('main', styles['main']);
    const pageProdContainer: HTMLElement = createElem('div', styles['page-main__container']);

    const toolbar: HTMLElement = renderProductPageToolbar(product);
    const productData: HTMLElement = renderProduct(product);

    pageProdContainer.append(toolbar, productData);

    main.append(pageProdContainer);

    return main;
};
