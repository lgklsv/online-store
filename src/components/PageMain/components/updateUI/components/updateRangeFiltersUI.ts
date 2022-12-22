/** Функция которая универсально обновялет UI в range фильтрах */
export const updateRangeFiltersUI = (data: number[], type: string): void => {
    const inputLeft = document.querySelector(`.num-input-left_${type}`) as HTMLInputElement;
    const inputRight = document.querySelector(`.num-input-right_${type}`) as HTMLInputElement;

    const minVal = data[0] || 0;
    const maxVal = data[data.length - 1] || 0;

    inputLeft.value = minVal.toString();
    inputRight.value = maxVal.toString();

    const rangeInputs = document.querySelector(`.slide-filter__ranges_${type}`) as HTMLElement;
    const [rangeInputLeft, rangeInputRight] = Array.from(rangeInputs.children) as HTMLInputElement[];

    rangeInputLeft.value = minVal.toString();
    rangeInputRight.value = maxVal.toString();

    const progress = document.querySelector(`.progress_${type}`) as HTMLElement;
    progress.style.left = (minVal / +rangeInputLeft.max) * 100 + '%';
    progress.style.right = 100 - (maxVal / +rangeInputRight.max) * 100 + '%';
};
