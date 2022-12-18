import { createElem } from '../../utils/create-element';
import { renderMainCatalog } from './components/MainCatalog/MainCatalog';
import { renderMainToolbar } from './components/MainToolbar/MainToolbar';
import { renderMainFilters } from './components/MainFilters/MainFilters';
import styles from './PageMain.module.scss';

export const renderMainPage = (): HTMLElement => {
    const main: HTMLElement = createElem('main', styles['main']);
    const mainContainer: HTMLElement = createElem('div', styles['main__container']);
    const mainContent: HTMLElement = createElem('div', styles['content']);

    const mainToollbar: HTMLElement = renderMainToolbar();
    const mainCatalog: HTMLElement = renderMainCatalog();
    const mainFilters: HTMLElement = renderMainFilters();

    mainContent.append(mainFilters, mainCatalog)
    mainContainer.append(mainToollbar, mainContent);

    main.append(mainContainer);

    return main;
};
