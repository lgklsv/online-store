/* eslint-disable default-case */
/* eslint-disable no-return-assign */
export const newNameSex = (sex: string, category: string): string => {
  const type = ['Ботинки', 'Джинсы', 'Шорты', 'Штаны'];
  // const types = ['Футболка', 'Рубашка', 'Юбка', 'Майка', 'Толстовка', 'Куртка'];

  let result = '';

  if (category === 'Пальто') {
    switch (sex) {
      case 'male':
        return (result = 'Мужское');

      case 'female':
        return (result = 'Женское');

      case 'any':
        return result;
    }
  } else {
    const find = type.find((item) => item === category);

    switch (sex) {
      case 'male':
        !find ? (result = 'Мужская') : (result = 'Мужские');
        return result;

      case 'female':
        !find ? (result = 'Женская') : (result = 'Женские');
        return result;

      case 'any':
        return result;
    }
  }
  return result;
};

export const newNameCategory = (sex: string, type: string): string => {
  const types = ['Ботинки', 'Джинсы', 'Пальто', 'Шорты', 'Штаны'];
  const newSex = newNameSex(sex, type);
  let newtype = type;

  const findedType = types.find((item) => item === newtype);

  if (!findedType) newtype = `${type.slice(0, -1)}а`;

  let result = newtype;

  if (newSex !== '') result = `${newSex} ${newtype.toLocaleLowerCase()}`;

  return result;
};
