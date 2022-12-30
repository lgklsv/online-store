/** Функция парсит объект pagination, создает из него query string и добавляет в URL */
export const toQueryStringPag = (paginaiton: Pagination): string => {
    const allFiltersArr = Object.entries(paginaiton);
    let querystring = '';

    allFiltersArr.forEach((filter) => {
        querystring = `${querystring}&${filter[0]}=${filter[1]}`;
    });
    querystring = `?${querystring.slice(1)}`;
    window.history.replaceState(null, '', querystring);
    return querystring;
};
