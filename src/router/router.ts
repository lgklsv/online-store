import { ROUTER_PATHS } from '../const/router-paths';
import { extractPathId } from '../utils/extract-path-id';
import { findProductById } from '../utils/find-product-by-id';
import { PATH_NAMES } from '../const/path-names';
import { appliedFilters } from '../const/store';
import { fromQueryString } from '../components/PageMain/components/QueryString/from-query-string';
import { renderFiltered } from '../components/PageMain/components/Filter/filter';

const hostEl = document.getElementById('app') as HTMLDivElement;

/** Рендер темплейтов страниц */
export const pathResolver = (hostEl: HTMLDivElement, pathname: string): void => {
    let route = ROUTER_PATHS[pathname] || ROUTER_PATHS[PATH_NAMES.notFound];
    if (pathname.startsWith(PATH_NAMES.product)) {
        const product = findProductById(extractPathId(pathname));
        if (product !== -1) {
            route = ROUTER_PATHS[PATH_NAMES.product];
            hostEl.innerHTML = route.template(findProductById(extractPathId(pathname)));
            document.title = route.title;
        } else {
            route = ROUTER_PATHS[PATH_NAMES.notFound];
            route.template();
            document.title = route.title;
        }
    } else {
        route.template();
        document.title = route.title;

        // Get filters from query string on '/' route
        fromQueryString(window.location.search);
        if (pathname === '/' && Object.entries(appliedFilters).length !== 0) {
            renderFiltered(appliedFilters);
        }
    }
};

pathResolver(hostEl, window.location.pathname);

window.addEventListener('popstate', (): void => {
    pathResolver(hostEl, window.location.pathname);
});
