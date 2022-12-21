import { createElem } from '../../../../../../utils/create-element';
import styles from './Slider.module.scss';

export const rendreSliderProduct = (product: ExtendedProduct): HTMLElement => {
    const sliderContainer: HTMLElement = createElem('div', styles['product-page__slider-container']);
    const sliderLeft: HTMLElement = createElem('div', styles['product-page__slider-left']);
    const sliderRight: HTMLElement = createElem('div', styles['product-page__slider-right']);
    const sliderGalery: HTMLElement = createElem('div', styles['slider-right__galery']);

    sliderRight.append(sliderGalery);

    sliderContainer.append(sliderLeft, sliderRight);

    return sliderContainer;
};
