import { getAmountOfProps } from '../../../../utils/products-data-helpers/get-amount-of-props';
import { getPriceValues } from '../../../../utils/products-data-helpers/get-price-values';
import { getStockValues } from '../../../../utils/products-data-helpers/get-stock-values';
import { updateRangeFiltersUI } from './components/updateRangeFiltersUI';
import { store } from '../../../../const/store';
import { getBrands, getCategoties } from '../../../../utils/products-data-helpers/get-alpha-filtered-props';
import { updateCheckboxFiltersUI } from './components/updateCheckboxFilterUI';

/** Функция которая принимает объект с данными после филтраци и обновляет UI по всей сранице */
export const updateUI = (data: ExtendedProduct[]) => {
    // Обновляем индикатор количества товаров
    const itemsAmountEl = document.querySelector('.toolbar__quantity') as HTMLElement;
    itemsAmountEl.innerHTML = `Всего: ${data.length}`;

    // Обновляем range фильтры
    // Price
    updateRangeFiltersUI(getPriceValues(data), 'price');
    // Stock
    updateRangeFiltersUI(getStockValues(data), 'stock');

    // Обновляем checkbox фильтры
    // Category
    const categoryAmountOfProps = getAmountOfProps(store.sorted, getCategoties(store.sorted), 'category');
    updateCheckboxFiltersUI(categoryAmountOfProps, data, 'category');

    // Brand
    const brandAmountOfProps = getAmountOfProps(store.sorted, getBrands(store.sorted), 'brand');
    updateCheckboxFiltersUI(brandAmountOfProps, data, 'brand');
};
