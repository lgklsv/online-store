/* eslint-disable no-param-reassign */
import { appliedFilters } from '../../../../const/store';

/** Функция парсит query string, создает из него объект applied filters */
export const fromQueryString = (querystring: string): void => {
  if (!querystring) return;
  querystring = querystring.slice(1);
  const filters = querystring.split('&');

  filters.forEach((filter) => {
    const [filterType, params] = filter.split('=');
    const paramsArr = params.split(',').map((el) => decodeURI(el));

    if (!appliedFilters[filterType]) appliedFilters[filterType] = [];
    appliedFilters[filterType] = paramsArr;
  });
};
