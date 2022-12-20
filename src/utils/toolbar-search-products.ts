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

    // console.log(store.sort);
    return elements;
    // TODO - добавить передачу запроса в строку
};

const countProducts = (origin: Product[], sort: ExtendedProduct[]): void => {
    const count: HTMLElement = document.querySelector('.toolbar__quantity') as HTMLElement;
    count.innerHTML = `Всего: ${origin.length - sort.length}`;
}; //TODO - доработать функцию

// export const searchProdInput = (value_input: string): void => {
//     console.log(value_input);
//     const source: NodeListOf<HTMLElement> = document.querySelectorAll('.products-card');
//     const counts: HTMLElement[] = [];
//     if (value_input != '') {
//         source.forEach((elem: HTMLElement) => {
//             if (elem.dataset.product?.toLocaleLowerCase().search(value_input) == -1) {
//                 elem.classList.add('hide');
//                 counts.push(elem);
//                 countProducts(source, counts);
//             } else {
//                 elem.classList.remove('hide');
//             }
//         });
//     } else {
//         source.forEach((elem: HTMLElement) => {
//             elem.classList.remove('hide');
//             countProducts(source, counts);
//         });
//     }
//     // TODO - добавить передачу запроса в строку
// };

// /** функция для изменения отображения кол-ва продуктов на странице, принимает оригинальный массив и массив значений, которые не подошли! требует доработки, пока тестовая */
// const countProducts = (origin: NodeListOf<HTMLElement>, sort: HTMLElement[]): void => {
//     const count: HTMLElement = document.querySelector('.toolbar__quantity') as HTMLElement;
//     count.innerHTML = `Всего: ${origin.length - sort.length}`;
// }; //TODO - доработать функцию
