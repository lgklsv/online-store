import { createElem } from '../../../utils/create-element';
import styles from './CheckoutModal.module.scss';
import { renderCard } from './components/CreditCard/CreditCard';
import { toggleModal } from './components/ToggleModal';
import { onNameInput, onEmailInput, onPhoneInput, onAddressInput } from './components/onInputCheckout';
import { onSubmitCheckout } from './components/submitHandler';
import { createInputModal } from './components/createInputModal';

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

    const nameInput = createInputModal('Имя и фамилия', 'Введите имя и фамилию', 'name', onNameInput);
    const emailInput = createInputModal('E-mail', 'Введите e-mail', 'email', onEmailInput);
    const phoneInput = createInputModal('Номер телефона', 'Введите номер телефона', 'phone', onPhoneInput);
    const addressInput = createInputModal('Адрес', 'Введите адрес', 'address', onAddressInput);

    checkoutDetails.append(nameInput, emailInput, phoneInput, addressInput);

    const paymentBtn: HTMLElement = createElem('button', 'checkout-modal__confirm-btn');
    paymentBtn.setAttribute('type', 'submit');
    paymentBtn.innerHTML = 'Оплатить';

    // CARD
    const card = renderCard();

    checkoutForm.append(checkoutDetails, card, paymentBtn);
    modal.append(heading, closeModalBtn, checkoutForm);

    checkoutForm.onsubmit = onSubmitCheckout;
    return modal;
};
