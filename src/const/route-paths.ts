import { Paths } from '../models/route-paths';

export const ROUTE_PATHS: Paths = {
    404: {
        template: '../pages/404.html',
        title: '404 | Online Store',
    },
    '/': {
        template: '../pages/main.html',
        title: 'Online Store',
    },
    '/cart': {
        template: '../pages/cart.html',
        title: 'Cart | Online Store',
    },
    '/product': {
        template: '../pages/product.html',
        title: 'Product | Online Store',
    },
};
