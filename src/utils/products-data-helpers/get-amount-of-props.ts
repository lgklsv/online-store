/** Функция возвращает сколько товаров в каждой проперти массива пропертей */
export const getAmountOfProps = (products: Product[], props: string[], prop: string): ProductProps[] => {
  const outputArr = [];
  for (let i = 0; i < props.length; i++) {
    const outputObj: ProductProps = { category: '', amount: 0 };
    const amount = products.filter((item) => item[prop] === props[i]).length;
    outputObj.category = props[i];
    outputObj.amount = amount;
    outputArr.push(outputObj);
  }
  return outputArr;
};
