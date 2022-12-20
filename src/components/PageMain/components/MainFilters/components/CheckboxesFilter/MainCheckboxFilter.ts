import styles from './MainCheckboxFilter.module.scss';
import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';

/** Функция создает универсальный фильтр с чекбоксами, аргументы: название фильтра, подкласс и массив названий для фильтрации */
export const renderCheckboxFilter = (title: string, data: ProductProps[], subClass?: string): HTMLElement => {
    const checkboxFilter: HTMLElement = createElem('div', styles['checkbox-filter']);
    
    // Heading
    const heading: HTMLElement = createElem('h3', 'checkbox-filter__heading');
    heading.classList.add('filter-title');
    heading.innerHTML = title;

    const filterBody: HTMLElement = createElem ('div', 'checkbox-filter__body');
    const filterList: HTMLElement = createElem ('ul', 'checkbox-filter__list')

    for (let i = 0; i < data.length; i++) {
        const filterOption: HTMLElement = createElem('li', 'checkbox-filter__item');
        const filterCheckbox: HTMLInputElement = createInput('checkbox', 'checkbox-filter__input');
        const id = data[i].category.toLowerCase().replace(/ /g, '-');
        filterCheckbox.id = id;

        const filterCheckboxLabel: HTMLElement = createElem ('label', 'checkbox-filter__input-title');
        filterCheckboxLabel.innerHTML = data[i].category;
        filterCheckboxLabel.setAttribute('for', id);

        const itemCount: HTMLElement = createElem ('span', 'checkbox-filter__item-count');
        itemCount.innerHTML = `${data[i].amount}/${data[i].amount}`;

        filterOption.append(filterCheckbox, filterCheckboxLabel, itemCount);

        filterList.append(filterOption);
    }

    filterBody.append(filterList);
    checkboxFilter.append(heading, filterBody);
    return checkboxFilter;
};
