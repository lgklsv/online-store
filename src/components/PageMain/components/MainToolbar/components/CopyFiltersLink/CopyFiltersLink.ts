import styles from './CopyFiltersLink.module.scss';
import { createElem } from '../../../../../../utils/create-element';
import { appliedFilters } from '../../../../../../const/store';

export const updateCopyFiltersBtn = (): void => {
    const toolbarContainer = document.querySelector('.main__toolbar') as HTMLElement;
    const filtersToolbarEl = toolbarContainer.firstElementChild as HTMLElement;

    if (Object.entries(appliedFilters).length === 0) {
        const copyFiltersBtn = document.querySelector('.toolbar__copy-filters') as HTMLElement;
        copyFiltersBtn.remove();
    } else {
        const targetEl = document.querySelector('.toolbar__copy-filters');
        if (!(targetEl instanceof HTMLElement)) {
            const copyFiltersBtn: HTMLElement = createElem('div', styles['toolbar__copy-filters']);
            const copyText: HTMLElement = createElem('span', 'toolbar__copy-filters-tooltip');
            copyText.innerHTML = 'Скопировать фильтры';

            const copyIcon: HTMLElement = createElem('img', 'toolbar__copy-filters-icon');
            copyIcon.setAttribute('src', 'https://img.icons8.com/fluency-systems-regular/48/null/clone-figure--v3.png');

            copyFiltersBtn.append(copyText, copyIcon);
            filtersToolbarEl.before(copyFiltersBtn);

            copyFiltersBtn.onclick = (): void => {
                copyText.innerHTML = 'Скопированно!';
                console.log(window.location.href);
                navigator.clipboard.writeText(window.location.href);
                setTimeout(() => {
                    copyText.innerHTML = 'Скопировать фильтры';
                }, 1000);
            };
        }
    }
};
