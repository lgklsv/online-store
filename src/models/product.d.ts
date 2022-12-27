interface Product {
    id: number;
    title: string;
    sex: string;
    color: string[];
    sizes: string[];
    description: string[];
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    [key: string]: string | number | string[] | number[];
}

interface ProductProps {
    category: string;
    amount: number;
}

interface ExtendedProduct extends Product {
    discountPrice: number;
    search: string;
    sizeQuantity: number[];
}

interface HelperSize {
    activSize: string;
    countSizeProducts: number;
    sizeForData: string;
}
