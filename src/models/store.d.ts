interface Store {
  origin: ExtendedProduct[];
  sorted: ExtendedProduct[];
}

interface CartData {
  product: ExtendedProduct;
  size: string;
  quantity: number;
  remainder: number;
}

interface Cart {
  productsInCart: CartData[];
  count: number;
}
