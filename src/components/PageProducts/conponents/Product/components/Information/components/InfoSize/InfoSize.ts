import { productsCartData } from '../../../../../../../../const/store';
import { createElem } from '../../../../../../../../utils/create-element';
import { updateInfoProd } from '../../Information';
import styles from './InfoSize.module.scss';

export const helperForSize = {
    activSize: '', // флаг размера, сравниваем с текущим
    countSizeProducts: 1,
    sizeForData: '',
};

export const renderSize = (product: ExtendedProduct, orderSize: HTMLElement): HTMLElement => {
    const sizeWrapp: HTMLElement = createElem('div', styles['product-page__size-wrapper']);
    const sizeTitle: HTMLElement = createElem('h1', styles['product-page__size-title']);
    sizeTitle.innerHTML = 'Доступные размеры';
    const sizePlate: HTMLElement = createElem('h3', styles['product-page__size-plate']);
    const sizes: HTMLElement[] = [];

    product.sizes.forEach((elem, index) => {
        const productSize: HTMLElement = createElem('div', styles['product-page__sizes']);
        productSize.innerHTML = elem;
        sizes.push(productSize);

        if (index === 0) {
            helperForSize.sizeForData = elem;
            productSize.classList.add('active-size');
        }

        productSize.onclick = () => {
            helperForSize.sizeForData = elem;
            console.log(helperForSize, 'helperForSize');
            // если выбрали новый размер, должна снова появится кнопка добавить в корзину
            if (helperForSize.activSize !== elem) {
                // проверка данных из глобального объекта, чтобы понять добавляли ли мы этот размер в корзину или нет(проверка по id и размеру)
                const findedProduct = productsCartData.productsInCart.find((data) => {
                    return product.id === data.product.id && String(data.size) === elem;
                });

                console.log('findedProduct===', findedProduct);

                if (!findedProduct) {
                    updateInfoProd(product, false, helperForSize.countSizeProducts);
                } else {
                    updateInfoProd(product, true, findedProduct.quantity);
                }
            }

            // изменение стиля размера
            sizes.forEach((size) => {
                size.classList.remove('active-size');
            });

            productSize.classList.add('active-size');
            orderSize.innerHTML = elem;
            helperForSize.activSize = elem;
        };

        sizePlate.append(productSize);
    });

    sizeWrapp.append(sizeTitle, sizePlate);
    return sizeWrapp;
};
