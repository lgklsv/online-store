import { ROUTER_PATHS } from '../const/router-paths';
import { extractPathId } from '../utils/extract-path-id';
import { findProductById } from '../utils/find-product-by-id';
import { PATH_NAMES } from '../const/path-names';

const hostEl = document.getElementById('app') as HTMLDivElement;

/** Рендер темплейтов страниц */
export const pathResolver = (hostEl: HTMLDivElement, pathname: string): void => {
    let route = ROUTER_PATHS[pathname] || ROUTER_PATHS[PATH_NAMES.notFound];
    if (pathname.startsWith(PATH_NAMES.product)) {
        const product = findProductById(extractPathId(pathname));
        if (product !== -1) {
            route = ROUTER_PATHS[PATH_NAMES.product];
            document.title = route.title;
            route.template(product);
        } else {
            route = ROUTER_PATHS[PATH_NAMES.notFound];
            route.template();
            document.title = route.title;
        }
    } else {
        route.template();
        document.title = route.title;
    }
};

if (hostEl instanceof HTMLDivElement) {
    pathResolver(hostEl, window.location.pathname);
}

window.addEventListener('popstate', (): void => {
    pathResolver(hostEl, window.location.pathname);
});
