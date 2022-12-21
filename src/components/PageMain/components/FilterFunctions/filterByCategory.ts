
export const filterByCategory = (data: ExtendedProduct[], filterValueArr: string[]): ExtendedProduct[] => {
    let outputArr: ExtendedProduct[] = [];
    filterValueArr.forEach((value) => {
        outputArr = outputArr.concat(data.filter((el) => el.category.toLowerCase() === value));
    });
    return outputArr;
};
