import { changeClass } from '../../../../../../utils/add-remove-class';
import { createElem } from '../../../../../../utils/create-element';
import { createInput } from '../../../../../../utils/create-input-element';
import styles from './SelectView.module.scss';

export const renderSelectView = (node: NodeListOf<ChildNode>): HTMLElement => {
    const selectView: HTMLElement = createElem('div', styles['toolbar__select-view']);
    const cardSizeNine: HTMLElement = createElem('div', 'select-view__card-size');
    const nineLabel: HTMLElement = createElem('label', styles['card-size__label']);
    nineLabel.setAttribute('id', 'card-size-nine');
    const nineInput: HTMLElement = createInput('radio', styles['card-size__input'], 'list');
    const nineSpan: HTMLElement = createElem('span', styles['card-size__span']);

    nineLabel.append(nineInput, nineSpan);
    cardSizeNine.append(nineLabel);
    cardSizeNine.classList.add('active-view');

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

    const nodeChangeSize: HTMLElement = node[0].childNodes[0] as HTMLElement;
    // console.log(nodeChangeSize);

    cardSizeNine.onclick = () => {
        nodeChangeSize.classList.remove('view-3');
        changeClass(cardSizeFour, cardSizeNine, 'active-view');
    };

    cardSizeFour.onclick = () => {
        nodeChangeSize.classList.add('view-3');
        changeClass(cardSizeNine, cardSizeFour, 'active-view');
    };

    return selectView;
};
