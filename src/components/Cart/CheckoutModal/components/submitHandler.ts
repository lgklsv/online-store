import { validateName } from './Validators/validateName';
import { validateEmail } from './Validators/validateEmail';
import { validatePhone } from './Validators/validateTel';
import { validateAddress } from './Validators/validateAddress';
import { validateCardNumber } from './Validators/validateCardNumber';
import { validateExpDate } from './Validators/validateExpDate';
import { validateCvc } from './Validators/validateCvc';
import { createElem } from '../../../../utils/create-element';
import { productsCartData } from '../../../../const/store';

export const onSubmitCheckout = (e: Event): void => {
    e.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement;
    let name = nameInput.value.trim();
    const messageName = nameInput.nextElementSibling as HTMLElement;
    const nameError = nameInput.nextElementSibling as HTMLElement;

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value.trim();
    const messageEmail = emailInput.nextElementSibling as HTMLElement;
    const emailError = emailInput.nextElementSibling as HTMLElement;

    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const phone = phoneInput.value.trim();
    const messagePhone = phoneInput.nextElementSibling as HTMLElement;
    const phoneError = phoneInput.nextElementSibling as HTMLElement;

    const addressInput = document.getElementById('address') as HTMLInputElement;
    const address = addressInput.value.trim();
    const messageAddress = addressInput.nextElementSibling as HTMLElement;
    const addressError = addressInput.nextElementSibling as HTMLElement;

    const cardNumInput = document.getElementById('card-number') as HTMLInputElement;
    let cardNum = cardNumInput.value;
    cardNum = cardNum.replace(/ /g, '');
    let paymentSystem = validateCardNumber(cardNum);

    const cardExpInput = document.getElementById('expiration') as HTMLInputElement;
    let expNum = cardExpInput.value;

    const cardCvcInput = document.getElementById('cvc-cvv') as HTMLInputElement;
    let cardCvc = cardCvcInput.value;

    if (
        validateName(name, messageName) &&
        validateEmail(email, messageEmail) &&
        validatePhone(phone, messagePhone) &&
        validateAddress(address, messageAddress) &&
        validateCardNumber(cardNum) &&
        validateExpDate(expNum) &&
        validateCvc(paymentSystem, cardCvc)
    ) {
        // TODO clean cart
        localStorage.clear();
        productsCartData.productsInCart = [];
        productsCartData.count = 0;

        // render success page
        const modal = document.querySelector('.checkout-modal') as HTMLElement;
        modal.innerHTML = '';
        const heading: HTMLElement = createElem('h2', 'checkout-modal__heading');
        heading.style.marginTop = '2rem';
        heading.innerHTML = 'Спасибо за заказ ヽ(•‿•)ノ На главную страницу через 3 сек';
        modal.append(heading);

        let time = 3;
        setInterval((): void => {
            time--;
            heading.innerHTML = `Спасибо за заказ ヽ(•‿•)ノ На главную страницу через ${time} сек`;
            // return to main
            if (time === 0) window.location.href = '/';
        }, 1000);
    } else {
        if (!validateName(name, messageName)) nameError.classList.add('error');
        if (!validateEmail(email, messageEmail)) emailError.classList.add('error');
        if (!validatePhone(phone, messagePhone)) phoneError.classList.add('error');
        if (!validateAddress(address, messageAddress)) addressError.classList.add('error');
        if (!validateCardNumber(cardNum)) cardNumInput.classList.add('error');
        if (!validateExpDate(expNum)) cardExpInput.classList.add('error');
        if (!validateCvc(paymentSystem, cardCvc)) cardCvcInput.classList.add('error');

        if (!validateCardNumber(cardNum) || !validateExpDate(expNum) || !validateCvc(paymentSystem, cardCvc)) {
            // Animation
            const card = document.querySelector('.card') as HTMLElement;
            card.classList.remove('card__error-ani');
            void card.offsetWidth; // trigger a DOM reflow
            card.classList.add('card__error-ani');
        }
    }
};
