// import { LOCAL_STORAGE_KEYS } from '../../../../../const/local-storage';
import { promocodeStorage, PROMOCODES_DISCOUNT, PROMOCODES_NAMES } from '../../../../../const/promocodes';
import { createElem } from '../../../../../utils/create-element';
// import { setLocalStorage } from '../../../../../utils/local-storage';
import styles from './CartCheckoutPromo.module.scss';

export const renderCartCheckoutPromo = (
    input: HTMLInputElement,
    title: HTMLElement,
    buttom: HTMLElement
): HTMLElement => {
    const promoWrap: HTMLElement = createElem('div', styles['checkout-coupon__wrapper']);

    const promo1: HTMLElement = createElem('div', 'checkout-coupon__promo');
    const promoWrap2: HTMLElement = createElem('div', 'checkout-coupon__promo');
    const promoWrap3: HTMLElement = createElem('div', 'checkout-coupon__promo');
    promoWrap2.innerHTML = PROMOCODES_NAMES.SALE5;
    promoWrap3.innerHTML = PROMOCODES_NAMES.EPAM;
    promo1.innerHTML = PROMOCODES_NAMES.RS;
    // PROMOCODES_NAMES.EPAM

    promoWrap.append(promo1, promoWrap2, promoWrap3);

    let promo = '';

    input.oninput = () => {
        let valueInput: string = input.value.toLocaleLowerCase().trim();

        Object.entries(PROMOCODES_NAMES).forEach(([key, value]) => {
            if (valueInput === value.toLocaleLowerCase()) {
                title.innerHTML = `${key}  –${PROMOCODES_DISCOUNT[value]}%`;
                buttom.removeAttribute('disabled');
                promo = value;
                console.log(promo);
                return;
            }
            if (valueInput === '') {
                title.innerHTML = ``;
                buttom.setAttribute('disabled', 'true');
            }
        });
    };

    buttom.onclick = () => {
        promocodeStorage.push(promo); //изменяем глобальный объект
        // setLocalStorage(promocodeStorage, LOCAL_STORAGE_KEYS.PROMOCODES); // добавляем в локальное хранилище!
        console.log('Я нажала на кнопочку', promocodeStorage);
    };

    return promoWrap;
};
