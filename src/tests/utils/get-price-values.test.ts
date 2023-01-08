import { getPriceValues } from '../../utils/products-data-helpers/get-price-values';
import { PRODUCTS } from '../../const/products';

describe('getPriceValues', () => {
    it('should return array of price values from Product data', () => {
        expect(getPriceValues(PRODUCTS)).toBeInstanceOf(Array);
        expect(getPriceValues(PRODUCTS.slice(0, 4))).toEqual([4490, 13190, 13293, 27690]);
        expect(getPriceValues(PRODUCTS.slice(10, 15))).toEqual([8990, 9793, 20190, 25066.5, 47990]);
    });
    it('should return array of price values considering discounts', () => {
        expect(getPriceValues(PRODUCTS.slice(0, 4)).includes(13293)).toBeTruthy();
        expect(getPriceValues(PRODUCTS.slice(10, 15)).includes(25066.5)).toBeTruthy();
    });
    it('should return array of price values in ascending order', () => {
        expect(getPriceValues(PRODUCTS)).toEqual(getPriceValues(PRODUCTS).sort((a, b) => a - b));
    });
});
