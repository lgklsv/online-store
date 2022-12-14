import { Paths } from '../models/route-paths';
import { storeName } from './store-name';
import { notFound } from '../pages/404';
import { app } from '../pages/main';
import { cart } from '../pages/cart';
import { product } from '../pages/productPage';

export const ROUTER_PATHS: Paths = {
    404: {
        template: notFound,
        title: `404 | ${storeName}`,
    },
    '/': {
        template: app,
        title: `${storeName}`,
    },
    '/cart': {
        template: cart,
        title: `Cart | ${storeName}`,
    },
    '/product': {
        template: product,
        title: `Product | ${storeName}`,
    },
};
