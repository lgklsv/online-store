import { renderProduct } from '../components/PageMain/components/MainCatalog/components/ProductCard/ProductCard';

/** функция для добавления товаров из массива в родительскую ноду, принимает в качестве аргумента массив и родителя */
export const addProducts = (array: ExtendedProduct[], parentNode: HTMLElement): void => {
    for (let i = 0; i < array.length; i++) {
        const productCard: HTMLElement = renderProduct(array[i]);
        parentNode.append(productCard);
    }
};
