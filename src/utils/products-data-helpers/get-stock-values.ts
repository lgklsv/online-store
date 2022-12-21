/** Функция возвращает отсортированный массив количества товаров от самой низкой до высокой(только уникальные значения) */
export const getStockValues = function (products: Product[]): number[] {
    return products
        .map((el) => el.stock)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .sort((a, b) => a - b);
};
