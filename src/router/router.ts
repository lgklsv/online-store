import { ROUTER_PATHS } from '../const/router-paths';
import { extractPathId } from '../utils/extract-path-id';
import { findProductById } from '../utils/find-product-by-id';
import { PATH_NAMES } from '../const/path-names';
import { router } from '../utils/router';

const menu = document.querySelector('.router-test-menu');
const hostEl = document.getElementById('app') as HTMLElement;

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
            hostEl.innerHTML = route.template();
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

if (menu instanceof HTMLElement) {
    menu.addEventListener('click', (e: Event) => {
        if (e.target instanceof HTMLAnchorElement) {
            e.preventDefault();
            const pathname = e.target.getAttribute('href');
            if (pathname) router(hostEl, pathname);
        }
    });
}

window.addEventListener('popstate', (): void => {
    if (hostEl instanceof HTMLDivElement) {
        pathResolver(hostEl, window.location.pathname);
    }
});
