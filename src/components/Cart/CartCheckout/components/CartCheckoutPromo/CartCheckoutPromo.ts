import { LOCAL_STORAGE_KEYS } from '../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT, PROMOCODES_NAMES } from '../../../../../const/promocodes';
// import { productsCartData } from '../../../../../const/store';
// import { calcAmountCart, calcDiscount } from '../../../../../utils/calculate-amount-cart';
import { createElem } from '../../../../../utils/create-element';
import { setLocalStorage } from '../../../../../utils/local-storage';
// import { updateTotalSumm } from '../../../../../utils/update-cart';
import styles from './CartCheckoutPromo.module.scss';

export const renderCartCheckoutPromo = (
    input: HTMLInputElement,
    title: HTMLElement,
    buttom: HTMLElement
): HTMLElement => {
    const promoWrap: HTMLElement = createElem('div', styles['checkout-coupon__wrapper']);

    if (promocodeStorage.promo.length !== 0) {
        console.log('данные есть в массиве');
        addPromocodes(promoWrap);
    }

    let promoData = '';

    input.oninput = () => {
        let valueInput: string = input.value.toLocaleLowerCase().trim();

        Object.entries(PROMOCODES_NAMES).forEach(([key, value]) => {
            if (valueInput === value.toLocaleLowerCase()) {
                title.innerHTML = `${key}  –${PROMOCODES_DISCOUNT[value]}%`;
                buttom.removeAttribute('disabled');
                promoData = value;
                console.log(promoData);
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
        const findedPromocode = promocodeStorage.promo.find((promocode) => {
            return promoData === promocode;
        });

        if (!findedPromocode) {
            console.log('НЕТ СОВПАДЕНИЙ');

            //изменяем глобальный объект
            promocodeStorage.promo.push(promoData);
            console.log(PROMOCODES_DISCOUNT[promoData as PromoDiscount]);
            promocodeStorage.discount = promocodeStorage.discount + PROMOCODES_DISCOUNT[promoData as PromoDiscount];

            // обновляем локальное хранилище
            setLocalStorage(promocodeStorage, LOCAL_STORAGE_KEYS.PROMOCODES);
            addPromocodes(promoWrap);

            return;
        }

        if (findedPromocode) {
            console.log('СОВПАДЕНИЕ ЕСТЬ! ЕСТЬ ПОПАДАНИЕ');
            // addPromocodes(promoWrap);
            // можно не обновлять блок!
        }

        // const total = calcAmountCart(productsCartData.productsInCart);
        // updateTotalSumm(`${total} ₽`, calcDiscount(total, promocodeStorage.discount), promoWrap);

        console.log('Я нажала на кнопочку', promocodeStorage);
    };

    return promoWrap;
};

// TODO -  влокале нужно сумма скидки`
// store.sorted = SORT_FUNCTIONS[filterValueArr as unknown as SortTypes](storeType);

export const addPromocodes = (parent: HTMLElement): void => {
    parent.innerHTML = '';
    promocodeStorage.promo.forEach((promo) => {
        const promoBlock: HTMLElement = createElem('div', 'checkout-coupon__promo');
        promoBlock.innerHTML = `${promo}`;
        parent.append(promoBlock);
    });
};
