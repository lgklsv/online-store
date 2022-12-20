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
    // discountPrice?: string;
}

interface ExtendedProduct extends Product {
    discountPrice?: number;
}
