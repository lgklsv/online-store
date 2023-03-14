export const newPrice = (price: number, discount: number): string => {
  return String(Math.round(price - (price / 100) * discount));
};
