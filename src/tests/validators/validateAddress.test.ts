/**
 * @jest-environment jsdom
 */

import { validateAddress } from '../../components/Cart/CheckoutModal/components/Validators/validateAddress';
import { createElem } from '../../utils/create-element';

describe('validateAddress', () => {
  it('should return false if address is less than 3 words', () => {
    expect(validateAddress('город', createElem('div', 'test'))).toBeFalsy();
    expect(validateAddress('городмосква', createElem('div', 'test'))).toBeFalsy();
    expect(validateAddress('город москва', createElem('div', 'test'))).toBeFalsy();
    expect(validateAddress('', createElem('div', 'test'))).toBeFalsy();
  });
  it('should return false if there is less than 3 words with 5 characters', () => {
    expect(validateAddress('город Уфа дом 3', createElem('div', 'test'))).toBeFalsy();
    expect(validateAddress('город Уфа дом 3 кв 10', createElem('div', 'test'))).toBeFalsy();
  });
  it('should return true if address is valid', () => {
    expect(validateAddress('город москва улица острякова дом 8', createElem('div', 'test'))).toBeTruthy();
  });
  it('should be case insensitive', () => {
    expect(validateAddress('гОРОд  МОсквА улИца ОСТРЯКОВА  доМ 8', createElem('div', 'test'))).toBeTruthy();
  });
  it('should accept only russian letters and other symbols', () => {
    expect(validateAddress('Moscow, street Ostryakova house 8', createElem('div', 'test'))).toBeFalsy();
  });
});
