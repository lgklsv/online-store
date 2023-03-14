import { appliedFilters, priceGap } from '../../../../../../../const/store';
import { renderFiltered } from '../../../../Filter/filter';

export const onChangeRangeInput = (e: Event): void => {
  const targetInput = e.target as HTMLInputElement;
  const rangeInputsEl = targetInput.parentElement as HTMLElement;
  const filterType = rangeInputsEl.classList.contains('slide-filter__ranges_price') ? 'price' : 'stock';
  const beforRangeInputParent = rangeInputsEl.previousElementSibling as HTMLElement;
  const progress = beforRangeInputParent.firstElementChild as HTMLElement;

  const rangeInputs = rangeInputsEl.children;
  const rangeLeft = rangeInputs[0] as HTMLInputElement;
  const rangeRight = rangeInputs[1] as HTMLInputElement;

  const minVal = +rangeLeft.value;
  const maxVal = +rangeRight.value;

  if (maxVal - minVal < priceGap) {
    if (targetInput.classList.contains('range-input_left')) {
      rangeLeft.value = (maxVal - priceGap).toString();
    } else {
      rangeRight.value = (minVal + priceGap).toString();
    }
  } else {
    progress.style.left = `${(minVal / +rangeLeft.max) * 100}%`;
    progress.style.right = `${100 - (maxVal / +rangeRight.max) * 100}%`;
  }

  if (!appliedFilters[filterType]) appliedFilters[filterType] = [];
  appliedFilters[filterType] = [minVal, maxVal];
  renderFiltered(appliedFilters);
};
