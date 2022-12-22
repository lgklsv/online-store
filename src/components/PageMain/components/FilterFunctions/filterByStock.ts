export const filterByStock = (data: ExtendedProduct[], filterValueArr: (string | number)[]): ExtendedProduct[] => {
    let outputArr: ExtendedProduct[] = [];
    const [min, max] = filterValueArr;
    outputArr = data.filter((el) => {
        if (el.stock >= min && el.stock <= max) return el;
    });
    return outputArr;
};
