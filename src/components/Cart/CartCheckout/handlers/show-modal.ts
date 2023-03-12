import { toggleModal } from '../../CheckoutModal/components/ToggleModal';

export const showModal = () => {
  const overlay = document.querySelector('.checkout-modal__overlay') as HTMLElement;
  const modal = document.querySelector('.checkout-modal') as HTMLElement;
  toggleModal(modal, overlay);
};
