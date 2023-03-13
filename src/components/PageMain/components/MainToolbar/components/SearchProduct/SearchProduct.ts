import styles from './SearchProduct.module.scss';
import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import { appliedFilters } from '../../../../../../const/store';
import { renderFiltered } from '../../../Filter/filter';

export const renderSearchProduct = (): HTMLElement => {
  const searchProduct: HTMLElement = createElem('div', styles['toolbar__search-product']);
  const searchProductInput: HTMLInputElement = createInput('input', styles['search-product__input']);
  searchProductInput.setAttribute('type', 'text');
  searchProductInput.setAttribute('placeholder', 'Найти товар ...');
  const filterType = 'input';

  searchProductInput.oninput = () => {
    const valueInput: string = searchProductInput.value.toLocaleLowerCase().trim();

    if (!valueInput) {
      delete appliedFilters[filterType];
    } else {
      if (!appliedFilters[filterType]) appliedFilters[filterType] = [];
      appliedFilters[filterType][0] = valueInput;
    }
    renderFiltered(appliedFilters);
  };

  searchProduct.append(searchProductInput);

  return searchProduct;
};
