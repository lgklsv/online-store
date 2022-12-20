import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import { newPrice } from '../../../../../../utils/edit-price';

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
    productBrand.innerHTML = DATA.brand;
    productName.innerHTML = newNameProduct(DATA.brand, DATA.title);

    productTitle.append(productBrand, productName);

    //цена товара
    const productPrice: HTMLElement = createElem('div', 'product-card__price');
    const productPriceFull: HTMLElement = createElem('span', 'product-card__price-full');
    productPriceFull.innerHTML = String(DATA.price) + ' ₽';

    const productOrder: HTMLElement = createElem('div', 'product-card__price-order');
    productOrder.innerHTML = 'В корзину';

    // проверка есть ли скидка
    if (DATA.discountPercentage !== 0) {
        const productPriceDiscount: HTMLElement = createElem('span', 'product-card__price-discount');
        productPriceFull.classList.add('old-price');
        productPriceDiscount.innerHTML = '–' + String(DATA.discountPercentage) + '%';

        const productPriceNew: HTMLElement = createElem('div', 'product-card__price-new');
        productPriceNew.innerHTML = newPrice(DATA.price, DATA.discountPercentage) + ' ₽';

        productCard.setAttribute('data-price', `${newPrice(DATA.price, DATA.discountPercentage)}`);

        productPrice.append(productPriceFull, productPriceDiscount, productPriceNew);
    } else {
        productCard.setAttribute('data-price', `${DATA.price}`);
        productPrice.append(productPriceFull);
    }

    const sizeWrapper: HTMLElement = createElem('div', 'product-card__sizes-wrapper');

    productDesc.append(productTitle, productPrice);

    productBodyWrapper.append(productImg, productDesc);

    productLink.append(productBodyWrapper);

    productCard.append(productCardOverlay, productLink, productOrder, sizeWrapper);

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
