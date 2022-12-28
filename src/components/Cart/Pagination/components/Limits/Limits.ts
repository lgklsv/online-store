import styles from './Limits.module.scss';
import { createElem } from '../../../../../utils/create-element';
import { createInput } from '../../../../../utils/create-input-element';

export const renderLimits = (limit: number): HTMLElement => {
    const limitContainer: HTMLElement = createElem('div', styles['cart__limit']);
    const limitHeader: HTMLElement = createElem('p', 'cart__limit-heading');
    limitHeader.innerHTML = 'Показывать на странице';
    const limitInput: HTMLElement = createInput('number', 'cart__limit-input', limit.toString());

    limitContainer.append(limitHeader, limitInput);

    return limitContainer;
};
