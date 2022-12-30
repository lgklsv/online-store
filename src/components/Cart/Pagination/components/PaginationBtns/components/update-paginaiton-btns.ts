import { renderPagination } from '../../../Pagination';
import { productsCartData } from '../../../../../../const/store';
import { pagination } from '../../../../../../const/store';
import { updateCartItems } from './update-rendered-items';

export const updatePaginationBtns = (): void => {
    const paginationContainer = document.querySelector('.cart__pagination') as HTMLElement;
    const numPages = Math.ceil(productsCartData.productsInCart.length / pagination.limit);
    paginationContainer.innerHTML = '';
    if (pagination.page > numPages) {
        pagination.page = numPages;
        updateCartItems();
    }

    const updatedPagination = renderPagination(pagination.page, numPages);
    paginationContainer.append(updatedPagination);
};
