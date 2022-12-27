import styles from './CreditCard.module.scss';
import { createElem } from '../../../../../utils/create-element';
import { createInput } from '../../../../../utils/create-input-element';
import { onCardNumberInput, onCvcInput, onExpDateInput } from './components/onInputCreditCard';

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

    cardNumInput.oninput = onCardNumberInput;
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

    cardExpInput.oninput = onExpDateInput;
    cardExp.append(cardExpLabel, cardExpInput);

    // CVC
    const cardCvc: HTMLElement = createElem('div', 'card__input-container');
    const cardCvcLabel: HTMLElement = createElem('label', 'card__input-label');
    cardCvcLabel.innerHTML = 'Проверочный код';

    const cardCvcInput: HTMLElement = createInput('number', 'card__input');
    cardCvcInput.setAttribute('placeholder', 'CVC');
    cardCvcInput.id = 'cvc-cvv';
    cardCvc.append(cardCvcLabel, cardCvcInput);

    cardCvcInput.oninput = onCvcInput;

    cardDateAndCVC.append(cardExp, cardCvc);

    card.append(logo, cardNum, cardDateAndCVC);
    cardContainer.append(card);
    return cardContainer;
};
