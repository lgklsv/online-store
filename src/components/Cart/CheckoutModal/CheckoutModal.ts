import { createElem } from '../../../utils/create-element';
import { createInput } from '../../../utils/create-input-element';
import styles from './CheckoutModal.module.scss';
import { renderCard } from './components/CreditCard/CreditCard';
import { toggleModal } from './components/ToggleModal';
import { validateEmail } from './components/Validators/validateEmail';
import { validateName } from './components/Validators/validateName';

export const renderCheckoutModal = (): HTMLElement => {
    const modal: HTMLElement = createElem('div', styles['checkout-modal']);

    const heading: HTMLElement = createElem('h2', 'checkout-modal__heading');
    heading.innerHTML = 'Оформление заказа';

    const closeModalBtn: HTMLElement = createElem('div', 'checkout-modal__close-btn');
    const closeIcon: HTMLElement = createElem('p', 'checkout-modal__close-icon');
    closeIcon.innerHTML = '╳';
    closeModalBtn.append(closeIcon);

    closeModalBtn.onclick = (): void => {
        const overlay = document.querySelector('.checkout-modal__overlay') as HTMLElement;
        toggleModal(modal, overlay);
    };

    const checkoutForm: HTMLElement = createElem('form', 'checkout-modal__form');
    checkoutForm.setAttribute('autocomplete', 'on');
    checkoutForm.setAttribute('novalidate', 'true');

    const checkoutDetails: HTMLElement = createElem('div', 'checkout-modal__details');

    // NAME
    const nameDetails: HTMLElement = createElem('div', 'checkout-modal__input-details');
    const nameLabel: HTMLElement = createElem('label', 'checkout-modal__label');
    nameLabel.innerHTML = 'Имя и фамилия';

    const nameInput: HTMLElement = createInput('text', 'checkout-modal__input');
    nameInput.setAttribute('placeholder', 'Введите имя и фамилию');
    nameInput.setAttribute('spellcheck', 'false');

    nameInput.oninput = (e: Event): void => {
        if (e.target instanceof HTMLInputElement) {
            const inputValue = e.target.value.trim();
            const messageElement = e.target.nextElementSibling as HTMLElement;
            validateName(inputValue, messageElement);
        }
    };

    const nameError: HTMLElement = createElem('p', 'checkout-modal__message');
    nameError.innerHTML = 'Эти данные необходимы для получения и оформления заказа';
    nameError.classList.add('checkout-modal__warning');

    nameDetails.append(nameLabel, nameInput, nameError);

    // EMAIL
    const emailDetails: HTMLElement = createElem('div', 'checkout-modal__input-details');
    const emailLabel: HTMLElement = createElem('label', 'checkout-modal__label');
    emailLabel.innerHTML = 'E-mail';

    const emailInput: HTMLElement = createInput('email', 'checkout-modal__input');
    emailInput.setAttribute('placeholder', 'Введите e-mail');
    emailInput.setAttribute('spellcheck', 'false');

    emailInput.oninput = (e: Event): void => {
        if (e.target instanceof HTMLInputElement) {
            const inputValue = e.target.value.trim();
            const messageElement = e.target.nextElementSibling as HTMLElement;
            validateEmail(inputValue, messageElement);
        }
    };
    const emailError: HTMLElement = createElem('p', 'checkout-modal__message');
    emailError.innerHTML = 'Эти данные необходимы для получения и оформления заказа';
    emailError.classList.add('checkout-modal__warning');

    emailDetails.append(emailLabel, emailInput, emailError);

    // PHONE
    const phoneDetails: HTMLElement = createElem('div', 'checkout-modal__input-details');
    const phoneLabel: HTMLElement = createElem('label', 'checkout-modal__label');
    phoneLabel.innerHTML = 'Номер телефона';

    const phoneInput: HTMLElement = createInput('tel', 'checkout-modal__input');
    phoneInput.setAttribute('placeholder', 'Введите номер телефона');
    phoneInput.setAttribute('spellcheck', 'false');

    const phoneError: HTMLElement = createElem('p', 'checkout-modal__message');
    phoneError.innerHTML = 'Эти данные необходимы для получения и оформления заказа';
    phoneError.classList.add('checkout-modal__warning');

    phoneDetails.append(phoneLabel, phoneInput, phoneError);

    // ADRESS
    const addressDetails: HTMLElement = createElem('div', 'checkout-modal__input-details');
    const addressLabel: HTMLElement = createElem('label', 'checkout-modal__label');
    addressLabel.innerHTML = 'Адрес';

    const addressInput: HTMLElement = createInput('text', 'checkout-modal__input');
    addressInput.setAttribute('placeholder', 'Введите адрес');
    addressInput.setAttribute('spellcheck', 'false');
    
    const addressError: HTMLElement = createElem('p', 'checkout-modal__message');
    addressError.innerHTML = 'Эти данные необходимы для получения и оформления заказа';
    addressError.classList.add('checkout-modal__warning');

    addressDetails.append(addressLabel, addressInput, addressError);

    checkoutDetails.append(nameDetails, emailDetails, phoneDetails, addressDetails);

    const paymentBtn: HTMLElement = createElem('button', 'checkout-modal__confirm-btn');
    paymentBtn.setAttribute('type', 'submit');
    paymentBtn.innerHTML = 'Оплатить';

    // CARD
    const card = renderCard();

    checkoutForm.append(checkoutDetails, card, paymentBtn);
    modal.append(heading, closeModalBtn, checkoutForm);
    return modal;
};
