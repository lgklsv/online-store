import { createElem } from '../../../../utils/create-element';
import styles from './MainToolbar.module.scss';

export const renderMainToolbar = (): HTMLElement => {
    const mainToolbar: HTMLElement = createElem('div', 'main__toolbar');

    const toolbarSelect: HTMLElement = createElem('div', styles['toolbar__select_item-sort']);

    mainToolbar.append(toolbarSelect);

    return mainToolbar;
};
