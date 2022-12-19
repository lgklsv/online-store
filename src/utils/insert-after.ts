/** Функция вставляет элемент после выбранного элемента, агрументы, сначала элемент после которого вставить, а потом элемент, который необходимо вставить */
export const insertAfter = function (insertAfterEl: HTMLElement, element: HTMLElement) {
    if (insertAfterEl?.parentNode instanceof HTMLElement) {
        insertAfterEl.parentNode.insertBefore(element, insertAfterEl.nextSibling);
    }
};
