import { appliedFilters } from '../../const/store';

/** Функция возвращает value переданной проперти объекта appliedFilters */
export const getSearchValue = function (): string | -1 {
    const filtersArr = Object.entries(appliedFilters);
    for (let i = 0; i < filtersArr.length; i++) {
        if (filtersArr[i][0] === 'input') {
            const searchString = filtersArr[i][1][0];
            if (typeof searchString === 'string') return searchString;
        }
    }
    return -1;
};
