import { createElem } from '../../utils/create-element';
import { renderHeaderCart } from './components/HeaderCard/HeaderCart';
import styles from './Header.module.scss';

export const renderHeader = (): HTMLElement => {
    const header: HTMLElement = createElem('header', 'header');

    // лого
    const storeName: HTMLElement = createElem('div', 'header__store-name');
    const storeLogoLink: HTMLElement = createElem('a', styles['store-name__link']);
    storeLogoLink.setAttribute('href', '/');

    storeName.append(storeLogoLink);

    // блок суммы
    const totalSumm: HTMLElement = createElem('div', 'header__total-summ');
    const summHeader: HTMLElement = createElem('div', styles['total-summ__header']);
    summHeader.innerHTML = 'Cart total';
    const summ: HTMLElement = createElem('div', 'total-summ__num');
    summ.innerHTML = '13579'; //значения должны меняться

    totalSumm.append(summHeader, summ);

    // корзина
    const cart = renderHeaderCart();

    header.append(storeName, totalSumm, cart);

    return header;
};
