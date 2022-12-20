import { PRODUCTS } from '../../../../const/products';
import { createElem } from '../../../../utils/create-element';
import { renderProduct } from './components/ProductCard/ProductCard';
import styles from './MainCatalog.module.scss';

export const renderMainCatalog = (): HTMLElement => {
    const catalog: HTMLElement = createElem('div', styles['catalog']);
    const catalogWrapper: HTMLElement = createElem('div', styles['catalog_wrapper']);

    const catalogProduct: HTMLElement = createElem('div', styles['catalog_products']);

    for (let i = 0; i < PRODUCTS.length; i++) {
        const productCard: HTMLElement = renderProduct(PRODUCTS[i]);
        catalogProduct.append(productCard);
    }

    catalogWrapper.append(catalogProduct);
    catalog.append(catalogWrapper);

    return catalog;
};
