import { appliedFilters } from '../../../../const/store';
import { createElem } from '../../../../utils/create-element';
import { resetFilters } from '../FilterFunctions/resetFilters';
import styles from './EmptyCatalog.module.scss';

export const renderEmptyCatalog = (): HTMLElement => {
  const mainContent: HTMLElement = createElem('div', styles['empty-catalog']);

  const errorMessage: HTMLElement = createElem('p', 'empty-catalog__message');
  errorMessage.innerHTML = 'Товары не найдены ( ´•︵•` )';

  const btnToMain: HTMLElement = createElem('div', 'empty-catalog__btn');
  btnToMain.innerHTML = 'Сбросить фильтры';
  btnToMain.onclick = (): void => {
    resetFilters(appliedFilters);
  };

  mainContent.append(errorMessage, btnToMain);

  return mainContent;
};
