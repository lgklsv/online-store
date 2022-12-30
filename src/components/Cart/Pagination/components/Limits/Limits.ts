import styles from './Limits.module.scss';
import { createElem } from '../../../../../utils/create-element';
import { createInput } from '../../../../../utils/create-input-element';
import { pagination } from '../../../../../const/store';
import { updateCartItems } from '../PaginationBtns/components/update-rendered-items';
import { updatedPaginationBtns } from '../PaginationBtns/components/update-paginaiton-btns';

export const renderLimits = (limit: number): HTMLElement => {
    const limitContainer: HTMLElement = createElem('div', styles['cart__limit']);
    const limitHeader: HTMLElement = createElem('p', 'cart__limit-heading');
    limitHeader.innerHTML = 'Показывать на странице';
    const limitInput: HTMLElement = createInput('number', 'cart__limit-input', limit.toString());
    limitInput.setAttribute('min', '1');

    limitInput.onchange = (e: Event): void => {
        const target = e.target as HTMLInputElement;

        if (!/^[1-9]+[0-9]*$/.test(target.value)) target.value = '1';

        pagination.limit = +target.value;

        updatedPaginationBtns();
        updateCartItems();
    };

    limitContainer.append(limitHeader, limitInput);

    return limitContainer;
};
