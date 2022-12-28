import { renderProductQuantity } from '../components/PageProducts/conponents/Product/components/Information/components/InfoOrderProducts/InfoOrderProducts';
import { productsCartData } from '../const/store';
import { findProduct } from './find-products';
import { updateComponent } from './update-component';

export const onLoadPage = (
    product: ExtendedProduct,
    parent: HTMLElement,
    startChild: HTMLElement,
    page: string,
    loadChild?: HTMLElement
) => {
    if (!productsCartData.count) {
        return updateComponent(parent, startChild);
    }

    const findedProduct = findProduct(product.id, product.sizes[0]) as CartData;

    if (!findedProduct) {
        return updateComponent(parent, startChild);
    }

    return updateComponent(
        parent,
        renderProductQuantity({
            countProduct: findedProduct.quantity,
            activeSize: product.sizes[0],
            product,
            onEmptyCount: () => updateComponent(parent, startChild),
            page: page,
        }),
        loadChild
    );
};
