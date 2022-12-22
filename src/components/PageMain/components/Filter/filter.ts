import { store } from '../../../../const/store';
import { filterByCategory } from '../FilterFunctions/filterByCategory';
import { filterByBrand } from '../FilterFunctions/filterByBrand';
import { filterByPrice } from '../FilterFunctions/filterByPrice';
import { filterByStock } from '../FilterFunctions/filterByStock';
import { addProducts } from '../../../../utils/add-product';
import { renderEmptyCatalog } from '../EmptyCatalog/EmptyCatalog';
import { updateUI } from '../updateUI/updateUI';
import { SORT_FUNCTIONS } from '../../../../const/select-sort';
import { searchProdInput } from '../../../../utils/toolbar-search-products';

/** Функция которая принимает объект applied filters и проходит по всем выставленным там фильтрам по порядку */
export const renderFiltered = (appliedFilters: AppliedFilters) => {
    const catalogProduct = document.querySelector('.catalog_products') as HTMLElement;
    catalogProduct.innerHTML = '';
    store.sort2 = [];
    const allFiltersObj = Object.entries(appliedFilters);

    // обработка ситуации установили фильтр -> сбросили фильтр
    if (!allFiltersObj.length) {
        catalogProduct.classList.remove('catalog-product_empty');
        addProducts(store.origin, catalogProduct);
        return updateUI(store.origin);
    }

    allFiltersObj.forEach((entryArr, indexObj) => {
        const [filterType, filterValueArr] = entryArr;
        console.log(allFiltersObj);

        if (filterType === 'category') {
            store.sort2 = filterByCategory(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
        } else if (filterType === 'brand') {
            store.sort2 = filterByBrand(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
        } else if (filterType === 'price') {
            store.sort2 = filterByPrice(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
        } else if (filterType === 'stock') {
            store.sort2 = filterByStock(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
        } else if (filterType === 'sort') {
            store.sort2 = SORT_FUNCTIONS[filterValueArr as unknown as SortTypes](
                indexObj === 0 ? store.origin : store.sort2
            );
        } else if (filterType === 'input') {
            store.sort2 = searchProdInput(
                filterValueArr as unknown as string,
                indexObj === 0 ? store.origin : store.sort2
            );
        }
    });

    if (store.sort2.length === 0) {
        catalogProduct.classList.add('catalog-product_empty');
        catalogProduct.append(renderEmptyCatalog());
    } else {
        catalogProduct.classList.remove('catalog-product_empty');
        addProducts(store.sort2, catalogProduct);
    }

    updateUI(store.sort2);
};
