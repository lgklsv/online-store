import styles from './PaginationBtn.module.scss';
import { createElem } from "../../../../../utils/create-element";

export const renderPaginationBnt = (goTo: number, icon: string): HTMLElement => {
    const button: HTMLElement = createElem('button', styles['cart__pagination-btn']);
    button.dataset.goto = goTo.toString();
    button.innerHTML = icon;
    return button;
};
