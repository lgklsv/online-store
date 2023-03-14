/* eslint-disable no-continue */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
import { checkValue } from '../../../../../utils/products-data-helpers/check-value-exists';

/** Функция которая универсально обновялет UI в checkbox фильтрах */
export const updateCheckboxFiltersUI = (data: ProductProps[], filteredData: ExtendedProduct[], type: string): void => {
  const allInputs = Array.from(document.querySelectorAll(`.checkbox-filter__input_${type}`)) as HTMLInputElement[];

  outside: for (let i = 0; i < allInputs.length; i++) {
    const title = allInputs[i].nextElementSibling as HTMLElement;
    const itemCount = title.nextElementSibling as HTMLElement;
    if (data.length === 0 && filteredData.length !== 0) {
      title.classList.remove('tinted');
      itemCount.classList.remove('tinted');
      itemCount.innerHTML = `${itemCount.innerHTML.split('/')[1]}/${itemCount.innerHTML.split('/')[1]}`;
    } else {
      for (let j = 0; j < data.length; j++) {
        if (allInputs[i].id.toLowerCase().replace(/_/g, ' ') === data[j].category.toLowerCase()) {
          if (checkValue(allInputs[i].id)) allInputs[i].checked = true;

          title.classList.remove('tinted');
          itemCount.classList.remove('tinted');
          itemCount.innerHTML = `${data[j].amount}/${itemCount.innerHTML.split('/')[1]}`;
          continue outside;
        }
      }
      if (checkValue(allInputs[i].id)) allInputs[i].checked = true;
      title.classList.add('tinted');
      itemCount.classList.add('tinted');
      itemCount.innerHTML = `0/${itemCount.innerHTML.split('/')[1]}`;
    }
  }
};
