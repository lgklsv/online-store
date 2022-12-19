export const searchProdInput = (value_input: string): void => {
    console.log(value_input);
    const source: NodeListOf<HTMLElement> = document.querySelectorAll('.products-card');

    if (value_input != '') {
        source.forEach((elem: HTMLElement) => {
            if (elem.dataset.product?.toLocaleLowerCase().search(value_input) == -1) {
                elem.classList.add('hide');
            } else {
                elem.classList.remove('hide');
            }
        });
    } else {
        source.forEach((elem: HTMLElement) => {
            elem.classList.remove('hide');
        });
    }
};
