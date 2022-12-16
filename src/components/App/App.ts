import { renderHeader } from '../Header/Header';
import styles from './App.module.scss';

export const renderApp = (): Element => {
    document.body.classList.add(styles['body']);

    // #app - точка входа в разметке html
    // накидываем стиль на контейнер
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.classList.add(styles['container']);
    appContiner.innerHTML = '';

    const header: HTMLElement = renderHeader();
    const footer = `<h2>здесь будет футер</h2>`;
    const main = `<h2>здесь будет мейн</h2>`;

    appContiner.append(header, main, footer);
    return appContiner;
};
