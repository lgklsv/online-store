import styles from './App.module.scss';

export const renderApp = () => {
    // накидываем стиль на body
    document.body.classList.add(styles['body']);
    console.log(styles);
    // #app - точка входа в разметке html
    // накидываем стиль на контейнер
    const appContiner: Element = document.querySelector('#app') as Element;
    appContiner.classList.add(styles['container']);

    const birdMenuList = document.createElement('ul');
    // birdMenuList.classList.add('bird-menu__list');

    // SCORE
    for (let i = 0; i < 4; i++) {
        const birdMenuItem = document.createElement('li');
        // birdMenuItem.classList.add('bird-menu__item');

        const itemLink = document.createElement('a');
        // itemLink.classList.add('item_link');
        itemLink.innerHTML = `aaaaaaaaaaaaaaaaaaaaaaaa}`;

        birdMenuItem.append(itemLink);
        birdMenuList.append(birdMenuItem);
    }

    // const header = renderHeader();

    appContiner.append(birdMenuList);
};
