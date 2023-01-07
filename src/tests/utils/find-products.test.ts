import { findProduct } from '../../utils/find-products';

jest.mock('../../const/store', () => ({
    productsCartData: {
        productsInCart: [
            {
                product: {
                    id: 7,
                    title: 'Vans Old Skool True',
                    sex: 'any',
                    color: ['Белый'],
                    sizes: ['39', '40', '41', '42', '43'],
                    description: [
                        'Материал: Верх - текстиль; Подкладка - текстиль, искусственная кожа; Низ - резина',
                        'Страна-производитель: Вьетнам',
                        'Верх из холщовой ткани',
                        'Лаконичный брендинг',
                        'Износостойкая подметка',
                    ],
                    price: 7490,
                    discountPercentage: 5,
                    rating: 4.25,
                    stock: 50,
                    brand: 'Vans',
                    category: 'Ботинки',
                    thumbnail:
                        'https://img.brandshop.ru/cache/products/k/kedy-vans-old-skool-true-white-0_1104x1104.jpg',
                    images: [
                        'https://img.brandshop.ru/cache/products/k/kedy-vans-old-skool-true-white-0_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/k/kedy-vans-old-skool-true-white-1_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/k/kedy-vans-old-skool-true-white-2_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/k/kedy-vans-old-skool-true-white-3_1104x1104.jpg',
                    ],
                    sizeQuantity: [10, 10, 10, 10, 10],
                    discountPrice: 7116,
                    search: 'Vans Old Skool True 7116 Белый Ботинки 4.25 5',
                },
                size: '43',
                quantity: 4,
                remainder: 10,
            },
            {
                product: {
                    id: 3,
                    title: 'Converse x Come Tees Chuck Taylor All Star 70 High',
                    sex: 'any',
                    color: ['Бежевый'],
                    sizes: ['39', '40', '41', '42', '43'],
                    description: [
                        'Материал: Верх - текстиль; Подкладка - текстиль; Низ - резина',
                        'Страна-производитель: Вьетнам',
                        'Лимитированная коллаборация Converse x Come Tees',
                        'Верх из холщовой ткани',
                        'Высокий силуэт',
                        'Перфорация сбоку',
                        'Фирменный патч',
                        'Усиленная носочная область',
                        'Износостойкая подметка',
                        'Сменная пара шнурков в комплекте',
                    ],
                    price: 13190,
                    discountPercentage: 0,
                    rating: 4.09,
                    stock: 36,
                    brand: 'Converse',
                    category: 'Ботинки',
                    thumbnail: 'https://img.brandshop.ru/cache/products/1/173121-0_1104x1104.jpg',
                    images: [
                        'https://img.brandshop.ru/cache/products/1/173121-0_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/1/173121-1_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/1/173121-2_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/1/173121-3_1104x1104.jpg',
                        'https://img.brandshop.ru/cache/products/1/173121-4_1104x1104.jpg',
                    ],
                    sizeQuantity: [5, 11, 10, 7, 3],
                    discountPrice: 13190,
                    search: 'Converse x Come Tees Chuck Taylor All Star 70 High 13190 Бежевый Ботинки 4.09 0',
                },
                size: '39',
                quantity: 4,
                remainder: 5,
            },
        ],
    },
}));

describe('Function findProduct', () => {
    it('should find product-3 with size', () => {
        const foundProduct = findProduct(3, '39');

        expect(foundProduct).toBeDefined();
        expect(foundProduct?.product.id).toEqual(3);
        expect(foundProduct?.size).toEqual('39');
    });
    it('should find product-7 with size', () => {
        const foundProduct = findProduct(7, '43');

        expect(foundProduct).toBeDefined();
        expect(foundProduct?.product.id).toEqual(7);
        expect(foundProduct?.size).toEqual('43');
    });
    it('should not find product with wrong size', () => {
        const foundProduct = findProduct(3, '31');

        expect(foundProduct).not.toBeDefined();
        expect(foundProduct?.product.id).not.toBeDefined();
        expect(foundProduct?.size).not.toEqual('31');
    });
    it('should not find product with wrong id', () => {
        expect(findProduct(8, '36')).not.toBeDefined();
        expect(findProduct(2, '36')).not.toBeDefined();
        expect(findProduct(103, '36')).not.toBeDefined();
    });
    it('should not find product with wrong size', () => {
        expect(findProduct(7, '39')).not.toBeDefined();
        expect(findProduct(3, '44')).not.toBeDefined();
    });
});
