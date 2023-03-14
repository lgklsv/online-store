import { appliedFilters } from '../../const/store';

/** Функция проверяет если ли в applied filters проперть с нужной value */
export const checkValue = (value: string): boolean => {
  const allFiltersArr = Object.entries(appliedFilters);

  for (let i = 0; i < allFiltersArr.length; i++) {
    const valuesArr = allFiltersArr[i][1];
    if (
      valuesArr.includes(value.toLowerCase().replace(/ /g, '_')) &&
      (allFiltersArr[i][0] === 'category' || allFiltersArr[i][0] === 'brand')
    )
      return true;
  }
  return false;
};
