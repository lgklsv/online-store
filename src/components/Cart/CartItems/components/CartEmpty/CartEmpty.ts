import { appliedFilters } from '../../../../../const/store';
import { route } from '../../../../../router/route';
import { createElem } from '../../../../../utils/create-element';
import { createLink } from '../../../../../utils/create-link-element';
import { resetFilters } from '../../../../PageMain/components/FilterFunctions/resetFilters';
import styles from './CartEmpty.module.scss';

export const renderEmptyCart = (): HTMLElement => {
  const mainContent: HTMLElement = createElem('div', styles['empty-cart']);

  const errorMessage: HTMLElement = createElem('p', 'empty-cart__message');
  errorMessage.innerHTML = 'Пока в корзине ничего нет (´･ᴗ･ `)';

  const btnToMain: HTMLElement = createLink('/', 'empty-cart__btn', false, 'Посмотреть товары');

  btnToMain.onclick = (e: Event) => {
    e.preventDefault();
    resetFilters(appliedFilters);
    route('/');
  };

  mainContent.append(errorMessage, btnToMain);

  return mainContent;
};
