/* eslint-disable no-param-reassign */
export const searchProdInput = (store: ExtendedProduct[], valueInput: (string | number)[]): ExtendedProduct[] => {
  const elements: ExtendedProduct[] = [];

  let value: string;
  if (Array.isArray(valueInput) && typeof valueInput[0] === 'string') {
    [value] = valueInput;
    if (value !== '') {
      store.forEach((elem) => {
        if (elem.search.toLowerCase().search(value) === -1) {
          store = elements;
        } else {
          elements.push(elem);
          store = elements;
        }
      });
    } else {
      return store;
    }
  }

  return elements;
};
