import { newNameProduct } from '../../utils/edit-name-products';

describe('Function newNameProduct', () => {
    it('should return string name product', () => {
        expect(newNameProduct('Converse', 'Converse x Come Tees Chuck Taylor All Star 70 High')).toEqual(
            ' x Come Tees Chuck Taylor All Star 70 High'
        );
        expect(newNameProduct('ABC', 'ABC x Come 4545')).toEqual(' x Come 4545');
    });

    it('should return string', () => {
        expect(typeof newNameProduct('Converse', 'Converse x Come Tees Chuck Taylor All Star 70 High')).toEqual(
            'string'
        );
        expect(typeof newNameProduct('ABC', 'ABC x Come 4545')).toEqual('string');
        expect(typeof newNameProduct('Vans', 'Vans Old Skool True')).toEqual('string');
    });
});
