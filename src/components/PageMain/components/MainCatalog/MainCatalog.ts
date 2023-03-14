import { store } from '../../../../const/store';
import { addProducts } from '../../../../utils/add-product';
import { createElem } from '../../../../utils/create-element';
import styles from './MainCatalog.module.scss';

export const renderMainCatalog = (): HTMLElement => {
  const catalog: HTMLElement = createElem('div', styles['catalog']);
  const catalogWrapper: HTMLElement = createElem('div', styles['catalog_wrapper']);

  const catalogProduct: HTMLElement = createElem('div', styles['catalog_products']);

  addProducts(store.origin, catalogProduct);

  catalogWrapper.append(catalogProduct);
  catalog.append(catalogWrapper);

  return catalog;
};
