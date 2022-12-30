import styles from './Pagination.module.scss';
import { createElem } from '../../../utils/create-element';
import { renderPaginationBnt } from './components/PaginationBtns/PaginationBtn';

export const renderPagination = (curPage: number, numPages: number): HTMLElement => {
    const paginationContainer: HTMLElement = createElem('div', styles['cart__pagination-container']);
    const leftBtn: HTMLElement = renderPaginationBnt(curPage - 1, '<');
    const curPageIndicator: HTMLElement = createElem('span', 'cart__pagination-cur');
    curPageIndicator.innerHTML = curPage.toString();
    const rightBtn: HTMLElement = renderPaginationBnt(curPage + 1, '>');

    // first page
    if (curPage === 1 && numPages > 1) {
        leftBtn.classList.add('disabled');
    }
    // last page
    else if (curPage === numPages && numPages > 1) {
        console.log('here');
        leftBtn.classList.remove('disabled');
        rightBtn.classList.add('disabled');
    }
    // other pages
    else if (curPage < numPages) {
        leftBtn.classList.remove('disabled');
        rightBtn.classList.remove('disabled');
    }
    // empty page or first page and no other pages
    else {
        leftBtn.classList.add('disabled');
        rightBtn.classList.add('disabled');
    }

    paginationContainer.append(leftBtn, curPageIndicator, rightBtn);
    return paginationContainer;
};
