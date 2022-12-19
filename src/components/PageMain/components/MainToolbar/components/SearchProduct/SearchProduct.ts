import styles from './SearchProduct.module.scss';
import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import { searchProdInput } from '../../../../../../utils/search-products';

export const renderSearchProduct = (): HTMLElement => {
    const searchProduct: HTMLElement = createElem('div', styles['toolbar__search-product']);
    const searchProductInput: HTMLInputElement = createInput('input', styles['search-product__input']);
    searchProductInput.setAttribute('type', 'text');
    searchProductInput.setAttribute('placeholder', 'Найти товар ...');

    searchProductInput.oninput = () => {
        let valueInput: string = searchProductInput.value.toLocaleLowerCase().trim();
        searchProdInput(valueInput);
    };

    searchProduct.append(searchProductInput);

    return searchProduct;
};
