import { renderProductQuantity } from '../components/PageProducts/conponents/Product/components/Information/components/InfoOrderProducts/InfoOrderProducts';
import { productsCartData } from '../const/store';
import { updateComponent } from './update-component';

export const onLoadPage = (
    product: ExtendedProduct,
    parent: HTMLElement,
    startChild: HTMLElement,
    loadChild?: HTMLElement
) => {
    if (!productsCartData.count) {
        return updateComponent(parent, startChild);
    }

    const findedProduct = productsCartData.productsInCart.find((data) => {
        return product.id === data.product.id && String(data.size) === product.sizes[0];
    }) as CartData;

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
        }),
        loadChild
    );
};
