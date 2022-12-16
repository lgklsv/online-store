import { createElem } from '../../utils/create-element';
import { createLink } from '../../utils/create-link-element';

export const renderFooter = (): HTMLElement => {
    const footer: HTMLElement = createElem('footer', 'footer');
    const footerContainer: HTMLElement = createElem('div', 'footer__container');

    // credentials (top)
    const footerCredentials: HTMLElement = createElem('div', 'footer__credentials');
    footerCredentials.innerHTML = 'markett engineered by ';

    const footerGitLink: HTMLElement = createLink(
        'https://github.com/Alesia-Abaeva',
        'footer__link',
        true,
        'Alesia-Abaeva'
    );

    footerCredentials.append(footerGitLink);
    footerCredentials.innerHTML = footerCredentials.innerHTML + ' & ';

    const footerGitLink2: HTMLElement = createLink('https://github.com/lgklsv', 'footer__link', true, 'lgklsv');

    footerCredentials.append(footerGitLink2);

    // copyright (bottom)
    const footerCopyright: HTMLElement = createElem('div', 'footer__copyright');

    const rsSchoolLink: HTMLElement = createLink('https://rs.school/js/', 'footer__link', true, '');

    const copyrightText: HTMLElement = createElem('p', 'footer__text');
    copyrightText.innerHTML = '© 2022 markett. All rights reserved.';

    footerCopyright.append(rsSchoolLink, copyrightText);

    footerContainer.append(footerCredentials, footerCopyright);
    footer.append(footerContainer);
    return footer;
};
