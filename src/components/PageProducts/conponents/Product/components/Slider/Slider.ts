import { createElem } from '../../../../../../utils/create-element';
import { renderInformationProduct } from '../Information/Information';
import styles from './Slider.module.scss';

export const rendreSliderProduct = (product: ExtendedProduct): HTMLElement => {
    const toolbarProdPage: HTMLElement = createElem('div', styles['product-page__prod-container']);

    const information = renderInformationProduct(product);

    toolbarProdPage.append(information);

    return toolbarProdPage;
};
