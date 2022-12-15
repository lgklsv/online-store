import { createElem } from '../../../../utils/create-element';
import styles from './HeaderCard.module.scss';

export const renderHeaderCard = () => {
    const containerCard = createElem('div', styles['header__card']);

    const cardWrapper = createElem('div', styles['header__card_container']);
    const cardLink = createElem('a', styles['header_card-link']);

    const cardCounter = createElem('div', styles['header_card-counter']);
    const counterProduct = createElem('span', styles['card-counter']);
    counterProduct.innerHTML = '1';

    cardWrapper.append(cardLink);

    cardCounter.append(counterProduct);

    containerCard.append(cardWrapper, cardCounter);

    return containerCard;
};
