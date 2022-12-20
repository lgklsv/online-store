export const quickSort = (arr: Product[]): Product[] => {
    const copyArray = arr;
    return quickSortHelper(copyArray, 0, copyArray.length - 1);
};

const quickSortHelper = (arr: Product[], left: number, rigth: number): Product[] => {
    if (arr.length < 2) {
        return arr;
    }

    const index = partition(arr, left, rigth);

    if (left < index - 1) {
        quickSortHelper(arr, left, index - 1);
    }

    if (index < rigth) {
        quickSortHelper(arr, index, rigth);
    }

    return arr;
};

const partition = (arr: Product[], left: number, rigth: number): number => {
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
