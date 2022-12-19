import styles from './SearchProduct.module.scss';
import { createElem } from '../../../../../../utils/create-element';

export const renderSearchProduct = (): HTMLElement => {
    const searchProduct: HTMLElement = createElem('div', styles['toolbar__search-product']);
    const searchProductInput: HTMLElement = createElem('input', styles['search-product__input']);
    searchProductInput.setAttribute('type', 'text');
    searchProductInput.setAttribute('placeholder', 'Найти товар ...');

    // TODO - добавить функционал поиска

    searchProduct.append(searchProductInput);

    return searchProduct;
};
