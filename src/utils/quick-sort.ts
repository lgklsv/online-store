export const quickSort = (arr: ExtendedProduct[], param: string): Product[] => {
    const copyArray = arr;
    return quickSortHelper(copyArray, 0, copyArray.length - 1, param);
};

const quickSortHelper = (arr: ExtendedProduct[], left: number, rigth: number, param: string): ExtendedProduct[] => {
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

const partition = (arr: ExtendedProduct[], left: number, rigth: number, param: string): number => {
    const pivot = arr[Math.floor((left + rigth) / 2)].price;

    while (left <= rigth) {
        while (arr[left].price < pivot) {
            left++;
        }

        while (arr[rigth].price > pivot) {
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

const swap = (arr: Product[], i: number, j: number): void => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};
