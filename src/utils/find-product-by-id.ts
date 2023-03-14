import { store } from '../const/store';

export const findProductById = (id: number): ExtendedProduct | -1 => {
  const foundProd = store.origin.find((obj) => obj.id === id);
  return foundProd || -1;
};
