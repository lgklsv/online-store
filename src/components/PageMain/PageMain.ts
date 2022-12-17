import { createElem } from '../../utils/create-element';
import { renderMainCatalog } from './components/MainCatalog/MainCatalog';
import { renderMainToolbar } from './components/MainToolbar/MainToolbar';
import styles from './PageMain.module.scss';

export const renderMainPage = (): HTMLElement => {
    const main: HTMLElement = createElem('main', styles['main']);
    const mainContainer: HTMLElement = createElem('div', styles['main__container']);

    const mainToollbar: HTMLElement = renderMainToolbar();
    const mainCatalog: HTMLElement = renderMainCatalog();

    mainContainer.append(mainToollbar, mainCatalog);

    main.append(mainContainer);

    return main;
};
