import { appliedFilters } from '../../../../../const/store';
import { createElem } from '../../../../../utils/create-element';
import { resetFilters } from '../../FilterFunctions/resetFilters';

/** Функция которая ренедрит и удаляет кнопку сброса фильтров */
export const updateResetFiltersBtn = (): void => {
  const filtersContainer = document.querySelector('.filters__container') as HTMLElement;
  if (Object.entries(appliedFilters).length === 0) {
    const resetBtn = document.querySelector('.filters__reset') as HTMLElement;
    const heading: HTMLElement = createElem('h2', 'filters__heading');

    heading.textContent = 'Фильтры';
    filtersContainer.replaceChild(heading, resetBtn);
  } else {
    const filtersTitle = document.querySelector('.filters__heading') as HTMLElement;
    const resetBtnContainer: HTMLElement = createElem('div', 'filters__reset');
    const resetBtn: HTMLElement = createElem('div', 'filters__reset-btn');
    const resetIcon: HTMLElement = createElem('p', 'filters__reset-icon');

    resetIcon.innerHTML = '╳';
    resetBtn.append(resetIcon);
    const resetTitle: HTMLElement = createElem('span', 'filters__reset-title');
    resetTitle.innerHTML = 'Сбросить фильтры';
    resetBtnContainer.append(resetBtn, resetTitle);

    if (filtersTitle) filtersContainer.replaceChild(resetBtnContainer, filtersTitle);

    resetBtnContainer.onclick = (): void => {
      resetFilters(appliedFilters);
    };
  }
};
