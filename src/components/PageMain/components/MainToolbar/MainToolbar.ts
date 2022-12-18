import { PRODUCTS } from '../../../../const/products';
import { createElem } from '../../../../utils/create-element';
import { renderSelectSort } from './components/SelectSort/SelectSort';
import styles from './MainToolbar.module.scss';

export const renderMainToolbar = (): HTMLElement => {
    const mainToolbar: HTMLElement = createElem('div', styles['main__toolbar']);

    const selectSort: HTMLElement = renderSelectSort();
    const productQuantity: HTMLElement = createElem('div', styles['toolbar__quantity']);
    productQuantity.innerHTML = `FOUND: ${String(PRODUCTS.length)}`;

    mainToolbar.append(productQuantity, selectSort);

    return mainToolbar;
};
