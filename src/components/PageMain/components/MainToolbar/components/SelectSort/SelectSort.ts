import { SORT_OPTIONS } from '../../../../../../const/select-sort';
import { appliedFilters } from '../../../../../../const/store';
import { createElem } from '../../../../../../utils/create-element';
import { renderFiltered } from '../../../Filter/filter';
import styles from './SelectSort.module.scss';

export const renderSelectSort = (node: NodeListOf<ChildNode>): HTMLElement => {
  const catalogProduct: HTMLElement = node[0].childNodes[0] as HTMLElement;

  const toolbarSelect: HTMLElement = createElem('div', styles['toolbar__select_item-sort']);

  const selectItem: HTMLElement = createElem('div', 'select_item-sort');
  const itemSpan: HTMLElement = createElem('span', 'select_item-sort__text');
  itemSpan.innerHTML = 'Сортировка';

  const arrowButton: HTMLElement = createElem('div', 'select__arrow');

  const selectDrop: HTMLElement = createElem('div', 'select_dropdown');
  const selectList: HTMLElement = createElem('ul', 'select_list');
  const itemli: HTMLElement[] = [];
  const filterType = 'sort';

  (Object.entries(SORT_OPTIONS) as [SortTypes, string][]).forEach(([key, value]) => {
    const selectItemLi = createElem('li', 'select__item');
    selectItemLi.innerHTML = value;
    selectList.append(selectItemLi);
    itemli.push(selectItemLi);

    selectItemLi.onclick = () => {
      itemli.forEach((el) => el.classList.remove('select'));
      selectItemLi.classList.add('select');
      itemSpan.innerHTML = selectItemLi.textContent as string;
      // убираем соддержимое блока
      catalogProduct.innerHTML = '';

      if (!appliedFilters[filterType]) appliedFilters[filterType] = [];
      appliedFilters[filterType][0] = key;
      renderFiltered(appliedFilters);
    };
  });

  selectDrop.append(selectList);

  selectItem.append(itemSpan, arrowButton);
  toolbarSelect.append(selectItem, selectDrop);

  selectItem.onmouseenter = () => {
    selectDrop.classList.add(styles['open']);
    arrowButton.classList.add('active-arr');
  };

  toolbarSelect.onmouseleave = () => {
    selectDrop.classList.remove(styles['open']);
    arrowButton.classList.remove('active-arr');
  };

  return toolbarSelect;
};
