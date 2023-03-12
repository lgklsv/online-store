import { createElem } from '../../../../utils/create-element';
import { createInput } from '../../../../utils/create-input-element';

export const createInputModal = (
  heading: string,
  placeholder: string,
  id: string,
  onInput: (e: Event) => void
): HTMLElement => {
  const inputEl: HTMLElement = createElem('div', 'checkout-modal__input-details');
  const label: HTMLElement = createElem('label', 'checkout-modal__label');
  label.innerHTML = heading;

  const input: HTMLInputElement = createInput('text', 'checkout-modal__input');
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('spellcheck', 'false');
  input.id = id;

  input.oninput = onInput;

  const error: HTMLElement = createElem('p', 'checkout-modal__message');
  error.innerHTML = 'Эти данные необходимы для получения и оформления заказа';

  inputEl.append(label, input, error);
  return inputEl;
};
