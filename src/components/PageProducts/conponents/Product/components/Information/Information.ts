import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import { renderInformationAboutProducts, renderPriceProducts } from './components/InfoDescriptions/InfoDescriptions';
import {
    renderOrderAddCart,
    renderOrderButton,
    renderOrderProductQuantity,
} from './components/InfoOrderProducts/InfoOrderProducts';
import styles from './Information.module.scss';

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    let countProduct: number = 0; // TODO - сделать глобальной переменной (объект с размером и кол-вом)?

    const informationContainer: HTMLElement = createElem('div', styles['product-page__info-container']);
    const informationCard: HTMLElement = createElem('div', styles['product-page__card']);

    const productPrice = renderPriceProducts(product); // Цена
    const { productActions, orderSize } = renderOrderAddCart(product); //Кнопка добавить в корзину и элемент, в который мы передаем размер
    // const productQantity = renderOrderProductQuantity(countProduct); // Кнопка добавления кол-ва в корзину товара
    const orderLink = renderOrderButton(); // Кнопка перехода в корзину
    const productDescroprions = renderInformationAboutProducts(product); // Описание

    // заголовок
    const headerWrapper: HTMLElement = createElem('div', styles['product-page__header-wrapper']);
    const headerProduct: HTMLElement = createElem('h1', styles['product-page__header']);
    headerProduct.innerHTML = product.brand;
    const descrProduct: HTMLElement = createElem('h3', styles['product-page__header-descrip']);
    descrProduct.innerHTML = `${product.sex}  ${product.category} ${newNameProduct(product.brand, product.title)}`;

    headerWrapper.append(headerProduct, descrProduct);

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
            sizes.forEach((size) => {
                size.classList.remove('active-size');
            });

            productSize.classList.add('active-size');
            orderSize.innerHTML = elem; //изменяем содержимое кнопки
        };

        sizePlate.append(productSize);
    });

    sizeWrapp.append(sizeTitle, sizePlate);

    informationCard.append(headerWrapper, sizeWrapp, productPrice, productActions, productDescroprions);

    informationContainer.append(informationCard);

    productActions.onclick = () => {
        countProduct = 1;
        informationCard.innerHTML = '';

        informationCard.append(
            headerWrapper,
            sizeWrapp,
            productPrice,
            renderOrderProductQuantity(countProduct),
            orderLink,
            productDescroprions
        );
    };

    return informationContainer;
};
