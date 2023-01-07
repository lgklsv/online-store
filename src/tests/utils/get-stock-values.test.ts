import { getStockValues } from '../../utils/products-data-helpers/get-stock-values';
import { PRODUCTS } from '../../const/products';

describe('getStockValues', () => {
    it('should return array of stock values from Product data', () => {
        expect(getStockValues(PRODUCTS)).toBeInstanceOf(Array);
        expect(getStockValues(PRODUCTS.slice(0, 4))).toEqual([34, 36, 94, 123]);
        expect(getStockValues(PRODUCTS.slice(10, 15))).toEqual([55, 65, 105, 115]);
    });
    it('should return array of stock values in ascending order', () => {
        expect(getStockValues(PRODUCTS)).toEqual(getStockValues(PRODUCTS).sort((a, b) => a - b));
    });
});
