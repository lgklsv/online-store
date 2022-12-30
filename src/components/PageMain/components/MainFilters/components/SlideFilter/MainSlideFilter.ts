import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import styles from './MainSlideFilter.module.scss';
import { appliedFilters } from '../../../../../../const/store';
import { renderFiltered } from '../../../Filter/filter';

/** Функция создает универсальный фильтр со слайдером, аргументы: название фильтра, подкласс и массив чисел для фильтрации */
export const renderSlideFilter = (title: string, rangeIcon: string, data: number[], subClass: string): HTMLElement => {
    const slideFilter: HTMLElement = createElem('div', styles['slide-filter']);
    // Heading
    const heading: HTMLElement = createElem('h3', 'slide-filter__heading');
    heading.classList.add('filter-title');
    heading.innerHTML = title;

    // MIN MAX
    const min = data[0].toString();
    const max = data[data.length - 1].toString();

    // Num input 1
    const slideFilterNumbers: HTMLElement = createElem('div', 'slide-filter__numbers');

    const numbersFrom: HTMLElement = createElem('div', 'slide-filter-num');
    const numbersFromTitle: HTMLElement = createElem('div', 'slide-filter-num__title');
    numbersFromTitle.innerHTML = 'От';
    const numbersInputFromWrap: HTMLElement = createElem('div', `slide-filter-num__input-wrap_${rangeIcon}`);
    const numbersFromInput: HTMLInputElement = createInput('number', 'slide-filter-num__input', min);
    numbersFromInput.classList.add(`num-input-left_${subClass}`);

    numbersInputFromWrap.append(numbersFromInput);
    numbersFrom.append(numbersFromTitle, numbersInputFromWrap);

    // Num input 2
    const numbersTo: HTMLElement = createElem('div', 'slide-filter-num');
    const numbersToTitle: HTMLElement = createElem('div', 'slide-filter-num__title');
    numbersToTitle.innerHTML = 'До';
    const numbersInputToWrap: HTMLElement = createElem('div', `slide-filter-num__input-wrap_${rangeIcon}`);
    const numbersToInput: HTMLInputElement = createInput('number', 'slide-filter-num__input', max);
    numbersToInput.classList.add(`num-input-right_${subClass}`);

    numbersInputToWrap.append(numbersToInput);
    numbersTo.append(numbersToTitle, numbersInputToWrap);

    slideFilterNumbers.append(numbersFrom, numbersTo);

    const priceGap = 1;

    slideFilterNumbers.onchange = (e: Event): void => {
        const targetInput = e.target as HTMLInputElement;
        const filterType =
            targetInput.classList.contains('num-input-left_price') ||
            targetInput.classList.contains('num-input-right_price')
                ? 'price'
                : 'stock';

        const side = targetInput.className.includes('left') ? 'left' : 'right';

        const rangeInputsParent = document.querySelector(`.slide-filter__ranges_${filterType}`) as HTMLElement;
        const progress = document.querySelector(`.progress_${filterType}`) as HTMLElement;
        const rangeInputs = rangeInputsParent.children;

        const rangeLeft = rangeInputs[0] as HTMLInputElement;
        const rangeRight = rangeInputs[1] as HTMLInputElement;

        let minVal = side === 'left' ? +targetInput.value : +rangeLeft.value;
        let maxVal = side === 'right' ? +targetInput.value : +rangeRight.value;

        if (maxVal - minVal < priceGap) {
            if (side === 'left') {
                rangeLeft.value = (maxVal - priceGap).toString();
            } else {
                rangeRight.value = (minVal + priceGap).toString();
            }
        } else {
            progress.style.left = (minVal / +rangeLeft.max) * 100 + '%';
            progress.style.right = 100 - (maxVal / +rangeRight.max) * 100 + '%';
        }

        if (!appliedFilters[filterType]) appliedFilters[filterType] = [];
        appliedFilters[filterType] = [minVal, maxVal];
        renderFiltered(appliedFilters);
    };

    // Double range slider
    const slideFilterSlider: HTMLElement = createElem('div', 'slide-filter__slider');
    const sliderProgress: HTMLElement = createElem('div', 'progress');
    sliderProgress.classList.add(`progress_${subClass}`);

    slideFilterSlider.append(sliderProgress);

    // Range inputs
    const rangeInputs: HTMLElement = createElem('div', 'slide-filter__ranges');
    rangeInputs.classList.add(`slide-filter__ranges_${subClass}`);

    const leftRangeInput: HTMLInputElement = createInput('range', 'slide-filter__range-input');
    leftRangeInput.classList.add('range-input_left');
    leftRangeInput.setAttribute('min', min);
    leftRangeInput.setAttribute('max', max);
    leftRangeInput.setAttribute('value', min);

    const rightRangeInput: HTMLInputElement = createInput('range', 'slide-filter__range-input');
    rightRangeInput.classList.add('range-input_right');
    rightRangeInput.setAttribute('min', min);
    rightRangeInput.setAttribute('max', max);
    rightRangeInput.setAttribute('value', max);

    rangeInputs.oninput = (e: Event): void => {
        const targetInput = e.target as HTMLInputElement;
        const rangeInputsEl = targetInput.parentElement as HTMLElement;
        const filterType = rangeInputsEl.classList.contains('slide-filter__ranges_price') ? 'price' : 'stock';
        const beforRangeInputParent = rangeInputsEl.previousElementSibling as HTMLElement;
        const progress = beforRangeInputParent.firstElementChild as HTMLElement;

        const rangeInputs = rangeInputsEl.children;
        const rangeLeft = rangeInputs[0] as HTMLInputElement;
        const rangeRight = rangeInputs[1] as HTMLInputElement;

        let minVal = +rangeLeft.value;
        let maxVal = +rangeRight.value;

        if (maxVal - minVal < priceGap) {
            if (targetInput.classList.contains('range-input_left')) {
                rangeLeft.value = (maxVal - priceGap).toString();
            } else {
                rangeRight.value = (minVal + priceGap).toString();
            }
        } else {
            progress.style.left = (minVal / +rangeLeft.max) * 100 + '%';
            progress.style.right = 100 - (maxVal / +rangeRight.max) * 100 + '%';
        }

        if (!appliedFilters[filterType]) appliedFilters[filterType] = [];
        appliedFilters[filterType] = [minVal, maxVal];
        renderFiltered(appliedFilters);
    };

    rangeInputs.append(leftRangeInput, rightRangeInput);
    slideFilter.append(heading, slideFilterNumbers, slideFilterSlider, rangeInputs);
    return slideFilter;
};
