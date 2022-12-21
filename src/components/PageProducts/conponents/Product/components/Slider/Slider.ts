import { createElem } from '../../../../../../utils/create-element';
import styles from './Slider.module.scss';

export const rendreSliderProduct = (product: ExtendedProduct): HTMLElement => {
    const sliderContainer: HTMLElement = createElem('div', styles['product-page__slider-container']);
    const sliderLeft: HTMLElement = createElem('div', styles['product-page__slider-left']);
    const sliderMiniGalery: HTMLElement = createElem('div', styles['slider-left__container']);

    product.images.forEach((img) => {
        const slideMini: HTMLElement = createElem('div', styles['slider-left__wrapper']);
        const slideMiniImg: HTMLElement = createElem('div', styles['slider-left__wrapper_img']);
        const image: HTMLElement = createElem('img', styles['product-mini-img']);
        image.setAttribute('src', img);

        slideMiniImg.append(image);
        slideMini.append(slideMiniImg);
        sliderMiniGalery.append(slideMini);
    });

    sliderLeft.append(sliderMiniGalery);

    const sliderRight: HTMLElement = createElem('div', styles['product-page__slider-right']);
    const sliderGalery: HTMLElement = createElem('div', styles['slider-right__galery']);
    const sliderRigthWrapper: HTMLElement = createElem('div', styles['slider-right__wrapper']);
    const zoomContainer: HTMLElement = createElem('div', styles['zoom_container']);
    const zoomRegion: HTMLElement = createElem('div', styles['zoom_region']);
    const productImage: HTMLElement = createElem('img', styles['product-image']);
    productImage.setAttribute('src', product.thumbnail);

    zoomRegion.append(productImage);

    zoomContainer.append(zoomRegion);
    sliderRigthWrapper.append(zoomContainer);
    sliderGalery.append(sliderRigthWrapper);
    sliderRight.append(sliderGalery);

    sliderContainer.append(sliderLeft, sliderRight);

    return sliderContainer;
};
