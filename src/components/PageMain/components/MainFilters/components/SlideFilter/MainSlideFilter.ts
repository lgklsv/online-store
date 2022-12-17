import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import styles from './MainSlideFilter.module.scss';

/** Функция создает универсальный фильтр со слайдером, аргументы: название фильтра, подкласс и массив чисел для фильтрации */
export const renderSlideFilter = (
    title: string,
    rangeIcon: string,
    data?: number[],
    subClass?: string
): HTMLElement => {
    const slideFilter: HTMLElement = createElem('div', styles['slide-filter']);
    // Heading
    const heading: HTMLElement = createElem('h3', 'slide-filter__heading');
    heading.innerHTML = title;

    // Num input 1
    const slideFilterNumbers: HTMLElement = createElem('div', 'slide-filter__numbers');

    const numbersFrom: HTMLElement = createElem('div', 'slide-filter-num');
    const numbersFromTitle: HTMLElement = createElem('div', 'slide-filter-num__title');
    numbersFromTitle.innerHTML = 'От';
    const numbersInputFromWrap: HTMLElement = createElem('div', `slide-filter-num__input-wrap_${rangeIcon}`);
    const numbersFromInput: HTMLInputElement = createInput('number', 'slide-filter-num__input', '434'); // приходит на основе данных

    numbersInputFromWrap.append(numbersFromInput);
    numbersFrom.append(numbersFromTitle, numbersInputFromWrap);

    // Num input 2
    const numbersTo: HTMLElement = createElem('div', 'slide-filter-num');
    const numbersToTitle: HTMLElement = createElem('div', 'slide-filter-num__title');
    numbersToTitle.innerHTML = 'До';
    const numbersInputToWrap: HTMLElement = createElem('div', `slide-filter-num__input-wrap_${rangeIcon}`);
    const numbersToInput: HTMLInputElement = createInput('number', 'slide-filter-num__input', '13434');
    // приходит на основе данных

    numbersInputToWrap.append(numbersToInput);
    numbersTo.append(numbersToTitle, numbersInputToWrap);

    slideFilterNumbers.append(numbersFrom, numbersTo);

    // Double range slider
    const slideFilterSlider: HTMLElement = createElem('div', 'slide-filter__slider');
    const sliderProgress: HTMLElement = createElem('div', 'progress');

    slideFilterSlider.append(sliderProgress);

    // Range inputs
    const rangeInputs: HTMLElement = createElem('div', 'slide-filter__ranges');

    const leftRangeInput: HTMLInputElement = createInput('range', 'slide-filter__range-input');
    leftRangeInput.setAttribute('min', '0'); // приходит на основе данных
    leftRangeInput.setAttribute('max', '10000');
    leftRangeInput.setAttribute('value', '2500');

    const rightRangeInput: HTMLInputElement = createInput('range', 'slide-filter__range-input');
    rightRangeInput.setAttribute('min', '0'); // приходит на основе данных
    rightRangeInput.setAttribute('max', '10000');
    rightRangeInput.setAttribute('value', '7500');

    rangeInputs.append(leftRangeInput, rightRangeInput);

    slideFilter.append(heading, slideFilterNumbers, slideFilterSlider, rangeInputs);
    return slideFilter;
};
