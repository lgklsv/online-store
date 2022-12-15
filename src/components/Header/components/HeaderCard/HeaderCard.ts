import { createElem } from '../../../../utils/create-element';
import styles from './HeaderCard.module.scss';

export const renderHeaderCard = (): HTMLElement => {
    const containerCard: HTMLElement = createElem('div', styles['header__card']);

    const cardWrapper: HTMLElement = createElem('div', 'header__card_container');
    const cardLink: HTMLElement = createElem('a', styles['header_card-link']);
    cardLink.setAttribute('href', '/cart');

    const cardCounter: HTMLElement = createElem('div', styles['header_card-counter']);
    const counterProduct: HTMLElement = createElem('span', styles['card-counter']);
    counterProduct.innerHTML = '1';

    cardWrapper.append(cardLink);

    cardCounter.append(counterProduct);

    containerCard.append(cardWrapper, cardCounter);

    return containerCard;
};
