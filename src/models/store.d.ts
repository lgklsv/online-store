interface Store {
    origin: ExtendedProduct[];
    sort: ExtendedProduct[];
    sort2: ExtendedProduct[];
}

interface CartData {
    product: ExtendedProduct;
    size: string;
    quantity: string;
}
