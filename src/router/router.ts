import { ROUTE_PATHS } from '../const/route-paths';

const menu = document.querySelector('.router-test-menu');

const router = (e: Event): void => {
    e = e || window.event;
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
        window.history.pushState({}, '', e.target.href);
    }
};

if (menu instanceof HTMLElement) {
    menu.addEventListener('click', (e: Event) => {
        if (e.target instanceof HTMLElement) {
            e.preventDefault();
            router(e);
        }
    });
}

const routeHandler = async () => {
    let path: string = window.location.pathname;
    if (path.length === 0) path = '/';

    const route = ROUTE_PATHS[path] || ROUTE_PATHS[404];
    const html = await fetch(route.template).then((res: Response) => res.text());
    const appContainer = document.getElementById('app');
    if (appContainer instanceof HTMLDivElement) {
        appContainer.innerHTML = html;
        document.title = route.title;
    }
};

window.onpopstate = routeHandler;

routeHandler();
