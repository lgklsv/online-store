export const validateAddress = (address: string, messageEl: HTMLElement): boolean => {
    if (/^[а-яА-Я0-9,\.\/\s]+$/.test(address) && (address.split(' ').length > 6 || address.split(',').length >= 4)) {
        messageEl.innerHTML = '✓';
        messageEl.className = 'checkout-modal__message done';
        return true;
    } else {
        messageEl.innerHTML = 'Адрес в формате город ..., улица ..., дом ..., квартира ...';
        messageEl.className = 'checkout-modal__message warning';
    }
    return false;
};
