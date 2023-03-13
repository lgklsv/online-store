import { createElem } from '../../../../../../utils/create-element';
import { onLoadPage } from '../../../../../../utils/onload-data-product';
import { updateComponent } from '../../../../../../utils/update-component';
import { renderInformationAboutProducts } from './components/InfoAboutProducts/InfoAboutProducts';
import { renderTitle } from './components/InfoTitle/InfoTitle';
import {
  renderOrderAddCart,
  renderOrderButton,
  renderProductQuantity,
} from './components/InfoOrderProducts/InfoOrderProducts';
import { helperForSize, renderSize } from './components/InfoSize/InfoSize';
import styles from './Information.module.scss';
import { renderPriceProducts } from './components/InfoPriceProduct/InfoPriceProduct';

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
  onLoadPage(product, buttonContainer, productActions, 'page', orderLink);

  informationCard.append(headerWrapper, sizeWrapp, productPrice, buttonContainer, productDescroprions);

  informationContainer.append(informationCard);

  return informationContainer;
};

/** обновляем блок с кнопками добавления товара */
export const updateInfoProd = (product: ExtendedProduct, isAdd: boolean, count: number) => {
  const buttonContainer = document.querySelector('.button-container') as HTMLElement;
  const { productActions } = renderOrderAddCart(product, helperForSize.sizeForData);
  const orderLink = renderOrderButton();

  if (!isAdd) {
    return updateComponent(buttonContainer, productActions);
  }
  return updateComponent(
    buttonContainer,
    renderProductQuantity({
      countProduct: count,
      product,
      onEmptyCount: () => updateComponent(buttonContainer, productActions),
      page: 'page',
    }),
    orderLink
  );
};
