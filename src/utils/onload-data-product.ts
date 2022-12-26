import { renderProductQuantity } from '../components/PageProducts/conponents/Product/components/Information/components/InfoOrderProducts/InfoOrderProducts';
import { productsCartData } from '../const/store';

export const onLoadPage = (
    product: ExtendedProduct,
    parent: HTMLElement,
    startChild: HTMLElement,
    loadChide?: HTMLElement
) => {
    if (productsCartData.count !== 0) {
        const findedProduct = productsCartData.productsInCart.find((data) => {
            return product.id === data.product.id && String(data.size) === product.sizes[0];
        }) as CartData;

        if (!findedProduct) {
            parent.append(startChild);
        } else {
            if (loadChide) {
                parent.append(
                    renderProductQuantity(findedProduct.quantity, product.sizes[0], product, parent, startChild),
                    loadChide
                );
            } else {
                parent.append(
                    renderProductQuantity(findedProduct.quantity, product.sizes[0], product, parent, startChild)
                );
            }
        }
    } else parent.append(startChild);
};
