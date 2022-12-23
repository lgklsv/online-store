import { createElem } from '../../../../../../utils/create-element';
import styles from './Slider.module.scss';

export const rendreSliderProduct = (product: ExtendedProduct): HTMLElement => {
    console.log(product);
    const sliderContainer: HTMLElement = createElem('div', styles['product-page__slider-container']);

    // главное фото
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

    zoomRegion.onclick = () => {
        zoomRegion.classList.toggle('cursor');

        if (zoomRegion.classList.contains('cursor')) {
            productImage.style.transform = `translate(-50%, -50%) scale(2)`;
        }

        zoomRegion.onmousemove = (event) => {
            if (!zoomRegion.classList.contains('cursor')) {
                return (productImage.style.transform = `translate(-50%, -50%) scale(1)`);
            } else {
                let clientX = event.clientX - zoomRegion.offsetLeft;
                let clientY = event.clientY - zoomRegion.offsetTop;
                let mWidth = zoomRegion.offsetWidth;
                let mHeight = zoomRegion.offsetHeight;
                clientX = (clientX / mWidth) * 100;
                clientY = (clientY / mHeight) * 100;

                productImage.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`;
            }
        };

        zoomRegion.onmouseleave = (event) => {
            productImage.style.transform = `translate(-50%, -50%) scale(1)`;
        };
    };

    // мини галерея
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

        slideMini.onclick = () => {
            productImage.setAttribute('src', img);
        };
    });

    sliderLeft.append(sliderMiniGalery);

    sliderContainer.append(sliderLeft, sliderRight);

    return sliderContainer;
};
