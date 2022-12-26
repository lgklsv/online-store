import { LOCAL_STORAGE_KEYS } from '../../../../../../const/local-storage';
import { productsCartData } from '../../../../../../const/store';
import { space } from '../../../../../../const/store-name';
import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import { newPrice } from '../../../../../../utils/edit-price';
import { setLocalStorage } from '../../../../../../utils/local-storage';
import { updateHeader } from '../../../../../../utils/update-cart';
// import { renderOrderProductQuantity } from '../../../../../PageProducts/conponents/Product/components/Information/components/InfoOrderProducts/InfoOrderProducts';
import { helperForSize } from '../../../../../PageProducts/conponents/Product/components/Information/components/InfoSize/InfoSize';
import { renderProductPrice } from '../ProductPrice/ProductPrice';
import styles from './ProductCard.module.scss';

export const renderProduct = (product: ExtendedProduct) => {
    // console.log(product);
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

    // проверка перед начальной загрузкой страницы
    if (productsCartData.count !== 0) {
        const findedProduct = productsCartData.productsInCart.find((data) => {
            return product.id === data.product.id && String(data.size) === product.sizes[0];
        }) as CartData;

        if (!findedProduct) {
            buttonContainer.append(productOrder);
        } else {
            buttonContainer.append(
                renderMainProductQuantity(
                    findedProduct.quantity,
                    product.sizes[0],
                    product,
                    buttonContainer,
                    productOrder
                )
            );
        }
    } else buttonContainer.append(productOrder);

    const sizeWrapper: HTMLElement = createElem('div', 'product-card__sizes-wrapper');
    const sizes: HTMLElement[] = [];
    sizeWrapper.style.display = 'none';

    productDesc.append(productTitle, productPrice);

    productBodyWrapper.append(productImg, productDesc);

    productLink.append(productBodyWrapper);

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
                    buttonContainer.innerHTML = '';
                    buttonContainer.append(productOrder);
                } else {
                    const quantity = renderMainProductQuantity(
                        findedProduct.quantity,
                        helperForSize.sizeForData,
                        product,
                        buttonContainer,
                        productOrder
                    );
                    buttonContainer.innerHTML = '';
                    buttonContainer.append(quantity);
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
        productOrder.classList.add('active-size');
        sizeWrapper.classList.add('show_sizes');
        sizeWrapper.style.display = 'flex';

        if (helperForSize.sizeForData === '') {
            console.log(sizeWrapper.childNodes[0]);
            helperForSize.sizeForData = String(sizeWrapper.childNodes[0].textContent);
        } //обновляем глобальную переменную, на случай, если не будет выбран размер
    };

    productCard.onmouseleave = () => {
        productOrder.classList.remove('active-size');
        sizeWrapper.style.display = 'none';
        helperForSize.sizeForData = '';
        // вместо перерендера - добавление display:none
    };

    productOrder.onclick = () => {
        productsCartData.count++;

        const productData: CartData = {
            product: product,
            size: helperForSize.sizeForData,
            quantity: helperForSize.countSizeProducts,
        };

        productsCartData.productsInCart.push(productData); //изменяем глобальный объект

        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT); //обновляем Local Storage
        updateHeader(productsCartData.count, productsCartData.productsInCart); // изменения данных в хэдере

        const quantity = renderMainProductQuantity(
            helperForSize.countSizeProducts,
            helperForSize.sizeForData,
            product,
            buttonContainer,
            productOrder
        );

        buttonContainer.innerHTML = '';
        buttonContainer.append(quantity);
    };

    //
    productCard.append(productCardOverlay, productLink, buttonContainer, sizeWrapper, productRating);

    return productCard;
};

export const renderMainProductQuantity = (
    countProduct: number,
    activeSize: string,
    product: ExtendedProduct,
    parentNode: HTMLElement,
    childNodes: HTMLElement
): HTMLElement => {
    const productCardMore: HTMLElement = createElem('div', styles['product-card__cart-more']);
    const productCartIconMinus: HTMLElement = createElem('button', styles['product-card__cart-icon']);
    productCartIconMinus.innerHTML = '–';

    const productCartIconPlus: HTMLElement = createElem('button', styles['product-card__cart-icon']);
    productCartIconPlus.innerHTML = '+';

    const productCartDescriptions: HTMLElement = createElem('span', styles['product-card__cart-descriptions']);
    productCartDescriptions.innerHTML = String(countProduct) + `${space}` + 'в корзине';

    productCartIconPlus.onclick = () => {
        productsCartData.count++;

        const findedProduct = productsCartData.productsInCart.find((data) => {
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity++;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине';
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
        updateHeader(productsCartData.count, productsCartData.productsInCart);
    };

    productCartIconMinus.onclick = (event) => {
        let index = 0;
        const findedProduct = productsCartData.productsInCart.find((data, i) => {
            index = i; // получаем индекс найденного товара в массиве
            return product.id === data.product.id && String(data.size) === activeSize;
        }) as CartData;

        findedProduct.quantity--;

        if (findedProduct.quantity === 0) {
            productsCartData.productsInCart.splice(index, 1); // удаляем товар из массива

            parentNode.innerHTML = '';
            parentNode.append(childNodes);
            // updateInfoProd(product, false, findedProduct.quantity);
        }

        productsCartData.count--;

        productCartDescriptions.innerHTML = findedProduct.quantity + `${space}` + 'в корзине';
        setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT);
        updateHeader(productsCartData.count, productsCartData.productsInCart); //обновили элемент корзины
    };

    productCardMore.append(productCartIconMinus, productCartDescriptions, productCartIconPlus);
    return productCardMore;
};
