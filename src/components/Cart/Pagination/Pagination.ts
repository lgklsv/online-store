import styles from './Pagination.module.scss';
import { createElem } from "../../../utils/create-element"
import { renderPaginationBnt } from "./components/PaginationBtns/PaginationBtn";

export const renderPagination = (curPage: number): HTMLElement => {
    const paginationContainer: HTMLElement = createElem('div', styles['cart__pagination']);
    const leftBtn: HTMLElement = renderPaginationBnt(curPage - 1, '<');
    const curPageIndicator: HTMLElement = createElem('span', 'cart__pagination-cur');
    curPageIndicator.innerHTML = curPage.toString(); 
    const rightBtn: HTMLElement = renderPaginationBnt(curPage + 1, '>');

    paginationContainer.append(leftBtn, curPageIndicator, rightBtn);
    return paginationContainer;
}
