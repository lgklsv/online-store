import { productsCartData } from '../../../../../../const/store';
import { addInCart } from '../../../../../../utils/add-in-cart';
import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import { newPrice } from '../../../../../../utils/edit-price';
import { onLoadPage } from '../../../../../../utils/onload-data-product';
import { renderProductQuantity } from '../../../../../PageProducts/conponents/Product/components/Information/components/InfoOrderProducts/InfoOrderProducts';
import { helperForSize } from '../../../../../PageProducts/conponents/Product/components/Information/components/InfoSize/InfoSize';
import { renderProductPrice } from '../ProductPrice/ProductPrice';
import styles from './ProductCard.module.scss';

export const renderProduct = (product: ExtendedProduct) => {
    const productCard: HTMLElement = createElem('div', 'products-card');
    productCard.setAttribute(
        'data-product',
        `${product.title} ${newPrice(product.price, product.discountPercentage)} ${product.color}`
    );
    const productCardOverlay: HTMLElement = createElem('div', 'products-card__overlay');

    // оберка ссылки - здесь же ховер
    const productLink: HTMLElement = createElem('a', 'products-card__link');
    productLink.setAttribute('href', `/product/${product.id}`);
    productLink.setAttribute('target', '_blank');
    const productBodyWrapper = createElem('div', 'product-card__body-wrapper');

    // рейтинг товара(отображается на hover)
    const productRating = createElem('div', styles['product-card__raiting']);
    const productRatingContainer = createElem('div', styles['product-card__raiting-container']);
    const productRatingIcon = createElem('div', styles['product-card__raiting-icon']);
    const ratingIcon = createElem('div', styles['raiting-icon']);
    productRatingIcon.append(ratingIcon);
    const productRatingData = createElem('div', 'product-card__raiting-data');
    productRatingData.innerHTML = String(product.rating);
    productRatingContainer.append(productRatingIcon, productRatingData);
    productRating.append(productRatingContainer);

    // изображение товара
    const productImg: HTMLElement = createElem('div', 'product-card__image');
    const img: HTMLElement = createElem('img', 'image-product');
    img.setAttribute('src', product.thumbnail);
    productImg.append(img);

    // описание товара
    const productDesc: HTMLElement = createElem('div', 'product-card__descriptions');
    const productTitle: HTMLElement = createElem('div', 'product-card__title');
    const productBrand: HTMLElement = createElem('p', 'product-card__title-brand');
    const productName: HTMLElement = createElem('span', 'product-card__title-name');
    productBrand.innerHTML = product.brand;
    productName.innerHTML = newNameProduct(product.brand, product.title);
    productTitle.append(productBrand, productName);

    //цена товара
    const productPrice: HTMLElement = renderProductPrice(product, 'main');
    const buttonContainer = createElem('div', 'button-container');
    const productOrder: HTMLElement = createElem('button', styles['product-card__price-order']);
    productOrder.innerHTML = 'В корзину';

    // проверка Local Storage перед начальной загрузкой страницы
    onLoadPage(product, buttonContainer, productOrder);

    productDesc.append(productTitle, productPrice); // описание товара

    productBodyWrapper.append(productImg, productDesc); // оберка ссылки

    productLink.append(productBodyWrapper); //ссылка

    // размерный ряд
    const sizeWrapper: HTMLElement = createElem('div', 'product-card__sizes-wrapper');
    const sizes: HTMLElement[] = [];
    sizeWrapper.style.display = 'none';

    product.sizes.forEach((elem, index) => {
        const productSize: HTMLElement = createElem('div', 'product-card__sizes');
        productSize.innerHTML = elem;
        sizes.push(productSize);

        if (index === 0) {
            productSize.classList.add('active-size');
        }

        productSize.onclick = () => {
            helperForSize.sizeForData = elem;

            // На главной - должна меняться надпись на кнопке В корзину - на В корзине
            // если выбрали новый размер, должна снова появится кнопка добавить в корзину
            if (helperForSize.activSize !== elem) {
                // проверка данных из глобального объекта, чтобы понять добавляли ли мы этот размер в корзину или нет(проверка по id и размеру)
                const findedProduct = productsCartData.productsInCart.find((data) => {
                    return product.id === data.product.id && String(data.size) === elem;
                });

                if (!findedProduct) {
                    updateProductCatd(buttonContainer, productOrder);
                } else {
                    updateProductCatd(
                        buttonContainer,
                        renderProductQuantity(
                            findedProduct.quantity,
                            helperForSize.sizeForData,
                            product,
                            buttonContainer,
                            productOrder
                        )
                    );
                }
            }

            sizes.forEach((size) => {
                size.classList.remove('active-size');
            });

            productSize.classList.add('active-size');
            helperForSize.activSize = elem;
        };

        sizeWrapper.append(productSize);
    });

    productCard.onmouseenter = () => {
        // на это событие появляется размерная сетка
        productOrder.classList.add('active-size');
        sizeWrapper.classList.add('show_sizes');
        sizeWrapper.style.display = 'flex';

        if (helperForSize.sizeForData === '') {
            console.log(sizeWrapper.childNodes[0]);
            helperForSize.sizeForData = String(sizeWrapper.childNodes[0].textContent);
        } //обновляем глобальную переменную, на случай, если не будет выбран размер и сразу нажмут кнопку 'добавить в корзину'
    };

    productCard.onmouseleave = () => {
        productOrder.classList.remove('active-size');
        sizeWrapper.style.display = 'none';
        helperForSize.sizeForData = '';
        // вместо перерендера - добавление display:none
    };

    productOrder.onclick = () => {
        addInCart(product, helperForSize);
        updateProductCatd(
            buttonContainer,
            renderProductQuantity(
                helperForSize.countSizeProducts,
                helperForSize.sizeForData,
                product,
                buttonContainer,
                productOrder
            )
        );

        // const quantity = renderMainProductQuantity(
        //     helperForSize.countSizeProducts,
        //     helperForSize.sizeForData,
        //     product,
        //     buttonContainer,
        //     productOrder
        // );

        // buttonContainer.innerHTML = '';
        // buttonContainer.append(quantity);
    };

    //
    productCard.append(productCardOverlay, productLink, buttonContainer, sizeWrapper, productRating);

    return productCard;
};

export const updateProductCatd = (parent: HTMLElement, сhild: HTMLElement): void => {
    parent.innerHTML = '';
    parent.append(сhild);
}; //TODO - изменить название!!!
