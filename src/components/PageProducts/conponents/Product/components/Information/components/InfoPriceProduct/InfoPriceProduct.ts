import { createElem } from '../../../../../../../../utils/create-element';
import { newPrice } from '../../../../../../../../utils/edit-price';
import styles from './InfoPriceProduct.module.scss';

export const renderPriceProducts = (product: ExtendedProduct): HTMLElement => {
  const productPrice: HTMLElement = createElem('div', styles['product-page__price']);
  const productPriceFull: HTMLElement = createElem('span', 'product-card__price-full');
  productPriceFull.innerHTML = `${String(product.price)} ₽`;

  if (product.discountPercentage !== 0) {
    const productPriceDiscount: HTMLElement = createElem('span', 'product-card__price-discount');
    productPriceFull.classList.add('old-price');
    productPriceDiscount.innerHTML = `–${String(product.discountPercentage)}%`;

    const productPriceNew: HTMLElement = createElem('div', 'product-card__price-new');
    productPriceNew.innerHTML = `${newPrice(product.price, product.discountPercentage)} ₽`;

    productPrice.append(productPriceNew, productPriceFull, productPriceDiscount);
  } else {
    productPrice.append(productPriceFull);
  }

  return productPrice;
};
