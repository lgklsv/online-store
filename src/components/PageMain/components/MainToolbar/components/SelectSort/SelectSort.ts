import { SORT_FUNCTIONS, SORT_OPTIONS } from '../../../../../../const/select-sort';
// import { sortId, sortOptions } from '../../../../../../const/select-sort';
import { store } from '../../../../../../const/store';
import { addProducts } from '../../../../../../utils/add-product';
import { createElem } from '../../../../../../utils/create-element';
// import { quickSort } from '../../../../../../utils/quick-sort';
import styles from './SelectSort.module.scss';

export const renderSelectSort = (node: NodeListOf<ChildNode>): HTMLElement => {
    const catalogProduct: HTMLElement = node[0].childNodes[0] as HTMLElement;

    const toolbarSelect: HTMLElement = createElem('div', styles['toolbar__select_item-sort']);

    const selectItem: HTMLElement = createElem('div', styles['select_item-sort']);
    const itemSpan: HTMLElement = createElem('span', styles['select_item-sort__text']);
    itemSpan.innerHTML = 'Сортировка';

    const arrowButton: HTMLElement = createElem('div', 'select__arrow');

    const selectDrop: HTMLElement = createElem('div', styles['select_dropdown']);
    const selectList: HTMLElement = createElem('ul', styles['select_list']);
    const itemli: HTMLElement[] = [];

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
            // TODO - добавить на разные варианты сортировки разные функции
            catalogProduct.innerHTML = '';
            store.sort = SORT_FUNCTIONS[key](store.sort);
            addProducts(store.sort, catalogProduct);
            console.log(store);
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
