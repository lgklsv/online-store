import { productsCartData } from '../../../../../../const/store';
import { createElem } from '../../../../../../utils/create-element';
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
import { helperForSize, renderSize } from './components/InfoSize/InfoSize';
import styles from './Information.module.scss';

export const renderInformationProduct = (product: ExtendedProduct): HTMLElement => {
    const informationContainer: HTMLElement = createElem('div', styles['product-page__info-container']);
    const informationCard: HTMLElement = createElem('div', styles['product-page__card']);

    const buttonContainer = createElem('div', 'button-container');

    const headerWrapper: HTMLElement = renderTitle(product);
    const productPrice = renderPriceProducts(product);
    const { productActions, orderSize } = renderOrderAddCart(product, helperForSize.sizeForData);
    const orderLink = renderOrderButton();
    const productDescroprions = renderInformationAboutProducts(product);
    const sizeWrapp = renderSize(product, orderSize);

    // проверка перед начальной загрузкой страницы товара
    if (productsCartData.count !== 0) {
        const findedProduct = productsCartData.productsInCart.find((data) => {
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
    } else buttonContainer.append(productActions);

    informationCard.append(headerWrapper, sizeWrapp, productPrice, buttonContainer, productDescroprions);

    informationContainer.append(informationCard);

    return informationContainer;
};

/** обновляем блок с кнопками добавления товара */
export const updateInfoProd = (product: ExtendedProduct, isAdd: boolean, count: number, page?: string) => {
    const buttonContainer: HTMLElement = document.querySelector('.button-container') as HTMLElement;
    const { productActions } = renderOrderAddCart(product, helperForSize.sizeForData);
    const orderLink = renderOrderButton();

    buttonContainer.innerHTML = '';

    if (page) {
        console.log(page);
    }

    if (!isAdd) {
        buttonContainer.append(productActions);
    } else {
        buttonContainer.append(renderOrderProductQuantity(count, helperForSize.sizeForData, product), orderLink);
    }
};
