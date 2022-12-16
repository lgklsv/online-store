// import { router } from '../../router/router';
import { createElem } from '../../utils/create-element';
import { renderHeaderCart } from './components/HeaderCard/HeaderCart';
import styles from './Header.module.scss';

export const renderHeader = (): HTMLElement => {
    const header: HTMLElement = createElem('header', 'header');

    const headerContainer = createElem('div', 'header__container');

    const storeName: HTMLElement = createElem('div', 'header__store-name');
    const storeLogoLink: HTMLElement = createElem('a', styles['store-name__link']);
    storeLogoLink.setAttribute('href', '/');

    storeName.append(storeLogoLink);
    // storeName.onclick = (e: Event) => {
    //     if (e.target instanceof HTMLAnchorElement) {
    //         e.preventDefault();
    //         const pathname = e.target.getAttribute('href');
    //         if (pathname) router(hostEl, pathname);
    //     }
    // };

    const totalSumm: HTMLElement = createElem('div', 'header__total-summ');
    const summHeader: HTMLElement = createElem('div', styles['total-summ__header']);
    summHeader.innerHTML = 'Cart total';
    const summ: HTMLElement = createElem('div', 'total-summ__num');
    summ.innerHTML = '13579'; //TODO - добавить функцию генерации суммы корзины

    totalSumm.append(summHeader, summ);

    const cart = renderHeaderCart();
    headerContainer.append(storeName, totalSumm, cart);
    header.append(headerContainer);

    return header;
};
