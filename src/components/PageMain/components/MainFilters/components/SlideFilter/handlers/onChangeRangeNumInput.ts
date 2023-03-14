import { appliedFilters, priceGap } from '../../../../../../../const/store';
import { renderFiltered } from '../../../../Filter/filter';

export const onChangeRangeNumInput = (e: Event): void => {
  const targetInput = e.target as HTMLInputElement;
  const filterType =
    targetInput.classList.contains('num-input-left_price') || targetInput.classList.contains('num-input-right_price')
      ? 'price'
      : 'stock';

  const side = targetInput.className.includes('left') ? 'left' : 'right';

  const rangeInputsParent = document.querySelector(`.slide-filter__ranges_${filterType}`) as HTMLElement;
  const progress = document.querySelector(`.progress_${filterType}`) as HTMLElement;
  const rangeInputs = rangeInputsParent.children;

  const rangeLeft = rangeInputs[0] as HTMLInputElement;
  const rangeRight = rangeInputs[1] as HTMLInputElement;

  const minVal = side === 'left' ? +targetInput.value : +rangeLeft.value;
  const maxVal = side === 'right' ? +targetInput.value : +rangeRight.value;

  if (maxVal - minVal < priceGap) {
    if (side === 'left') {
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
