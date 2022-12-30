import { pagination } from '../../../../../const/store';

/** Функция парсит query string, создает из него объект pagination */
export const fromQueryStringToPag = (querystring: string): void => {
    if (!querystring) return;
    querystring = querystring.slice(1);
    const filters = querystring.split('&');

    filters.forEach((filter) => {
        let [filterType, param] = filter.split('=');

        if (filterType === 'limit' || filterType === 'page') {
            if (+param <= 0 || isNaN(+param) ) param = '1';
            pagination[filterType] = +param;
        }
    });
};
