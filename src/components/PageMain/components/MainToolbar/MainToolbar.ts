import { PRODUCTS } from '../../../../const/products';
import { createElem } from '../../../../utils/create-element';
import { renderSearchProduct } from './components/SearchProduct/SearchProduct';
import { renderSelectSort } from './components/SelectSort/SelectSort';
import { renderSelectView } from './components/SelectView/SelectView';
import styles from './MainToolbar.module.scss';

export const renderMainToolbar = (node: NodeListOf<ChildNode>): HTMLElement => {
  const mainToolbar: HTMLElement = createElem('div', styles['main__toolbar']);

  const selectSort: HTMLElement = renderSelectSort(node);
  const productQuantity: HTMLElement = createElem('div', styles['toolbar__quantity']);
  productQuantity.innerHTML = `Всего: ${String(PRODUCTS.length)}`;

  const searchProduct: HTMLElement = renderSearchProduct();
  const selectView: HTMLElement = renderSelectView(node);

  mainToolbar.append(searchProduct, productQuantity, selectSort, selectView);

  return mainToolbar;
};
