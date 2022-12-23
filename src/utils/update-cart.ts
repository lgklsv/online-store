export const updateHeaderCount = (newCount: number | string) => {
    const counterProduct = document.querySelector('.cart-counter') as HTMLElement;
    counterProduct.innerHTML = String(newCount);
};
