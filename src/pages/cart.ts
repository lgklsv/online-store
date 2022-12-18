import { renderApp } from '../components/App/App';
import { renderMainPage } from '../components/PageMain/PageMain'; // TODO - исправить на рендер корзины

export const cart = function (): void {
    console.log('CART');
    renderApp(renderMainPage);
};
