import { renderApp } from '../components/App/App';
import { renderMainPage } from '../components/PageMain/PageMain';
import { insertAfter } from '../utils/insert-after';

export const app = function (): void {
    console.log('MAIN');
    renderApp();

    const header = document.querySelector('.header');
    if (header instanceof HTMLElement) {
        insertAfter(header, renderMainPage());
    }
};
