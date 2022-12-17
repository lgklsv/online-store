import styles from './MainFilters.module.scss';
import { createElem } from '../../../../utils/create-element';

export const renderMainFilters = (): HTMLElement => {
    const filters: HTMLElement = createElem('div', styles['filters']);

    return filters;
}
