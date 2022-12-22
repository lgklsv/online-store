export const filterByBrand = (data: ExtendedProduct[], filterValueArr: (string | number)[]): ExtendedProduct[] => {
    let outputArr: ExtendedProduct[] = [];
    filterValueArr.forEach((value) => {
        outputArr = outputArr.concat(data.filter((el) => {
            if (typeof value === 'string') value = value.replace(/_/g, ' ');
            return el.brand.toLowerCase() === value}
        ));
    });
    return outputArr;
};
