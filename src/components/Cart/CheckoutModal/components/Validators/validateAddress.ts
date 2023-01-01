export const validateAddress = (address: string, messageEl: HTMLElement): boolean => {
    const addressWords = address.split(' ');

    const checkSymbols = (addressWords: string[]): boolean => {
        let counter = 0;
        addressWords.forEach((word) => {
            if (word.length >= 5) counter++;
        });
        return counter >= 3;
    };

    if (/^[а-яА-Я0-9,\.\/\s]+$/.test(address) && addressWords.length >= 3 && checkSymbols(addressWords)) {
        messageEl.innerHTML = '✓';
        messageEl.className = 'checkout-modal__message done';
        return true;
    } else {
        messageEl.innerHTML = 'Адрес в формате город ..., улица ..., дом ..., квартира ...';
        messageEl.className = 'checkout-modal__message warning';
    }
    return false;
};
