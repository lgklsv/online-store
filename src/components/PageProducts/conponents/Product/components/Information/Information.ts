import { createElem } from '../../../../../../utils/create-element';
import styles from './Information.module.scss';

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    const toolbarProdPage: HTMLElement = createElem('div', styles['product-page__prod-container']);

    return toolbarProdPage;
};
