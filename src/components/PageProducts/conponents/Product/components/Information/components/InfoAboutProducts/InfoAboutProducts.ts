import { createElem } from '../../../../../../../../utils/create-element';
import styles from './InfoAboutProducts.module.scss';

export const renderInformationAboutProducts = (product: ExtendedProduct): HTMLElement => {
  // наличие
  const productData: HTMLElement = createElem('div', styles['product-page__data']);
  const productDataStock: HTMLElement = createElem('div', 'product-page__data-item');
  const dataStockTitle: HTMLElement = createElem('div', 'product-page__data-item-title');
  dataStockTitle.innerHTML = 'В наличии';
  const dataStockValue: HTMLElement = createElem('div', 'product-page__data-item-value');
  dataStockValue.innerHTML = String(product.stock);

  productDataStock.append(dataStockTitle, dataStockValue);

  // рейтинг
  const productDataRating: HTMLElement = createElem('div', 'product-page__data-item');
  const dataRatingTitle: HTMLElement = createElem('div', 'product-page__data-item-title');
  dataRatingTitle.innerHTML = 'Рейтинг';
  const dataRatingValue: HTMLElement = createElem('div', 'product-page__data-item-value');
  dataRatingValue.innerHTML = String(product.rating);

  productDataRating.append(dataRatingTitle, dataRatingValue);

  // описание
  const productDataDescriptions: HTMLElement = createElem('div', 'product-page__data-item');
  productDataDescriptions.classList.add('item-descriprions');
  const dataDescriptionsTitle: HTMLElement = createElem('div', 'product-page__data-item-title');
  const descriptionsTitle: HTMLElement = createElem('span', 'show-descriptions');

  descriptionsTitle.innerHTML = 'Описание';
  dataDescriptionsTitle.append(descriptionsTitle);

  const dataDescriptionsBody: HTMLElement = createElem('div', 'product-page__data-item-body');
  const prodContant: HTMLElement = createElem('div', 'product-menu__content');

  const dataDescriptionsContent: HTMLElement = createElem('ul', 'content__data-item');

  product.description.forEach((elem) => {
    const contentItem: HTMLElement = createElem('li', 'content-item');
    contentItem.innerHTML = elem;
    dataDescriptionsContent.append(contentItem);
  });

  prodContant.append(dataDescriptionsContent);
  dataDescriptionsBody.append(prodContant);

  dataDescriptionsTitle.onclick = () => {
    descriptionsTitle.classList.toggle('active-desc');
    dataDescriptionsBody.classList.toggle('show_content');

    if (dataDescriptionsBody.classList.contains('show_content')) {
      dataDescriptionsBody.style.height = `${String(dataDescriptionsBody.scrollHeight)}px`;
    } else dataDescriptionsBody.style.height = '0px';
  };

  productDataDescriptions.append(dataDescriptionsTitle, dataDescriptionsBody);

  productData.append(productDataStock, productDataRating, productDataDescriptions);

  return productData;
};
