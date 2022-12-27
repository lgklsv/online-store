export const validatePhone = (phone: string, messageEl: HTMLElement): boolean => {
    if (/^(\+|00)[7-8][0-9 \-\(\)\.]{7,18}$/.test(phone)) {
        messageEl.innerHTML = '✓';
        messageEl.className = 'checkout-modal__message done';
        return true;
    } else {
        messageEl.innerHTML = 'Номера телефонов могут начинаться только с +7 или +8';
        messageEl.className = 'checkout-modal__message warning';
    }
    return false;
};
