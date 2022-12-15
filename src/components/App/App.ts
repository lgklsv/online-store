import styles from './App.scss';

export const renderApp = () => {
    // накидываем стиль на body
    document.body.classList.add(styles['body']);

    // #app - точка входа в разметке html
    // накидываем стиль на контейнер
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.classList.add(styles['container']);

    // const header = renderHeader();

    // appContiner.append(
    //     header
    //     // main,
    //     // footer,
    //     // button,
    // );
};
