// import { store } from '../const/store';
// import { addProducts } from './add-product';

export const searchProdInput = (valueInput: string, store: ExtendedProduct[]): ExtendedProduct[] => {
    const elements: ExtendedProduct[] = [];

    if (valueInput != '') {
        store.forEach((elem) => {
            if (elem.search.toLocaleLowerCase().search(valueInput) == -1) {
                console.log('нет сопадений');
                store = elements;
            } else {
                elements.push(elem);
                store = elements;
            }
            console.log('elements', elements);
        });
    } else {
        return store;
    }

    return elements;
};
