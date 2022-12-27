import { validateName } from './Validators/validateName';
import { validateEmail } from './Validators/validateEmail';
import { validatePhone } from './Validators/validateTel';
import { validateAddress } from './Validators/validateAddress';

export const onNameInput = (e: Event): void => {
    if (e.target instanceof HTMLInputElement) {
        const inputValue = e.target.value.trim();
        const messageElement = e.target.nextElementSibling as HTMLElement;
        validateName(inputValue, messageElement);
    }
};

export const onEmailInput = (e: Event): void => {
    if (e.target instanceof HTMLInputElement) {
        const inputValue = e.target.value.trim();
        const messageElement = e.target.nextElementSibling as HTMLElement;
        validateEmail(inputValue, messageElement);
    }
};

export const onPhoneInput = (e: Event): void => {
    if (e.target instanceof HTMLInputElement) {
        const inputValue = e.target.value.trim();
        if (inputValue.length === 1 && inputValue !== '+') {
            e.target.value = `+${e.target.value}`;
        }
        if (inputValue.length > 18) e.target.value = inputValue.slice(0, 18);
        const messageElement = e.target.nextElementSibling as HTMLElement;
        validatePhone(inputValue, messageElement);
    }
};

export const onAddressInput = (e: Event): void => {
    if (e.target instanceof HTMLInputElement) {
        const inputValue = e.target.value.trim();
        const messageElement = e.target.nextElementSibling as HTMLElement;
        validateAddress(inputValue, messageElement);
    }
};
