/** Функция для генерации элемента ввода, необходимо ввести тип элемента ввода, создаваемый класс, значение (опционально) */
export const createInput = (type: string, className: string, value?: string): HTMLInputElement => {
    const createdElement: HTMLInputElement = document.createElement('input');
    createdElement.type = type;
    if(value) createdElement.setAttribute('value', value);
    console.log(createdElement);
    createdElement.className = className; 

    return createdElement;
};
