import { renderFooter } from '../Footer/Footer';
import { renderHeader } from '../Header/Header';
import styles from './App.module.scss';

export const renderApp = (): Element => {
    document.body.classList.add(styles['body']);

    // #app - точка входа в разметке html
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.innerHTML = '';

    const header: HTMLElement = renderHeader();
    const footer: HTMLElement = renderFooter();
    // const main = ;

    appContiner.append(header, footer);
    return appContiner;
};
