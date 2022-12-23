import { store } from '../../../../const/store';
import { filterByCategory } from '../FilterFunctions/filterByCategory';
import { filterByBrand } from '../FilterFunctions/filterByBrand';
import { filterByPrice } from '../FilterFunctions/filterByPrice';
import { filterByStock } from '../FilterFunctions/filterByStock';
import { addProducts } from '../../../../utils/add-product';
import { renderEmptyCatalog } from '../EmptyCatalog/EmptyCatalog';
import { updateUI } from '../updateUI/updateUI';
import { toQueryString } from '../QueryString/to-query-string';
import { SORT_FUNCTIONS } from '../../../../const/select-sort';
import { searchProdInput } from '../../../../utils/toolbar-search-products';

/** Функция которая принимает объект applied filters и проходит по всем выставленным там фильтрам по порядку */
export const renderFiltered = (appliedFilters: AppliedFilters) => {
    const catalogProduct = document.querySelector('.catalog_products') as HTMLElement;
    catalogProduct.innerHTML = '';
    store.sorted = [];

    toQueryString(appliedFilters);
    const allFiltersArr = Object.entries(appliedFilters);

    if (allFiltersArr.length > 0) {
        allFiltersArr.forEach((entryArr, indexObj) => {
            const [filterType, filterValueArr] = entryArr;

            if (filterType === 'category') {
                store.sorted = filterByCategory(indexObj === 0 ? store.origin : store.sorted, filterValueArr);
            } else if (filterType === 'brand') {
                store.sorted = filterByBrand(indexObj === 0 ? store.origin : store.sorted, filterValueArr);
            } else if (filterType === 'price') {
                store.sorted = filterByPrice(indexObj === 0 ? store.origin : store.sorted, filterValueArr);
            } else if (filterType === 'stock') {
                store.sorted = filterByStock(indexObj === 0 ? store.origin : store.sorted, filterValueArr);
            } else if (filterType === 'sort') {
                store.sorted = SORT_FUNCTIONS[filterValueArr as unknown as SortTypes](
                    indexObj === 0 ? store.origin : store.sorted
                );
            } else if (filterType === 'input') {
                store.sorted = searchProdInput(
                    filterValueArr as unknown as string,
                    indexObj === 0 ? store.origin : store.sorted
                );
            }
        });

        if (store.sorted.length === 0) {
            catalogProduct.classList.add('catalog-product_empty');
            catalogProduct.append(renderEmptyCatalog());
        } else {
            catalogProduct.classList.remove('catalog-product_empty');
            addProducts(store.sorted, catalogProduct);
        }
        updateUI(store.sorted);
    } else {
        catalogProduct.classList.remove('catalog-product_empty');
        addProducts(store.origin, catalogProduct);
        updateUI(store.origin);
    }    
};
