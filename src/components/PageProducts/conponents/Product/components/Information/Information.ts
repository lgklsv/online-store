import { LOCAL_STORAGE_KEYS } from '../../../../../../const/local-storage';
// import { productsCartData } from '../../../../../../const/store';
import { createElem } from '../../../../../../utils/create-element';
import { getLocalStorage } from '../../../../../../utils/local-storage';
import {
    renderInformationAboutProducts,
    renderPriceProducts,
    renderTitle,
} from './components/InfoDescriptions/InfoDescriptions';
import {
    renderOrderAddCart,
    renderOrderButton,
    renderOrderProductQuantity,
    renderSize,
} from './components/InfoOrderProducts/InfoOrderProducts';
import styles from './Information.module.scss';

export const helperForSize = {
    activSize: '', //!!!!!
    countSizeProducts: 1,
    sizeForData: '',
};

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    const informationContainer: HTMLElement = createElem('div', styles['product-page__info-container']);
    const informationCard: HTMLElement = createElem('div', styles['product-page__card']);

    const buttonContainer = createElem('div', 'button-container');

    const headerWrapper: HTMLElement = renderTitle(product); // заголовок
    const productPrice = renderPriceProducts(product); // цена
    const { productActions, orderSize } = renderOrderAddCart(product, helperForSize.sizeForData); //кнопка добавить в корзину и элемент, в который мы передаем размер
    const orderLink = renderOrderButton(); // кнопка перехода в корзину
    const productDescroprions = renderInformationAboutProducts(product); // описание
    const sizeWrapp = renderSize(product, orderSize);

    // проверка для начальной загрузке страницы товара
    // проверяем есть ли что-то в локал сторедж
    // если пустой - сразу рендерим
    // если нет, проверяем есть ли там наш товар

    const localStorageData: Cart | null = getLocalStorage(LOCAL_STORAGE_KEYS.PRODUCT);

    if (localStorageData === null) {
        buttonContainer.append(productActions);
    } else {
        const findedProduct = localStorageData.productsInCart.find((data) => {
            return product.id === data.product.id && String(data.size) === product.sizes[0];
        }) as CartData;

        if (!findedProduct) {
            buttonContainer.append(productActions);
        } else {
            buttonContainer.append(
                renderOrderProductQuantity(findedProduct.quantity, product.sizes[0], product), //передевать данные из объекта
                orderLink
            );
        }
    }

    informationCard.append(headerWrapper, sizeWrapp, productPrice, buttonContainer, productDescroprions);

    informationContainer.append(informationCard);

    return informationContainer;
};

// ==================================

export const updateInfoProd = (product: ExtendedProduct, isAdd: boolean, count: number) => {
    const buttonContainer: HTMLElement = document.querySelector('.button-container') as HTMLElement;
    const { productActions, orderSize } = renderOrderAddCart(product, helperForSize.sizeForData); //Кнопка добавить в корзину и элемент, в который мы передаем размер
    console.log(orderSize, 'orderSize');
    const orderLink = renderOrderButton(); // Кнопка перехода в корзину

    buttonContainer.innerHTML = '';

    if (!isAdd) {
        console.log('<<<<не добавили в корзину>>>>');
        buttonContainer.append(productActions);
    } else {
        console.log('Добавили в корзину появиться должен он!!!!');
        buttonContainer.append(
            renderOrderProductQuantity(count, helperForSize.sizeForData, product), //передевать данные из объекта
            orderLink
        );
    }
};
