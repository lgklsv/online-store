import styles from './MainFilters.module.scss';
import { createElem } from '../../../../utils/create-element';
import { renderSlideFilter } from './components/SlideFilter/MainSlideFilter';
import { renderCheckboxFilter } from './components/CheckboxesFilter/MainCheckboxFilter';
import { getCategoties, getBrands } from '../../../../utils/get-alpha-filtered-props';
import { PRODUCTS } from '../../../../const/products';
import { getAmountOfProps } from '../../../../utils/get-amount-of-props';

export const renderMainFilters = (): HTMLElement => {
    const filters: HTMLElement = createElem('div', styles['filters']);

    const filtersContainer: HTMLElement = createElem('div', 'filters__container');

    const heading: HTMLElement = createElem('h2', 'filters__heading');
    heading.textContent = 'Фильтры';

    const priceFilter: HTMLElement = renderSlideFilter('Цена', 'cash');
    const stockFilter: HTMLElement = renderSlideFilter('Количество', 'stock');

    const categoryFilter: HTMLElement = renderCheckboxFilter(
        'Категория',
        getAmountOfProps(PRODUCTS, getCategoties(PRODUCTS), 'category'),
        'category'
    );

    const brandFilter: HTMLElement = renderCheckboxFilter(
        'Бренд',
        getAmountOfProps(PRODUCTS, getBrands(PRODUCTS), 'brand'),
        'brand'
    );

    filtersContainer.append(heading, priceFilter, stockFilter, categoryFilter, brandFilter);
    filters.append(filtersContainer);

    return filters;
};
