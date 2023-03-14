/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { store } from '../../../../const/store';
import { renderMainPage } from '../../PageMain';

export const resetFilters = (appliedFilters: AppliedFilters): void => {
  for (const key in appliedFilters) {
    if (appliedFilters.hasOwnProperty(key)) {
      delete appliedFilters[key];
    }
  }
  store.sorted = [];
  window.history.replaceState(null, '', '/');
  const appContiner = document.querySelector('#app') as Element;
  const main = document.querySelector('.main') as HTMLElement;
  appContiner.replaceChild(renderMainPage(), main);
};
