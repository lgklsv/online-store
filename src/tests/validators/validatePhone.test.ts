/**
 * @jest-environment jsdom
 */
import { validatePhone } from '../../components/Cart/CheckoutModal/components/Validators/validateTel';
import { createElem } from '../../utils/create-element';

describe('validatePhone', () => {
  it('should allow to use only phone numbers that start with +7 or +8', () => {
    expect(validatePhone('+7842342344', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('+8842342434', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('+79269256394', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('+3964645645', createElem('div', 'test'))).toBeFalsy();
    expect(validatePhone('+196464646', createElem('div', 'test'))).toBeFalsy();
  });
  it('should allow to use phone numbers that are at least 9 numbers long', () => {
    expect(validatePhone('+784', createElem('div', 'test'))).toBeFalsy();
    expect(validatePhone('+884234', createElem('div', 'test'))).toBeFalsy();
    expect(validatePhone('', createElem('div', 'test'))).toBeFalsy();
  });
  it('should allow to use different phone number styles', () => {
    expect(validatePhone('+7(909)9543423', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('+7(909)-954-34-23', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('+7 (909) 954 34 23', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('+8-909-954 34 23', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('89099543423', createElem('div', 'test'))).toBeTruthy();
    expect(validatePhone('79099543423', createElem('div', 'test'))).toBeTruthy();
  });
});
