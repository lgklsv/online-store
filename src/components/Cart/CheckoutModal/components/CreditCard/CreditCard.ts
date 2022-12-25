import { createElem } from '../../../../../utils/create-element';
import { createInput } from '../../../../../utils/create-input-element';
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
    return cardContainer;
}
