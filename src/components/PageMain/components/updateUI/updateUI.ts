import { getPriceValues } from '../../../../utils/products-data-helpers/get-price-values';
import { getStockValues } from '../../../../utils/products-data-helpers/get-stock-values';
import { updateRangeFilters } from './components/updateRangeFilters';

/** Функция которая принимает объект с данными после филтраци и обновляет UI по всей сранице */
export const updateUI = (data: ExtendedProduct[]) => {
    // Обновляем индикатор количества товаров
    const itemsAmountEl = document.querySelector('.toolbar__quantity') as HTMLElement;
    itemsAmountEl.innerHTML = `Всего: ${data.length}`;

    // Обновляем range фильтры
    // Price
    updateRangeFilters(getPriceValues(data), 'price');
    // Stock
    updateRangeFilters(getStockValues(data), 'stock');

    // Обновляем checkbox фильтры 
};
