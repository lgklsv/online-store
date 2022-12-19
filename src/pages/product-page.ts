import { renderApp } from '../components/App/App';
import { renderMainPage } from '../components/PageMain/PageMain';

export const product = function (product: Product): string {
    renderApp(renderMainPage);
    console.log(product);
    return `<h1>PRODUCT ${product.id}</h1>`;
};
