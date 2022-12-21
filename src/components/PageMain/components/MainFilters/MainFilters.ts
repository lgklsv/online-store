import styles from './MainFilters.module.scss';
import { createElem } from '../../../../utils/create-element';
import { renderSlideFilter } from './components/SlideFilter/MainSlideFilter';
import { renderCheckboxFilter } from './components/CheckboxesFilter/MainCheckboxFilter';
import { getCategoties, getBrands } from '../../../../utils/products-data-helpers/get-alpha-filtered-props';
import { PRODUCTS } from '../../../../const/products';
import { getAmountOfProps } from '../../../../utils/products-data-helpers/get-amount-of-props';
import { getPriceValues } from '../../../../utils/products-data-helpers/get-price-values';
import { getStockValues } from '../../../../utils/products-data-helpers/get-stock-values';

export const renderMainFilters = (): HTMLElement => {
    const filters: HTMLElement = createElem('div', styles['filters']);

    const filtersContainer: HTMLElement = createElem('div', 'filters__container');

    const heading: HTMLElement = createElem('h2', 'filters__heading');
    heading.textContent = 'Фильтры';

    console.log(getPriceValues(PRODUCTS));
    console.log(getStockValues(PRODUCTS));
    const priceFilter: HTMLElement = renderSlideFilter('Цена', 'cash', getPriceValues(PRODUCTS));
    const stockFilter: HTMLElement = renderSlideFilter('Количество', 'stock', getStockValues(PRODUCTS));

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
