export const updateComponent = (parent: HTMLElement, ...сhild: (HTMLElement | undefined)[]): void => {
    parent.innerHTML = '';

    parent.append(...(сhild.filter(Boolean) as HTMLElement[]));
};
