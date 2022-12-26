import { productsCartData } from '../../../../../../../../const/store';
import { createElem } from '../../../../../../../../utils/create-element';
import { helperForSize } from './InfoSize';
import styles from './InfoSize.module.scss';

export const productCardBuilder = ({
    product,
    sizeContainer,
    orderSize,
    onFoundProduct,
    onNotFoundProduct,
}: ProductCardBuilder) => {
    const sizes: HTMLElement[] = [];

    return (elem: string, index: number) => {
        const productSize: HTMLElement = createElem(
            'div',
            orderSize ? styles['product-page__sizes'] : 'product-card__sizes'
        );
        productSize.innerHTML = elem;
        sizes.push(productSize);

        if (index === 0) {
            orderSize && (helperForSize.sizeForData = elem);
            productSize.classList.add('active-size');
        }

        productSize.onclick = () => {
            helperForSize.sizeForData = elem;
            // если выбрали новый размер, должна снова появится кнопка добавить в корзину
            if (helperForSize.activSize !== elem) {
                // проверка данных из глобального объекта, чтобы понять добавляли ли мы этот размер в корзину или нет(проверка по id и размеру)
                const findedProduct = productsCartData.productsInCart.find((data) => {
                    return product.id === data.product.id && String(data.size) === elem;
                });

                if (!findedProduct) {
                    onNotFoundProduct(helperForSize.countSizeProducts);
                } else {
                    onFoundProduct(findedProduct.quantity);
                }
            }

            // изменение стиля размера
            sizes.forEach((size) => {
                size.classList.remove('active-size');
            });

            productSize.classList.add('active-size');
            orderSize && (orderSize.innerHTML = elem);
            helperForSize.activSize = elem;
        };

        sizeContainer.append(productSize);
    };
};
