import { newNameSex } from '../../utils/change-name-category';

describe('Function newNameSex', () => {
    it('should return string female', () => {
        expect(newNameSex('female', 'Шорты')).toEqual('Женские');
        expect(newNameSex('female', 'Пальто')).toEqual('Женское');
        expect(newNameSex('female', 'Футболка')).toEqual('Женская');
    });

    it('should return string any', () => {
        expect(newNameSex('any', 'Шорты')).toEqual('');
        expect(newNameSex('any', 'Пальто')).toEqual('');
        expect(newNameSex('any', 'Футболка')).toEqual('');
    });

    it('should return string male', () => {
        expect(newNameSex('male', 'Шорты')).toEqual('Мужские');
        expect(newNameSex('male', 'Пальто')).toEqual('Мужское');
        expect(newNameSex('male', 'Футболка')).toEqual('Мужская');
    });
});
