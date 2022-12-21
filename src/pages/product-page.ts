// import { renderApp } from '../components/App/App';
import { renderFooter } from '../components/Footer/Footer';
import { renderHeader } from '../components/Header/Header';
import { renderProductPage } from '../components/PageProducts/PageProducts';

export const product = function (product: ExtendedProduct): void {
    // TODO - настроить renderApp

    document.body.classList.add('body');
    // #app - точка входа в разметке html
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.innerHTML = '';

    const header: HTMLElement = renderHeader();
    const footer: HTMLElement = renderFooter();
    const main: HTMLElement = renderProductPage(product);

    appContiner.append(header, main, footer);
};
