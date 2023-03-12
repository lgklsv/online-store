/* eslint-disable no-param-reassign */
export const validatePhone = (phone: string, messageEl: HTMLElement): boolean => {
  const cleanPhone = phone.replace(/\D+/g, '');
  if (phone[0] !== '+') phone = `+${phone}`;

  if (cleanPhone.length >= 9 && /^(\+|00)[7-8][0-9 \-().]{8,18}$/.test(phone)) {
    messageEl.innerHTML = '✓';
    messageEl.className = 'checkout-modal__message done';
    return true;
  }
  if (cleanPhone[0] ? !cleanPhone[0].match(/[7-8]/) : false) {
    messageEl.innerHTML = 'Номера телефонов могут начинаться только с +7 или +8';
    messageEl.className = 'checkout-modal__message warning';
  } else if (cleanPhone.length < 9) {
    messageEl.innerHTML = 'Номер телефона должен быть не короче 9 цифр';
    messageEl.className = 'checkout-modal__message warning';
  } else {
    messageEl.innerHTML = 'Номера телефонов могут начинаться только с +7 или +8';
    messageEl.className = 'checkout-modal__message warning';
  }
  return false;
};
