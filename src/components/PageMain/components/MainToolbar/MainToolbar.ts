import { createElem } from '../../../../utils/create-element';
import { renderSelectSort } from './components/SelectSort/SelectSort';
import styles from './MainToolbar.module.scss';

export const renderMainToolbar = (): HTMLElement => {
    const mainToolbar: HTMLElement = createElem('div', styles['main__toolbar']);

    const selectSort: HTMLElement = renderSelectSort();

    mainToolbar.append(selectSort);

    return mainToolbar;
};
