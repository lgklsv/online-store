import { store } from '../const/store';
import { addProducts } from './add-product';

export const searchProdInput = (value_input: string, parent: HTMLElement): ExtendedProduct[] => {
    const counts: ExtendedProduct[] = [];
    const elements: ExtendedProduct[] = [];
    if (value_input != '') {
        store.origin.forEach((elem: ExtendedProduct) => {
            if (elem.search?.toLocaleLowerCase().search(value_input) == -1) {
                counts.push(elem);
                countProducts(store.origin, counts);
                addProducts(elements, parent);
                store.sort = elements;
            } else {
                parent.innerHTML = '';
                elements.push(elem);
                addProducts(elements, parent);
                store.sort = elements;
            }
            console.log('elements', elements);
        });
    } else {
        store.sort.forEach((elem: ExtendedProduct) => {
            countProducts(store.origin, counts);
        });
    }

    return elements;
    // TODO - добавить передачу запроса в строку
};

const countProducts = (origin: Product[], sort: ExtendedProduct[]): void => {
    const count: HTMLElement = document.querySelector('.toolbar__quantity') as HTMLElement;
    count.innerHTML = `Всего: ${origin.length - sort.length}`;
}; //TODO - доработать функцию
