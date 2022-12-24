import { createElem } from "../../../utils/create-element"
import styles from './CheckoutModal.module.scss';


export const renderCheckoutModal = (): HTMLElement => {
    const modal: HTMLElement = createElem('div', styles['checkout-modal']);
    


    return modal;
}
