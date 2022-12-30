import { renderApp } from '../components/App/App';
import { renderMainPage } from '../components/PageMain/PageMain';

export const app = function (): void {
    renderApp(renderMainPage);
};
