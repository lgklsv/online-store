import { newNameCategory } from '../../../../../../../../utils/change-name-category';
import { createElem } from '../../../../../../../../utils/create-element';
import { newNameProduct } from '../../../../../../../../utils/edit-name-products';
import styles from './InfoTitle.module.scss';

export const renderTitle = (product: ExtendedProduct): HTMLElement => {
  const headerWrapper: HTMLElement = createElem('div', styles['product-page__header-wrapper']);
  const headerProduct: HTMLElement = createElem('h1', 'product-page__header');
  headerProduct.innerHTML = product.brand;
  const descrProduct: HTMLElement = createElem('h3', 'product-page__header-descrip');
  descrProduct.innerHTML = ` ${newNameCategory(product.sex, product.category)} ${newNameProduct(
    product.brand,
    product.title
  )}`;

  headerWrapper.append(headerProduct, descrProduct);

  return headerWrapper;
};
