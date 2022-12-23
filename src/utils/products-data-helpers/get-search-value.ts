import { appliedFilters } from '../../const/store';

/** Функция возвращает value переданной проперти объекта appliedFilters */
export const getPropValue = function (prop: string): (string|number)[] | -1 {
    const filtersArr = Object.entries(appliedFilters);
    for (let i = 0; i < filtersArr.length; i++) {
        if (filtersArr[i][0] === prop) {
            return filtersArr[i][1];
        }
    }
    return -1;
};
