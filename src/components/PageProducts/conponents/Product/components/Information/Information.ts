import { createElem } from '../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../utils/edit-name-products';
import { newPrice } from '../../../../../../utils/edit-price';
import { renderInformationAboutProducts } from './components/InfoDescriptions/InfoDescriptions';
import {
    renderOrderAddCart,
    renderOrderButton,
    renderOrderProductQuantity,
} from './components/InfoOrderProducts/InfoOrderProducts';
import styles from './Information.module.scss';

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    const countProduct = 0;

    const informationContainer: HTMLElement = createElem('div', styles['product-page__info-container']);
    const informationCard: HTMLElement = createElem('div', styles['product-page__card']);

    const { productActions, orderSize } = renderOrderAddCart(product);
    const productQantity = renderOrderProductQuantity(countProduct);
    const orderLink = renderOrderButton();
    const productDescroprions = renderInformationAboutProducts(product);

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
        //добваляем елементы
        const productSize: HTMLElement = createElem('div', styles['product-page__sizes']);
        productSize.innerHTML = elem;
        sizes.push(productSize);

        if (index === 0) {
            productSize.classList.add('_active-size');
        }

        // вешаем событие на элемент
        productSize.onclick = () => {
            // убираем активный класс
            sizes.forEach((size) => {
                size.classList.remove('_active-size');
            });

            productSize.classList.add('_active-size');
            orderSize.innerHTML = elem; //изменяем содержимое кнопки
        };

        sizePlate.append(productSize);
    });

    sizeWrapp.append(sizeTitle, sizePlate);

    // Цена
    const productPrice: HTMLElement = createElem('div', styles['product-page__price']);
    const productPriceFull: HTMLElement = createElem('span', 'product-card__price-full');
    productPriceFull.innerHTML = String(product.price) + ' ₽';

    // проверка есть ли скидка
    // TODO - вынести в отдельную функцию
    if (product.discountPercentage !== 0) {
        const productPriceDiscount: HTMLElement = createElem('span', 'product-card__price-discount');
        productPriceFull.classList.add('old-price');
        productPriceDiscount.innerHTML = '–' + String(product.discountPercentage) + '%';

        const productPriceNew: HTMLElement = createElem('div', 'product-card__price-new');
        productPriceNew.innerHTML = newPrice(product.price, product.discountPercentage) + ' ₽';

        productPrice.append(productPriceNew, productPriceFull, productPriceDiscount);
    } else {
        productPrice.append(productPriceFull);
    }

    informationCard.append(
        headerWrapper,
        sizeWrapp,
        productPrice,
        productActions,
        productQantity,
        orderLink,
        productDescroprions
    );

    informationContainer.append(informationCard);

    return informationContainer;
};
