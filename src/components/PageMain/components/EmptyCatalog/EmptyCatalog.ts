import { createElem } from '../../../../utils/create-element';
import { createLink } from '../../../../utils/create-link-element';
import styles from './EmptyCatalog.module.scss';

export const renderEmptyCatalog = (): HTMLElement => {
    const mainContent: HTMLElement = createElem('div', styles['empty-catalog']);

    const errorMessage: HTMLElement = createElem('p', 'empty-catalog__message');
    errorMessage.innerHTML = 'Товары не найдены ( ´•︵•` )';

    const btnToMain: HTMLElement = createLink('/', 'empty-catalog__btn', false, 'Сбросить фильтры');

    mainContent.append(errorMessage, btnToMain);

    return mainContent;
};
