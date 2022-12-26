export const validatePhone = (phone: string, messageEl: HTMLElement): boolean => {
    if (/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/.test(phone)) {
        messageEl.innerHTML = '✓';
        messageEl.className = 'checkout-modal__message done';
        return true;
    } else {
        messageEl.innerHTML = 'Неверный номер телефона';
        messageEl.className = 'checkout-modal__message error';
    }
    return false;
};