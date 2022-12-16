import { sortOptions } from '../../../../const/select-sort';
import { createElem } from '../../../../utils/create-element';
import styles from './MainToolbar.module.scss';

export const renderMainToolbar = (): HTMLElement => {
    // sortOptions;
    const mainToolbar: HTMLElement = createElem('div', 'main__toolbar');

    const toolbarSelect: HTMLElement = createElem('div', styles['toolbar__select_item-sort']);
    const selectItem: HTMLElement = createElem('div', styles['select_item-sort']);
    const itemSpan: HTMLElement = createElem('span', styles['select_item-sort__text']);
    itemSpan.innerHTML = 'Сортировка';

    const selectDrop: HTMLElement = createElem('div', styles['select_dropdown']);
    const selectList: HTMLElement = createElem('li', styles['select_list']);

    for (let i = 0; i < sortOptions.length; i++) {
        const selectItem = createElem('li', 'select__item');
        selectItem.innerHTML = sortOptions[i];
        selectList.append(selectItem);
    }

    selectDrop.append(selectList);

    selectItem.append(itemSpan);
    toolbarSelect.append(selectItem);
    mainToolbar.append(toolbarSelect, selectDrop);

    return mainToolbar;
};
