import { renderApp } from '../components/App/App';
import { renderNotFoundPage } from '../components/NotFoundPage/NotFoundPage';

export const notFound = function (): void {
    renderApp(renderNotFoundPage);

    const headerTolalValue = document.querySelector('.header__total-summ') as HTMLElement;
    headerTolalValue.classList.add('hidden');
};
