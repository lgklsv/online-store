import { sortId, sortOptions } from '../../../../../../const/select-sort';
import { createElem } from '../../../../../../utils/create-element';
import styles from './SelectSort.module.scss';

export const renderSelectSort = (): HTMLElement => {
    const toolbarSelect: HTMLElement = createElem('div', styles['toolbar__select_item-sort']);

    const selectItem: HTMLElement = createElem('div', styles['select_item-sort']);
    const itemSpan: HTMLElement = createElem('span', styles['select_item-sort__text']);
    itemSpan.innerHTML = 'Сортировка';

    const arrowButton: HTMLElement = createElem('div', 'select__arrow');

    const selectDrop: HTMLElement = createElem('div', styles['select_dropdown']);
    const selectList: HTMLElement = createElem('ul', styles['select_list']);
    const itemli: HTMLElement[] = [];

    for (let i = 0; i < sortOptions.length; i++) {
        const selectItemLi = createElem('li', 'select__item');
        selectItemLi.setAttribute('id', sortId[i]);
        selectItemLi.innerHTML = sortOptions[i];
        selectList.append(selectItemLi);
        itemli.push(selectItemLi);

        selectItemLi.onclick = () => {
            // TODO - оптимизировать и убрать двойной цикл
            itemli.forEach((el) => {
                el.classList.remove('select');
            });

            selectItemLi.classList.add('select');
            itemSpan.innerHTML = selectItemLi.textContent as string;
        };
    }

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
