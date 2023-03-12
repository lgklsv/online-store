import { createElem } from '../../../../../utils/create-element';
import { createLink } from '../../../../../utils/create-link-element';
import styles from './CartEmpty.module.scss';

export const renderEmptyCart = (): HTMLElement => {
  const mainContent: HTMLElement = createElem('div', styles['empty-cart']);

  const errorMessage: HTMLElement = createElem('p', 'empty-cart__message');
  errorMessage.innerHTML = 'Пока в корзине ничего нет (´･ᴗ･ `)';

  const btnToMain: HTMLElement = createLink('/', 'empty-cart__btn', false, 'Посмотреть товары');

  mainContent.append(errorMessage, btnToMain);

  return mainContent;
};
