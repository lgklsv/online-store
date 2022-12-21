import { renderApp } from '../components/App/App';
import { renderProductPage } from '../components/PageProducts/PageProducts';

export const product = function (product: ExtendedProduct): void {
    console.log('PAGE', product);
    renderApp(renderProductPage);

    // return `<h1>PRODUCT ${product.id}</h1>`;
};
