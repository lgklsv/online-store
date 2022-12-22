/** Функция возвращает отсортированный массив цен от самой низкой до высокой c учетом скидок (только уникальные значения) */
export const getPriceValues = function (products: Product[]): number[] {
    return products
        .map((el) => {
            if (el.discountPercentage === 0) {
                return el.price;
            }
            return el.price - el.price * (el.discountPercentage / 100);
        })
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .sort((a, b) => a - b);
};
