import { storeName } from './store-name';
import { notFound } from '../pages/404';
import { app } from '../pages/main';
import { cart } from '../pages/cart';
import { product } from '../pages/product-page';
import { PATH_NAMES } from './path-names';

/** Пути роутера(страницы) */
export const ROUTER_PATHS: Paths = {
    [PATH_NAMES.notFound]: {
        template: notFound,
        title: `404 | ${storeName}`,
    },
    [PATH_NAMES.main]: {
        template: app,
        title: `${storeName}`,
    },
    [PATH_NAMES.cart]: {
        template: cart,
        title: `cart | ${storeName}`,
    },
    [PATH_NAMES.product]: {
        template: product,
        title: `product | ${storeName}`,
    },
};
