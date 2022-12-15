import { createElem } from '../../utils/create-element';
import { renderHeaderCard } from './components/HeaderCard/HeaderCard';
import styles from './Header.module.scss';

export const renderHeader = () => {
    const header: HTMLElement = createElem('header', 'header');

    const storeName = createElem('div', styles['header__store-name']);
    const totalSumm = createElem('div', 'header__total-summ');
    const card = renderHeaderCard();

    header.append(storeName, totalSumm, card);

    return header;
};
