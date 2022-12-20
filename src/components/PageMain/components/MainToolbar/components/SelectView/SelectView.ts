import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import styles from './SelectView.module.scss';

export const renderSelectView = (): HTMLElement => {
    const selectView: HTMLElement = createElem('div', styles['toolbar__select-view']);
    const cardSizeNine: HTMLElement = createElem('div', 'select-view__card-size');
    const nineLabel: HTMLElement = createElem('label', styles['card-size__label']);
    nineLabel.setAttribute('id', 'card-size-nine');
    const nineInput: HTMLElement = createInput('radio', styles['card-size__input'], 'list');
    const nineSpan: HTMLElement = createElem('span', styles['card-size__span']);

    nineLabel.append(nineInput, nineSpan);
    cardSizeNine.append(nineLabel);

    // TODO -оптимизировать и убрать повторение - вынести в функцию
    const cardSizeFour: HTMLElement = createElem('div', 'select-view__card-size');
    const fourLabel: HTMLElement = createElem('label', styles['card-size__label']);
    fourLabel.setAttribute('id', 'card-size-four');
    const fourInput: HTMLElement = createInput('radio', styles['card-size__input'], 'list');
    const fourSpan: HTMLElement = createElem('span', styles['card-size__span']);
    fourSpan.classList.add('span-four');

    fourLabel.append(fourInput, fourSpan);
    cardSizeFour.append(fourLabel);

    selectView.append(cardSizeNine, cardSizeFour);

    cardSizeNine.onclick = () => {
        console.log('это КНОПКА!!!!');
        // TODO - добавить изменения свойства грид ряда
    };

    return selectView;
};
