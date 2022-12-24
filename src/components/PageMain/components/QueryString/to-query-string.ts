/** Функция парсит объект applied filters, создает из него query string и добавляет в URL */
export const toQueryString = function (appliedFilters: AppliedFilters): string {
    const allFiltersArr = Object.entries(appliedFilters);
    let querystring = '';

    allFiltersArr.forEach((filter) => {
        querystring = `${querystring}&${filter[0]}=${filter[1].join(',')}`;
    });
    querystring = `?${querystring.slice(1)}`;
    window.history.replaceState(null, '', querystring);
    return querystring;
};
