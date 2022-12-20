export const changeClass = (remove: HTMLElement, add: HTMLElement, className: string) => {
    remove.classList.remove(className);
    add.classList.add(className);
};
