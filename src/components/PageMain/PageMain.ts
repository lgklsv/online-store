import { createElem } from '../../utils/create-element';
import { renderMainToolbar } from './components/MainToolbar/MainToolbar';
import styles from './PageMain.module.scss';

export const renderMainPage = (): HTMLElement => {
    const main: HTMLElement = createElem('main', styles['main']);
    const mainContainer: HTMLElement = createElem('div', styles['main__container']);

    const mainToollbar: HTMLElement = renderMainToolbar();
    // const mainCatalog: HTMLElement = createElem('div', 'main__catalog');

    mainContainer.append(mainToollbar);

    main.append(mainContainer);

    return main;
};
