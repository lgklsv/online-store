import { calcDiscount } from '../../utils/calculate-amount-cart';

describe('Function calcDiscount', () => {
  it('should return string data with correctly formatted price - 1089 ₽', () => {
    const calc = calcDiscount(1233, 12);

    expect(typeof calc).toEqual('string');
    expect(calc).toBe('1 089 ₽');
  });
  it('should handle incorrect price and discount', () => {
    expect(calcDiscount(0, 12)).toEqual('0 ₽');
    expect(calcDiscount(-1, 12)).toEqual('0 ₽');
    expect(calcDiscount(192792814, -24)).toEqual('192 792 814 ₽');
    expect(calcDiscount(-1, -1)).toEqual('0 ₽');
  });
});
