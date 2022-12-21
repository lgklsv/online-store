import { store } from '../../../../const/store';
import { filterByCategory } from '../FilterFunctions/filterByCategory';
import { filterByBrand } from '../FilterFunctions/filterByBrand';
import { filterByPrice } from '../FilterFunctions/filterByPrice';
import { filterByStock } from '../FilterFunctions/filterByStock';
import { addProducts } from '../../../../utils/add-product';
import { renderEmptyCatalog } from '../EmptyCatalog/EmptyCatalog';
import { updateUI } from '../updateUI/updateUI';

/** Функция которая принимает объект applied filters и проходит по всем выставленным там фильтрам по порядку */
export const renderFiltered = (appliedFilters: AppliedFilters) => {
    const catalogProduct = document.querySelector('.catalog_products') as HTMLElement;
    catalogProduct.innerHTML = '';
    store.sort2 = [];

    const allFiltersObj = Object.entries(appliedFilters);

    if (allFiltersObj.length > 0) {
        allFiltersObj.forEach((entryArr, indexObj) => {
            const [filterType, filterValueArr] = entryArr;

            if (filterType === 'category') {
                store.sort2 = filterByCategory(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
            } else if (filterType === 'brand') {
                store.sort2 = filterByBrand(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
            } else if (filterType === 'price') {
                store.sort2 = filterByPrice(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
            } else if (filterType === 'stock') {
                store.sort2 = filterByStock(indexObj === 0 ? store.origin : store.sort2, filterValueArr);
            }
            // добавляем остальные функции фильтров по тому же принципу
        });

        if (store.sort2.length === 0) {
            catalogProduct.classList.add('catalog-product_empty');
            catalogProduct.append(renderEmptyCatalog());
        } else {
            catalogProduct.classList.remove('catalog-product_empty');
            addProducts(store.sort2, catalogProduct);
        }
        updateUI(store.sort2);
    } else {
        catalogProduct.classList.remove('catalog-product_empty');
        addProducts(store.origin, catalogProduct);
        updateUI(store.origin);
    }

    // console.log(appliedFilters);
};
