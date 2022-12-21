export const filterByPrice = (data: ExtendedProduct[], filterValueArr: (string | number)[]): ExtendedProduct[] => {
    let outputArr: ExtendedProduct[] = [];
    const [min, max] = filterValueArr;
    outputArr = data.filter((el) => {
        let price = el.discountPercentage === 0 ? el.price : el.price - el.price * (el.discountPercentage / 100);
        if (price >= min && price <= max) return el; 
    });
    return outputArr;
};
