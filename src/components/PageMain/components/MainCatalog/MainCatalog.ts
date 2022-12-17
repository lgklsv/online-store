import { createElem } from '../../../../utils/create-element';
import styles from './MainCatalog.module.scss';

export const renderMainCatalog = (): HTMLElement => {
    const catalog: HTMLElement = createElem('div', styles['catalog']);

    // catalog.append(toolbarSelect, selectDrop);

    return catalog;
};
