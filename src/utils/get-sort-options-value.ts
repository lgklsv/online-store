import { SORT_OPTIONS } from '../const/select-sort';

export const getSortOptionsValue = (option: string): string | -1 => {
  const sortOptionsArr = Object.entries(SORT_OPTIONS);
  for (let i = 0; i < sortOptionsArr.length; i++) {
    if (sortOptionsArr[i][0] === option) {
      return sortOptionsArr[i][1];
    }
  }
  return -1;
};
