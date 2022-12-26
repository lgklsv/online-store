import { createElem } from '../../../../../utils/create-element';
import { createInput } from '../../../../../utils/create-input-element';
import { validateCardNumber } from '../Validators/validateCardNumber';
import { validateExpDate } from '../Validators/validateExpDate';
import styles from './CreditCard.module.scss';

export const renderCard = (): HTMLElement => {
    // CARD
    const cardContainer: HTMLElement = createElem('div', 'checkout-modal__card');
    const card: HTMLElement = createElem('div', styles['card']);
    const logo: HTMLElement = createElem('div', 'card__logo');

    // Card number
    const cardNum: HTMLElement = createElem('div', 'card__input-container');
    const cardNumLabel: HTMLElement = createElem('label', 'card__input-label');
    cardNumLabel.innerHTML = 'Номер карты';

    const cardNumInput: HTMLElement = createInput('text', 'card__input');
    cardNumInput.id = 'card-number';
    cardNumInput.setAttribute('placeholder', '0000 0000 0000 0000');

    cardNumInput.oninput = (e: Event): void => {
        const target = e.target as HTMLInputElement;
        target.classList.remove('error');
        card.classList.remove('card__error-ani');
        let inputValue = target.value;

        target.value = inputValue
            .replace(/[^\d]+/g, '')
            .replace(/\W/gi, '')
            .replace(/(.{4})/g, '$1 ')
            .trim();
        if (inputValue.length > 19) target.value = inputValue.slice(0, 19);

        if (inputValue[0] === '4') {
            logo.className = 'card__logo card__logo_mastercard';
        } else if (inputValue[0] === '5') {
            logo.className = 'card__logo card__logo_visa';
        } else if (inputValue.slice(0, 2) === '34' || inputValue.slice(0, 2) === '37') {
            logo.className = 'card__logo card__logo_amex';
        } else {
            logo.className = 'card__logo';
        }
        validateCardNumber(inputValue);
    };

    cardNum.append(cardNumLabel, cardNumInput);

    // Bottom
    const cardDateAndCVC: HTMLElement = createElem('div', 'card__bottom');

    // EXPIRATION
    const cardExp: HTMLElement = createElem('div', 'card__input-container');
    const cardExpLabel: HTMLElement = createElem('label', 'card__input-label');
    cardExpLabel.innerHTML = 'Срок действия';

    const cardExpInput: HTMLElement = createInput('text', 'card__input');
    cardExpInput.setAttribute('placeholder', 'ММ / ГГ');
    cardExpInput.id = 'expiration';

    cardExpInput.oninput = (e: Event): void => {
        const target = e.target as HTMLInputElement;
        target.classList.remove('error');

        let inputValue = target.value;

        target.value = inputValue
            .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
            .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
            .replace(/^([0-1])([3-9])$/g, '0$1/$2')
            .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2')
            .replace(/^([0]+)\/|[0]+$/g, '0')
            .replace(/[^\d\/]|^[\/]*$/g, '')
            .replace(
                /\//g,
                (
                    (i) => (m: string) =>
                        !i++ ? m : ''
                )(0)
            )
            .trim();
        if (inputValue.length > 5) target.value = inputValue.slice(0, 5);
        validateExpDate(inputValue);
    };

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
    return cardContainer;
};
