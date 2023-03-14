/* eslint-disable no-param-reassign */
const swap = (arr: Product[], i: number, j: number): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partition = (arr: ExtendedProduct[], left: number, rigth: number, param: keyof ExtendedProduct): number => {
  const pivot = arr[Math.floor((left + rigth) / 2)][param];

  while (left <= rigth) {
    while (arr[left][param] < pivot) {
      left++;
    }

    while (arr[rigth][param] > pivot) {
      rigth--;
    }

    if (left <= rigth) {
      swap(arr, left, rigth);
      left++;
      rigth--;
    }
  }

  return left;
};

const quickSortHelper = (
  arr: ExtendedProduct[],
  left: number,
  rigth: number,
  param: keyof ExtendedProduct
): ExtendedProduct[] => {
  if (arr.length < 2) {
    return arr;
  }

  const index = partition(arr, left, rigth, param);

  if (left < index - 1) {
    quickSortHelper(arr, left, index - 1, param);
  }

  if (index < rigth) {
    quickSortHelper(arr, index, rigth, param);
  }

  return arr;
};

export const quickSort = (arr: ExtendedProduct[], param: keyof ExtendedProduct): ExtendedProduct[] => {
  const copyArray = [...arr];
  return quickSortHelper(copyArray, 0, copyArray.length - 1, param);
};
