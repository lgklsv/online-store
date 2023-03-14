export const newNameProduct = (brand: string, title: string): string => {
  const lengthBrand = brand.length;
  return title.slice(lengthBrand, title.length);
};
