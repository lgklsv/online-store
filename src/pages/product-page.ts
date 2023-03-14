import { renderApp } from '../components/App/App';
import { renderProductPage } from '../components/PageProducts/PageProducts';

export const product = (productData: ExtendedProduct): void => {
  renderApp(() => renderProductPage(productData));
};
