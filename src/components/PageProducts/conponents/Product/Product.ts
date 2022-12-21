import { createElem } from '../../../../utils/create-element';
import { renderInformationProduct } from './components/Information/Information';
import { rendreSliderProduct } from './components/Slider/Slider';
import styles from './Product.module.scss';

export const renderProduct = (product: ExtendedProduct): HTMLElement => {
    const toolbarProdPage: HTMLElement = createElem('div', styles['product-page__prod-container']);

    const slider = rendreSliderProduct(product);
    const information = renderInformationProduct(product);

    toolbarProdPage.append(slider, information);

    return toolbarProdPage;
};
