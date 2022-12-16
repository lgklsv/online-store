import { pathResolver } from '../router/router';

export const router = (host: HTMLElement, pathname: string): void => {
    window.history.pushState({}, '', window.location.origin + pathname);
    if (host instanceof HTMLDivElement) {
        pathResolver(host, pathname);
    }
};
