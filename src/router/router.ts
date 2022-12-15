import { ROUTER_PATHS } from '../const/router-paths';
import { extractPathId } from '../utils/extract-path-id';
import { findProductById } from '../utils/find-product-by-id';

const menu = document.querySelector('.router-test-menu');
const hostEl = document.getElementById('app');

/** Рендер темплейтов страниц */
const pathResolver = (hostEl: HTMLDivElement, pathname: string): void => {
    let route = ROUTER_PATHS[pathname] || ROUTER_PATHS[404];
    if(pathname.startsWith('/product')){
        const product = findProductById(extractPathId(pathname));
        if (product !== -1) {
            route = ROUTER_PATHS['/product'];
            hostEl.innerHTML = route.template(findProductById(extractPathId(pathname)));
            document.title = route.title;
        } else {
            route = ROUTER_PATHS[404];
            hostEl.innerHTML = route.template();
            document.title = route.title;
        }
    } else {
        hostEl.innerHTML = route.template();
        document.title = route.title;
    }
};

if (hostEl instanceof HTMLDivElement) {
    pathResolver(hostEl, window.location.pathname);
}

const router = (pathname: string): void => {
    window.history.pushState({}, '', window.location.origin + pathname);
    if (hostEl instanceof HTMLDivElement) {
        pathResolver(hostEl, pathname);
    }
};

if (menu instanceof HTMLElement) {
    menu.addEventListener('click', (e: Event) => {
        if (e.target instanceof HTMLAnchorElement) {
            e.preventDefault();
            const pathname = e.target.getAttribute('href');
            if (pathname) router(pathname);
        }
    });
}

window.addEventListener('popstate', (): void => {
    if (hostEl instanceof HTMLDivElement) {
        pathResolver(hostEl, window.location.pathname);
    }
});
