/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
export const validateEmail = (email: string, messageEl: HTMLElement): boolean => {
  if (
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    messageEl.innerHTML = '✓';
    messageEl.className = 'checkout-modal__message done';
    return true;
  }
  messageEl.innerHTML = 'Пример example@gmail.com';
  messageEl.className = 'checkout-modal__message warning';

  return false;
};
