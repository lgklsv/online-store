import { LOCAL_STORAGE_KEYS } from '../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT, PROMOCODES_NAMES } from '../../../../../const/promocodes';
import { productsCartData } from '../../../../../const/store';
import { calcAmountCart, calcDiscount } from '../../../../../utils/calculate-amount-cart';
import { createElem } from '../../../../../utils/create-element';
import { formatPriceNum } from '../../../../../utils/format-price';
import { setLocalStorage } from '../../../../../utils/local-storage';
import { updateTotalSumm } from '../../../../../utils/update-cart';
import styles from './CartCheckoutPromo.module.scss';

export const renderCartCheckoutPromo = (
    input: HTMLInputElement,
    title: HTMLElement,
    buttom: HTMLElement
): HTMLElement => {
    const promoWrap: HTMLElement = createElem('div', styles['checkout-coupon__wrapper']);

    if (promocodeStorage.promo.length !== 0) {
        addPromocodes(promoWrap);
    }

    let promoData: string = '';

    input.oninput = () => {
        let valueInput: string = input.value.toLocaleLowerCase().trim();

        Object.entries(PROMOCODES_NAMES).forEach(([key, value]) => {
            if (valueInput === value.toLocaleLowerCase()) {
                title.innerHTML = `${key}  –${PROMOCODES_DISCOUNT[value]}%`;
                buttom.removeAttribute('disabled');
                promoData = value;
                return;
            }
            if (valueInput === '') {
                title.innerHTML = ``;
                buttom.setAttribute('disabled', 'true');
            }
        });
    };

    buttom.onclick = () => {
        // проверяем есть ли данный промокод в глобальнои объекте
        const findedPromocode = promocodeStorage.promo.find((promocode: string) => {
            return promoData === promocode;
        });

        if (!findedPromocode) {
            //изменяем глобальный объект
            promocodeStorage.promo.push(promoData);
            promocodeStorage.discount = promocodeStorage.discount + PROMOCODES_DISCOUNT[promoData as PromoDiscount];

            // обновляем локальное хранилище
            setLocalStorage(promocodeStorage, LOCAL_STORAGE_KEYS.PROMOCODES);
            addPromocodes(promoWrap);

            // изменяем общую сумму корзины
            let total = calcAmountCart(productsCartData.productsInCart); //общая сумма товаров в корзине
            total = total.replace(' ', '');
            
            updateTotalSumm(`${formatPriceNum(total)} ₽`, calcDiscount(total, promocodeStorage.discount), promoWrap);

            return;
        }

        if (findedPromocode) {
            title.innerHTML = 'Промокод уже активирован';
            setTimeout(() => {
                title.innerHTML = '';
            }, 2000);
        }
    };

    return promoWrap;
};

export const addPromocodes = (parent: HTMLElement): void => {
    parent.innerHTML = '';

    promocodeStorage.promo.forEach((promo: string) => {
        const promoBlock: HTMLElement = createElem('div', 'checkout-coupon__promo');
        const promoName: HTMLElement = createElem('div', 'checkout-coupon__promo-name');
        const promoDisc: HTMLElement = createElem('div', 'checkout-coupon__promo-discount');
        const promoDelete: HTMLElement = createElem('div', 'checkout-coupon__promo-delete');
        promoDelete.setAttribute('id', `${promo}`);
        promoDelete.innerHTML = 'Удалить';

        promoDelete.onclick = (event: Event) => {
            let index: number = 0;
            const findedPromo = promocodeStorage.promo.find((promo: string, i: number) => {
                index = i; // получаем индекс найденного товара в массиве
                return (event.target as HTMLElement).id == promo;
            });

            promocodeStorage.discount -= PROMOCODES_DISCOUNT[findedPromo as PromoDiscount];
            promocodeStorage.promo.splice(index, 1); // удаляем товар из массива
            setLocalStorage(promocodeStorage, LOCAL_STORAGE_KEYS.PROMOCODES);

            let total = calcAmountCart(productsCartData.productsInCart); //общая сумма товаров в корзине
            total = total.replace(' ', '');

            updateTotalSumm(`${formatPriceNum(total)} ₽`, calcDiscount(total, promocodeStorage.discount));
            addPromocodes(parent);
        };

        promoName.innerHTML = `${promo}`;
        promoDisc.innerHTML = `– ${PROMOCODES_DISCOUNT[promo as PromoDiscount]}%`;
        promoBlock.append(promoName, promoDisc, promoDelete);
        parent.append(promoBlock);
    });
};
