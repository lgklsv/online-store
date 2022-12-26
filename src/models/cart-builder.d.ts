interface ProductCardBuilder {
    product: ExtendedProduct;
    sizeContainer: HTMLElement;
    onFoundProduct: (count: number) => void;
    onNotFoundProduct: (count: number) => void;
    /** Если установлен, то включается логика страницы продукта, иначе - главная страница */
    orderSize?: HTMLElement;
}
