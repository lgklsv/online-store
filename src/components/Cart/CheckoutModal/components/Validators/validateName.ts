/* eslint-disable no-param-reassign */
export const validateName = (name: string, messageEl: HTMLElement): boolean => {
  const inputArr = name.split(' ');
  if (
    inputArr.length === 2 &&
    inputArr[0].length >= 3 &&
    inputArr[1].length >= 3 &&
    /^[а-яА-ЯёЁa-zA-Z\s]*$/.test(name)
  ) {
    messageEl.innerHTML = '✓';
    messageEl.className = 'checkout-modal__message done';
    return true;
  }
  if (inputArr.length !== 2) {
    messageEl.innerHTML = 'Необходимо ввести имя и фамилию вместе';
    messageEl.className = 'checkout-modal__message warning';
  } else if (!/^[а-яА-ЯёЁa-zA-Z\s]*$/.test(name)) {
    messageEl.innerHTML = 'Можно использовать только буквы ';
    messageEl.className = 'checkout-modal__message warning';
  } else if (inputArr[0].length < 3) {
    messageEl.innerHTML = 'Имя должно быть минимум из 3 символов';
    messageEl.className = 'checkout-modal__message warning';
  } else if (inputArr[1].length < 3) {
    messageEl.innerHTML = 'Фамилия должна быть минимум из 3 символов';
    messageEl.className = 'checkout-modal__message warning';
  }
  return false;
};
