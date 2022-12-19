import styles from './MainFilters.module.scss';
import { createElem } from '../../../../utils/create-element';
import { renderSlideFilter } from './components/SlideFilter/MainSlideFilter';
import { renderCheckboxFilter } from './components/CheckboxesFilter/MainCheckboxFilter';

export const renderMainFilters = (): HTMLElement => {
    const filters: HTMLElement = createElem('div', styles['filters']);

    const filtersContainer: HTMLElement = createElem('div', 'filters__container');

    const heading: HTMLElement = createElem('h2', 'filters__heading');
    heading.textContent = 'Фильтры';

    const priceFilter: HTMLElement = renderSlideFilter('Цена', 'cash');
    const stockFilter: HTMLElement = renderSlideFilter('Количество', 'stock');
    const categoryFilter: HTMLElement = renderCheckboxFilter('Категория');
    const brandFilter: HTMLElement = renderCheckboxFilter('Бренд');

    filtersContainer.append(heading, priceFilter, stockFilter, categoryFilter, brandFilter);
    filters.append(filtersContainer);

    return filters;
};
