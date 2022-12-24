import { createElem } from '../../../utils/create-element';
import { createInput } from '../../../utils/create-input-element';
import styles from './CheckoutModal.module.scss';
import { toggleModal } from './components/ToggleModal';

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
    const addressError: HTMLElement = createElem('p', 'checkout-modal__message');
    addressError.innerHTML = 'Эти данные необходимы для получения и оформления заказа';
    addressError.classList.add('checkout-modal__warning');

    addressDetails.append(addressLabel, addressInput, addressError);

    checkoutDetails.append(nameDetails, emailDetails, phoneDetails, addressDetails)

    // CARD
    const cardContainer: HTMLElement = createElem('div', 'checkout-modal__card');
    const card: HTMLElement = createElem('div', 'card');
    const logo: HTMLElement = createElem('div', 'card__logo');

    // Card number
    const cardNum: HTMLElement = createElem('div', 'card__input-container');
    const cardNumLabel: HTMLElement = createElem('label', 'card__input-label');
    cardNumLabel.innerHTML = 'Номер карты';

    const cardNumInput: HTMLElement = createInput('number', 'card__input');
    cardNumInput.classList.add('card__input_number')
    cardNumInput.setAttribute('placeholder', '0000 0000 0000 0000');

    cardNum.append(cardNumLabel, cardNumInput);

    // Bottom
    const cardDateAndCVC: HTMLElement = createElem('div', 'card__bottom');

    // EXPIRATION
    const cardExp: HTMLElement = createElem('div', 'card__input-container');
    const cardExpLabel: HTMLElement = createElem('label', 'card__input-label');
    cardExpLabel.innerHTML = 'Срок действия';

    const cardExpInput: HTMLElement = createInput('number', 'card__input');
    cardExpInput.setAttribute('placeholder', 'ММ / ГГ');
    cardExp.append(cardExpLabel, cardExpInput);

    // CVC
    const cardCvc: HTMLElement = createElem('div', 'card__input-container');
    const cardCvcLabel: HTMLElement = createElem('label', 'card__input-label');
    cardCvcLabel.innerHTML = 'Проверочный код';

    const cardCvcInput: HTMLElement = createInput('number', 'card__input');
    cardCvcInput.setAttribute('placeholder', 'CVC');
    cardCvc.append(cardCvcLabel, cardCvcInput);

    cardDateAndCVC.append(cardExp, cardCvc);

    card.append(logo, cardNum, cardDateAndCVC);

    cardContainer.append(card);
    
    const paymentBtn: HTMLElement = createElem('button', 'checkout-modal__confirm-btn');
    paymentBtn.setAttribute('type', 'submit');
    paymentBtn.innerHTML = 'Оплатить';

    checkoutForm.append(checkoutDetails, cardContainer, paymentBtn);

    modal.append(heading, closeModalBtn, checkoutForm);

    return modal;
};
