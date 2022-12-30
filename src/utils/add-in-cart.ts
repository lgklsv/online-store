import { LOCAL_STORAGE_KEYS } from '../const/local-storage';
import { productsCartData } from '../const/store';
import { setLocalStorage } from './local-storage';
import { updateHeader } from './update-cart';

export const addInCart = (product: ExtendedProduct, helper: HelperSize): void => {
    productsCartData.count++;

    const productData: CartData = {
        product: product,
        size: helper.sizeForData,
        quantity: helper.countSizeProducts,
        remainder: product.sizeQuantity[product.sizes.indexOf(helper.sizeForData)],
    };

    productsCartData.productsInCart.push(productData); //изменяем глобальный объект
    setLocalStorage(productsCartData, LOCAL_STORAGE_KEYS.PRODUCT); //обновляем Local Storage

    updateHeader(productsCartData.count, productsCartData.productsInCart); // изменения данных в хэдере
};
