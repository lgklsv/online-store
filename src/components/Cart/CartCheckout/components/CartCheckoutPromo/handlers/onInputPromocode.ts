/* eslint-disable no-param-reassign */
import { PROMOCODES_DISCOUNT, PROMOCODES_NAMES } from '../../../../../../const/promocodes';

export const onInputPromocode = (input: HTMLInputElement, title: HTMLElement, button: HTMLElement) => {
  const valueInput: string = input.value.toLocaleLowerCase().trim();

  Object.entries(PROMOCODES_NAMES).forEach(([key, value]) => {
    if (valueInput === value.toLocaleLowerCase()) {
      title.innerHTML = `${key}  –${PROMOCODES_DISCOUNT[value]}%`;
      button.removeAttribute('disabled');
      return;
    }
    if (valueInput === '') {
      title.innerHTML = ``;
      button.setAttribute('disabled', 'true');
    }
  });
};
