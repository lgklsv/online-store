import { createElem } from '../../utils/create-element';
import { renderFooter } from '../Footer/Footer';
import { renderHeader } from '../Header/Header';
import { renderMainPage } from '../PageMain/PageMain';
import styles from './App.module.scss';

export const renderApp = (func?: () => HTMLElement): Element => {
    document.body.classList.add(styles['body']);

    // #app - точка входа в разметке html
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.innerHTML = '';

    const content: HTMLElement = createElem('div', styles['content']);

    const header: HTMLElement = renderHeader();
    const footer: HTMLElement = renderFooter();
    const main: HTMLElement = renderMainPage();

    content.append(header);

    appContiner.append(header, main, footer);
    return appContiner;
};
