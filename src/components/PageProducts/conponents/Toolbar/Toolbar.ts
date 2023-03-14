import { route } from '../../../../router/route';
import { createElem } from '../../../../utils/create-element';
import { createLink } from '../../../../utils/create-link-element';
import { newNameProduct } from '../../../../utils/edit-name-products';
import styles from './Toolbar.module.scss';

export const renderProductPageToolbar = (product: ExtendedProduct): HTMLElement => {
  const toolbarProdPage: HTMLElement = createElem('div', styles['toolbar__product-page']);

  const path: string[] = [`${product.category}`, `${product.brand}`, `${newNameProduct(product.brand, product.title)}`];

  const mainLink: HTMLElement = createLink('/', styles['product-page__item-score'], true, 'Главная');
  toolbarProdPage.append(mainLink);
  mainLink.onclick = (e: Event): void => {
    e.preventDefault();
    route('/');
  };

  path.forEach((elem) => {
    const itemScope = createElem('div', styles['product-page__item-score']);
    itemScope.innerHTML = `&nbsp;/ ${elem}`;
    toolbarProdPage.append(itemScope);
  });

  return toolbarProdPage;
};
