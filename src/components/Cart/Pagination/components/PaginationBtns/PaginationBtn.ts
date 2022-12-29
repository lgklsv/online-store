import styles from './PaginationBtn.module.scss';
import { createElem } from '../../../../../utils/create-element';
import { pagination } from '../../../../../const/store';
import { updatedPaginationBtns } from './components/update-paginaiton-btns';
import { updateCartItems } from './components/update-rendered-items';

export const renderPaginationBnt = (goTo: number, icon: string): HTMLElement => {
    const button: HTMLElement = createElem('button', styles['cart__pagination-btn']);
    button.dataset.goto = goTo.toString();
    button.innerHTML = icon;

    button.onclick = (e: Event): void => {
        const target = e.target as HTMLElement;
        if (target.dataset.goto) {
            pagination.page = +target.dataset.goto;

            updateCartItems();
            updatedPaginationBtns();
        }
    };
    return button;
};
