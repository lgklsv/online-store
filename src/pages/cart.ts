import { renderApp } from '../components/App/App';
import { renderCartPage } from '../components/Cart/Cart';

export const cart = function (): void {
    console.log('CART');
    renderApp(renderCartPage);
};
