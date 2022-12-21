import styles from './MainCheckboxFilter.module.scss';
import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import { appliedFilters, store } from '../../../../../../const/store';
import { addProducts } from '../../../../../../utils/add-product';
import { filterByCategory } from '../../../FilterFunctions/filterByCategory';
import { filterByBrand } from '../../../FilterFunctions/filterByBrand';

/** Функция создает универсальный фильтр с чекбоксами, аргументы: название фильтра, подкласс и массив названий для фильтрации */
export const renderCheckboxFilter = (title: string, data: ProductProps[], subClass: string): HTMLElement => {
    const checkboxFilter: HTMLElement = createElem('div', styles['checkbox-filter']);

    // Heading
    const heading: HTMLElement = createElem('h3', 'checkbox-filter__heading');
    heading.classList.add('filter-title');
    heading.innerHTML = title;

    const filterBody: HTMLElement = createElem('div', 'checkbox-filter__body');
    const filterList: HTMLElement = createElem('ul', 'checkbox-filter__list');

    for (let i = 0; i < data.length; i++) {
        const filterOption: HTMLElement = createElem('li', 'checkbox-filter__item');
        const filterCheckbox: HTMLInputElement = createInput('checkbox', 'checkbox-filter__input');
        filterCheckbox.classList.add(`checkbox-filter__input_${subClass}`);

        const id = data[i].category.toLowerCase().replace(/ /g, '_');
        filterCheckbox.id = id;

        const filterCheckboxLabel: HTMLElement = createElem('label', 'checkbox-filter__input-title');
        filterCheckboxLabel.innerHTML = data[i].category;
        filterCheckboxLabel.setAttribute('for', id);

        const itemCount: HTMLElement = createElem('span', 'checkbox-filter__item-count');
        itemCount.innerHTML = `${data[i].amount}/${data[i].amount}`;

        filterOption.append(filterCheckbox, filterCheckboxLabel, itemCount);

        filterList.append(filterOption);
    }

    filterList.onchange = (e: Event) => {
        console.log(e.target);
        const targetInput = e.target;
        let typeFilter;
        console.log(store);
        if (targetInput instanceof HTMLInputElement) {
            targetInput.classList.contains('checkbox-filter__input_category')
                ? (typeFilter = 'category')
                : (typeFilter = 'brand');
            console.log(targetInput.checked);

            const filterBy = targetInput.id.toLowerCase().replace(/_/g, ' ');
            if (targetInput.checked) {
                if (appliedFilters[typeFilter]) {
                    appliedFilters[typeFilter].push(filterBy);
                } else {
                    appliedFilters[typeFilter] = [];
                    appliedFilters[typeFilter].push(filterBy);
                }
            } else {
                const i = appliedFilters[typeFilter].indexOf(filterBy);
                if (appliedFilters[typeFilter]) {
                    appliedFilters[typeFilter].splice(i, 1);
                    if (appliedFilters[typeFilter].length === 0) {
                        delete appliedFilters[typeFilter];
                    }
                }
            }
            console.log(Object.entries(appliedFilters));

            const catalogProduct = document.querySelector('.catalog_products');
            if (catalogProduct instanceof HTMLElement) {
                catalogProduct.innerHTML = '';
                store.sort2 = [];

                const allFiltersObj = Object.entries(appliedFilters);

                if (allFiltersObj.length > 0) {
                    allFiltersObj.forEach((entryArr, indexObj) => {
                        console.log(entryArr);
                        const [filterType, filterValueArr] = entryArr;
                        console.log(filterType, filterValueArr);

                        if (filterType === 'category') {
                            store.sort2 = filterByCategory(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
                        } else {
                            store.sort2 = filterByBrand(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
                        }
                    });
                    addProducts(store.sort2, catalogProduct);
                } else {
                    addProducts(store.origin, catalogProduct);
                }
            }

            console.log(appliedFilters);
        }
        console.log(typeFilter);
    };

    filterBody.append(filterList);
    checkboxFilter.append(heading, filterBody);
    return checkboxFilter;
};
