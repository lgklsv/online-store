export const filterByBrand = (data: ExtendedProduct[], filterValueArr: string[]): ExtendedProduct[] => {
    let outputArr: ExtendedProduct[] = [];
    filterValueArr.forEach((value) => {
        outputArr = outputArr.concat(data.filter((el) => el.brand.toLowerCase() === value));
    });
    return outputArr;
};