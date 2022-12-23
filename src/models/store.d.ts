interface Store {
    origin: ExtendedProduct[];
    sort: ExtendedProduct[];
    sorted: ExtendedProduct[];
}

interface CartData {
    product: ExtendedProduct;
    size: string;
    quantity: number;
}

interface Cart {
    productsInCart: CartData[];
    count: number;
}
