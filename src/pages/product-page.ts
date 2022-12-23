import { renderApp } from '../components/App/App';
import { renderProductPage } from '../components/PageProducts/PageProducts';

export const product = function (product: ExtendedProduct): void {
    renderApp(() => renderProductPage(product));
};
