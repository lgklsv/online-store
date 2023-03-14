import { ROUTER_PATHS } from './router-paths';
import { extractPathId } from '../utils/extract-path-id';
import { findProductById } from '../utils/find-product-by-id';
import { PATH_NAMES } from '../const/path-names';
import { appliedFilters, productsCartData } from '../const/store';
import { fromQueryString } from '../components/PageMain/components/QueryString/from-query-string';
import { renderFiltered } from '../components/PageMain/components/Filter/filter';
import { fromQueryStringToPag } from '../components/Cart/Pagination/components/QueryString/from-query-string-to-pag';
import { updateCartItems } from '../components/Cart/Pagination/components/PaginationBtns/components/update-rendered-items';
import { updatePaginationBtns } from '../components/Cart/Pagination/components/PaginationBtns/components/update-paginaiton-btns';
import { updateLimits } from '../components/Cart/Pagination/components/PaginationBtns/components/update-limit-ui';
import { showModal } from '../components/Cart/CartCheckout/handlers/show-modal';

/** Рендер темплейтов страниц */
export const pathResolver = (pathname: string): void => {
  let route = ROUTER_PATHS[pathname] || ROUTER_PATHS[PATH_NAMES.notFound];
  if (pathname.startsWith(PATH_NAMES.product)) {
    const product = findProductById(extractPathId(pathname));
    if (product !== -1) {
      route = ROUTER_PATHS[PATH_NAMES.product];
      document.title = route.title;
      route.template(product);
    } else {
      route = ROUTER_PATHS[PATH_NAMES.notFound];
      route.template();
      document.title = route.title;
    }
  } else {
    route.template();
    document.title = route.title;

    // Get filters from query string on '/' route
    fromQueryString(window.location.search);
    if (pathname === '/' && Object.entries(appliedFilters).length !== 0) {
      renderFiltered(appliedFilters);
    }

    if (pathname === '/cart' && productsCartData.count !== 0) {
      const shouldOpenOrderModal = window.location.search.includes('order');
      // проверяем есть ли в query строке это значение

      fromQueryStringToPag(window.location.search);
      updateCartItems(); // передеаем в эту функцию параметр
      updatePaginationBtns();
      updateLimits();

      shouldOpenOrderModal && showModal();
      // если есть order - открывает модалку
    }
  }
};

pathResolver(window.location.pathname);

window.addEventListener('popstate', (): void => {
  pathResolver(window.location.pathname);
});
