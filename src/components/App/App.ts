import { renderHeader } from '../Header/Header';
import styles from './App.module.scss';

export const renderApp = () => {
    // накидываем стиль на body
    document.body.classList.add(styles['body']);

    // #app - точка входа в разметке html
    // накидываем стиль на контейнер
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.classList.add(styles['container']);

    const header: HTMLElement = renderHeader();

    appContiner.append(header);
};
