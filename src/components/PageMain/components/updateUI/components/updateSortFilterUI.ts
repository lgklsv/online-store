import { getPropValue } from "../../../../../utils/products-data-helpers/get-search-value";
import { getSortOptionsValue } from "../../../../../utils/get-sort-options-value";

export const updateSortFilterUI = (): void => {
    const sortOptionText = document.querySelector('.select_item-sort__text') as HTMLElement;
    const selectList = document.querySelector('.select_list') as HTMLElement;
    const selectListEL = selectList.children as HTMLCollection;
    const sortValue = getPropValue('sort');

    if (Array.isArray(sortValue)) {
        const optionEN = sortValue[0];
        if (typeof optionEN === 'string') {
            const optionRU = getSortOptionsValue(optionEN);
            if (typeof optionRU === 'string') {
                sortOptionText.innerHTML = optionRU;
                Array.from(selectListEL).forEach((el) => {
                    if(el.innerHTML === optionRU) el.classList.add('select');
                });
            } 
        }
    }
}