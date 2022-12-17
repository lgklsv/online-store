import styles from './MainFilters.module.scss';
import { createElem } from '../../../../utils/create-element';
import { renderSlideFilter } from './components/SlideFilter/MainSlideFilter';

export const renderMainFilters = (): HTMLElement => {
    const filters: HTMLElement = createElem('div', styles['filters']);

    const heading: HTMLElement = createElem('h2', 'filters__heading');
    heading.textContent = 'Фильтры';

    const priceFilter: HTMLElement = renderSlideFilter('Цена', 'cash');

    const stockFilter: HTMLElement = renderSlideFilter('Количество', 'stock')

    filters.append(heading, priceFilter, stockFilter);
    return filters;
}
