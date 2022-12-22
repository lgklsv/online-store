export const changeClass = (remove: HTMLElement, add: HTMLElement, className: string): void => {
    remove.classList.remove(className);
    add.classList.add(className);
};
