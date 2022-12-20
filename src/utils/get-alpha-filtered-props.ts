/** Функция возвращает отфитльрованный по алфавиту массив с категориями на основе наших данных */
export const getCategoties = function (products: Product[]): string[]  {
    return products.map((item) => item.category).filter((item, index, arr) => arr.indexOf(item) === index).sort();
};

/** Функция возвращает отфитльрованный по алфавиту массив с брендами на основе наших данных */
export const getBrands = function (products: Product[]): string[]  {
    return products.map((item) => item.brand).filter((item, index, arr) => arr.indexOf(item) === index).sort();
};
