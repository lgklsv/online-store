import { pathResolver } from '../router/router';

export const router = (pathname: string): void => {
  window.history.pushState({}, '', window.location.origin + pathname);
  pathResolver(pathname);
};
