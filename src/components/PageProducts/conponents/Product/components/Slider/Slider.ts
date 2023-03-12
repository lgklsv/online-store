import { createElem } from '../../../../../../utils/create-element';
import styles from './Slider.module.scss';

export const rendreSliderProduct = (product: ExtendedProduct): HTMLElement => {
  const sliderContainer: HTMLElement = createElem('div', styles['product-page__slider-container']);

  // главное фото
  const sliderRight: HTMLElement = createElem('div', styles['product-page__slider-right']);
  const sliderGalery: HTMLElement = createElem('div', styles['slider-right__galery']);
  const sliderRigthWrapper: HTMLElement = createElem('div', styles['slider-right__wrapper']);
  const zoomContainer: HTMLElement = createElem('div', styles['zoom_container']);
  const zoomRegion: HTMLElement = createElem('div', styles['zoom_region']);
  const productImage: HTMLElement = createElem('img', styles['product-image']);
  productImage.setAttribute('src', product.thumbnail);
  productImage.setAttribute('alt', product.title);

  zoomRegion.append(productImage);

  zoomContainer.append(zoomRegion);
  sliderRigthWrapper.append(zoomContainer);
  sliderGalery.append(sliderRigthWrapper);
  sliderRight.append(sliderGalery);

  zoomRegion.onclick = () => {
    zoomRegion.classList.toggle(styles['cursor']);

    if (zoomRegion.classList.contains('cursor')) {
      productImage.style.transform = `translate(-50%, -50%) scale(2)`;
    }

    zoomRegion.onmousemove = (event) => {
      if (!zoomRegion.classList.contains('cursor')) {
        return (productImage.style.transform = `translate(-50%, -50%) scale(1)`);
      }
      let clientX: number = event.clientX - zoomRegion.offsetLeft;
      let clientY: number = event.clientY - zoomRegion.offsetTop;
      const mWidth: number = zoomRegion.offsetWidth;
      const mHeight: number = zoomRegion.offsetHeight;
      clientX = (clientX / mWidth) * 100;
      clientY = (clientY / mHeight) * 100;

      productImage.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`;
    };

    zoomRegion.onmouseleave = () => {
      productImage.style.transform = `translate(-50%, -50%) scale(1)`;
    };
  };

  // мини галерея
  const sliderLeft: HTMLElement = createElem('div', styles['product-page__slider-left']);
  const sliderMiniGalery: HTMLElement = createElem('div', styles['slider-left__container']);
  const arraySliders: HTMLElement[] = [];

  product.images.forEach((img, i) => {
    const slideMini: HTMLElement = createElem('div', styles['slider-left__wrapper']);
    const slideMiniImg: HTMLElement = createElem('div', styles['slider-left__wrapper_img']);
    const image: HTMLElement = createElem('img', styles['product-mini-img']);
    image.setAttribute('src', img);

    slideMiniImg.append(image);
    slideMini.append(slideMiniImg);
    sliderMiniGalery.append(slideMini);

    arraySliders.push(slideMiniImg);

    if (i === 0) {
      slideMiniImg.classList.add(styles['active-img']);
    }

    slideMini.onclick = () => {
      arraySliders.forEach((wrap) => {
        wrap.classList.remove('active-img');
      });
      slideMiniImg.classList.add(styles['active-img']);
      productImage.setAttribute('src', img);
    };
  });

  sliderLeft.append(sliderMiniGalery);

  sliderContainer.append(sliderLeft, sliderRight);

  return sliderContainer;
};
