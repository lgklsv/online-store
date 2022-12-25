export const validateEmail = (email: string, messageEl: HTMLElement): boolean => {
    if (
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            email
        )
    ) {
        messageEl.innerHTML = '✓';
        messageEl.className = 'checkout-modal__message checkout-modal__done';
        return true;
    } else {
        messageEl.innerHTML = 'Неверный e-mail';
        messageEl.className = 'checkout-modal__message checkout-modal__error';
    }
    return false;
};
