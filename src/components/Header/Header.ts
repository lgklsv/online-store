import { appliedFilters, productsCartData } from '../../const/store';
import { route } from '../../router/route';
import { calcAmountCart } from '../../utils/calculate-amount-cart';
import { createElem } from '../../utils/create-element';
import { resetFilters } from '../PageMain/components/FilterFunctions/resetFilters';
import { renderHeaderCart } from './components/HeaderCart/HeaderCart';
import styles from './Header.module.scss';

export const renderHeader = (): HTMLElement => {
  const header: HTMLElement = createElem('header', 'header');

  const headerContainer: HTMLElement = createElem('div', 'header__container');

  const storeName: HTMLElement = createElem('div', 'header__store-name');
  const storeLogoLink: HTMLElement = createElem('a', styles['store-name__link']);
  storeLogoLink.setAttribute('href', '/');

  storeLogoLink.onclick = (e: Event) => {
    e.preventDefault();
    resetFilters(appliedFilters);
    route('/');
  };

  storeName.append(storeLogoLink);

  const totalSumm: HTMLElement = createElem('div', 'header__total-summ');
  const summHeader: HTMLElement = createElem('div', 'total-summ__header');
  summHeader.innerHTML = 'Сумма корзины';

  const summ: HTMLElement = createElem('div', 'total-summ__num');
  summ.innerHTML = `${calcAmountCart(productsCartData.productsInCart)} ₽`;
  totalSumm.append(summHeader, summ);

  const cart = renderHeaderCart();
  headerContainer.append(storeName, totalSumm, cart);
  header.append(headerContainer);

  return header;
};
