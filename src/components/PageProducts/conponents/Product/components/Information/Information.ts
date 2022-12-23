import { productsCartData } from '../../../../../../const/store';
import { createElem } from '../../../../../../utils/create-element';
import { updateHeaderCount } from '../../../../../../utils/update-cart';
import {
    renderInformationAboutProducts,
    renderPriceProducts,
    renderTitle,
} from './components/InfoDescriptions/InfoDescriptions';
import {
    renderOrderAddCart,
    renderOrderButton,
    renderOrderProductQuantity,
} from './components/InfoOrderProducts/InfoOrderProducts';
import styles from './Information.module.scss';

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    let activSize: string = ''; //!!!!!
    let countSizeProducts = 1;

    const informationContainer: HTMLElement = createElem('div', styles['product-page__info-container']);
    const informationCard: HTMLElement = createElem('div', styles['product-page__card']);

    const headerWrapper: HTMLElement = renderTitle(product); // заголовок
    const productPrice = renderPriceProducts(product); // Цена
    const { productActions, orderSize } = renderOrderAddCart(product); //Кнопка добавить в корзину и элемент, в который мы передаем размер
    // const productQantity = renderOrderProductQuantity(countProduct); // Кнопка добавления кол-ва в корзину товара
    const orderLink = renderOrderButton(); // Кнопка перехода в корзину
    const productDescroprions = renderInformationAboutProducts(product); // Описание

    // размерный ряд
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
            productSize.classList.add('active-size');
        }

        productSize.onclick = () => {
            // если выбрали новый размер, должна снова появится кнопка добавить в корзину
            if (activSize !== elem) {
                // проверка данных из глобального объекта, чтобы понять добавляли ли мы этот размер в корзину или нет(проверка по id и размеру)
                const findedProduct = productsCartData.productsInCart.find((data) => {
                    return product.id === data.product.id && String(data.size) === elem;
                });

                console.log('a===', findedProduct);

                if (!findedProduct) {
                    console.log('данные NOсовпадают');
                    informationCard.innerHTML = '';
                    informationCard.append(headerWrapper, sizeWrapp, productPrice, productActions, productDescroprions);
                } else {
                    informationCard.innerHTML = '';
                    informationCard.append(
                        headerWrapper,
                        sizeWrapp,
                        productPrice,
                        renderOrderProductQuantity(findedProduct.quantity), //передевать данные из объекта
                        orderLink,
                        productDescroprions
                    );
                }
            }

            // изменение стиля размера
            sizes.forEach((size) => {
                size.classList.remove('active-size');
            });

            productSize.classList.add('active-size');
            orderSize.innerHTML = elem; //изменяем содержимое кнопки
            activSize = elem;
        };

        sizePlate.append(productSize);
    });

    sizeWrapp.append(sizeTitle, sizePlate);

    // кнопка добавить в корзину
    productActions.onclick = () => {
        productsCartData.count = productsCartData.count + 1;

        const productData: CartData = {
            product: product,
            size: activSize,
            quantity: countSizeProducts,
        };

        productsCartData.productsInCart.push(productData); //изменяем глобальный объект

        updateHeaderCount(productsCartData.count); // изменения данных в хэдере

        // добавить функцию на плюс-минус в другой кнопке
        //

        // =============

        informationCard.innerHTML = '';

        informationCard.append(
            headerWrapper,
            sizeWrapp,
            productPrice,
            renderOrderProductQuantity(countSizeProducts), //передевать данные из объекта
            orderLink,
            productDescroprions
        );
    };

    // проверка для начальной загрузке страницы товара! TODO - доработать
    if (productsCartData.productsInCart.length === 0) {
        informationCard.append(headerWrapper, sizeWrapp, productPrice, productActions, productDescroprions);
    }

    informationContainer.append(informationCard);

    return informationContainer;
};
