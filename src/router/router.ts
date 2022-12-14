import { ROUTER_PATHS } from '../const/router-paths';

const menu = document.querySelector('.router-test-menu');
const hostEl = document.getElementById('app');

const showPath = (hostEl: HTMLDivElement, pathname: string): void => {
    const route = ROUTER_PATHS[pathname] || ROUTER_PATHS[404];
    hostEl.innerHTML = route.template;
    document.title = route.title;
};

if (hostEl instanceof HTMLDivElement) {
    showPath(hostEl, window.location.pathname);
}

const router = (pathname: string): void => {
    window.history.pushState({}, '', window.location.origin + pathname);
    if (hostEl instanceof HTMLDivElement) {
        showPath(hostEl, pathname);
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
        showPath(hostEl, window.location.pathname);
    }
});

