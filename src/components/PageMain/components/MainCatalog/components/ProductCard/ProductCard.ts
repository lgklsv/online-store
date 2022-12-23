import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import { newPrice } from '../../../../../../utils/edit-price';
import { renderProductPrice } from '../ProductPrice/ProductPrice';
import styles from './ProductCard.module.scss';

export const renderProduct = (DATA: Product) => {
    const productCard: HTMLElement = createElem('div', 'products-card');
    productCard.setAttribute(
        'data-product',
        `${DATA.title} ${newPrice(DATA.price, DATA.discountPercentage)} ${DATA.color}`
    );
    const productCardOverlay: HTMLElement = createElem('div', 'products-card__overlay');

    // оберка ссылки - здесь же ховер
    const productLink: HTMLElement = createElem('a', 'products-card__link');
    productLink.setAttribute('href', `/product/${DATA.id}`);
    productLink.setAttribute('target', '_blank');
    const productBodyWrapper = createElem('div', 'product-card__body-wrapper');

    // рейтинг товара(отображается на hover)
    const productRating = createElem('div', styles['product-card__raiting']);
    const productRatingContainer = createElem('div', styles['product-card__raiting-container']);
    const productRatingIcon = createElem('div', styles['product-card__raiting-icon']);
    const ratingIcon = createElem('div', styles['raiting-icon']);
    productRatingIcon.append(ratingIcon);
    const productRatingData = createElem('div', 'product-card__raiting-data');
    productRatingData.innerHTML = String(DATA.rating);
    productRatingContainer.append(productRatingIcon, productRatingData);
    productRating.append(productRatingContainer);

    // изображение товара
    const productImg: HTMLElement = createElem('div', 'product-card__image');
    const img: HTMLElement = createElem('img', 'image-product');
    img.setAttribute('src', DATA.thumbnail);

    productImg.append(img);

    // описание товара
    const productDesc: HTMLElement = createElem('div', 'product-card__descriptions');
    const productTitle: HTMLElement = createElem('div', 'product-card__title');
    const productBrand: HTMLElement = createElem('p', 'product-card__title-brand');
    const productName: HTMLElement = createElem('span', 'product-card__title-name');
    // const productRating: HTMLElement = createElem('span', 'product-card__title-name');

    productBrand.innerHTML = DATA.brand;
    productName.innerHTML = newNameProduct(DATA.brand, DATA.title);

    productTitle.append(productBrand, productName);

    //цена товара
    const productPrice: HTMLElement = renderProductPrice(DATA, 'main');

    const productOrder: HTMLElement = createElem('div', 'product-card__price-order');
    productOrder.innerHTML = 'В корзину';
    const sizeWrapper: HTMLElement = createElem('div', 'product-card__sizes-wrapper');

    productDesc.append(productTitle, productPrice);

    productBodyWrapper.append(productImg, productDesc);

    productLink.append(productBodyWrapper);

    productCard.append(productCardOverlay, productLink, productOrder, sizeWrapper, productRating);

    productCard.onmouseenter = () => {
        DATA.sizes.forEach((elem) => {
            const productSize: HTMLElement = createElem('div', 'product-card__sizes');

            productSize.innerHTML = elem;
            sizeWrapper.classList.add('show_sizes');
            sizeWrapper.append(productSize);

            productSize.onclick = () => {
                console.log('ВЫБРАЛИ РАЗМЕР', productSize.textContent);
                productSize.classList.add('active-size');
                productOrder.classList.add('active-size');
            }; //TODO - перенести в функцию отдельно от onmouseenter
        });
    };

    productCard.onmouseleave = () => {
        sizeWrapper.innerHTML = '';
    };

    productOrder.onclick = () => {
        console.log('В КОРЗИНУ');
    };

    return productCard;
};
