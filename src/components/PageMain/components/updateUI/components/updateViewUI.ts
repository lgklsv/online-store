import { getPropValue } from "../../../../../utils/products-data-helpers/get-search-value";
import { changeClass } from "../../../../../utils/add-remove-class";

export const updateViewUI = (): void => {
    const catalog = document.querySelector('.catalog_products') as HTMLElement
    const fourInput = document.getElementById('card-size-four') as HTMLElement;
    const fourHost = fourInput.parentElement as HTMLElement;
    const nineInput = document.getElementById('card-size-nine') as HTMLElement;
    const nineHost = nineInput.parentElement as HTMLElement;

    const viewValueArr = getPropValue('big');
    let viewValue;
    if(Array.isArray(viewValueArr)) viewValue = viewValueArr[0];
    
    if (typeof viewValue === 'string') {
        if (viewValue === 'true') {
            catalog.classList.add('view-3');
            changeClass(nineHost, fourHost, 'active-view');
        } else {
            catalog.classList.remove('view-3');
            changeClass(fourHost, nineHost, 'active-view');
        }
    }
}