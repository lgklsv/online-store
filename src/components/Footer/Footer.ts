import { createElem } from "../../utils/create-element";

export const renderFooter = (): HTMLElement => {
    const footer: HTMLElement = createElem('footer', 'footer');

    const footerContainer: HTMLElement = createElem('div', 'footer__container');

    // credentials (top)
    const footerCredentials: HTMLElement = createElem('div', 'footer__credentials');
    footerCredentials.innerHTML = 'markett engineered by ';

    const footerGitLink: HTMLElement = createElem('a', 'footer__link');
    footerGitLink.setAttribute('href', 'https://github.com/Alesia-Abaeva');
    footerGitLink.setAttribute('target', '_blank');
    footerGitLink.innerHTML = 'Alesia-Abaeva';

    footerCredentials.append(footerGitLink);
    footerCredentials.innerHTML = footerCredentials.innerHTML + ' & ';

    const footerGitLink2: HTMLElement = createElem('a', 'footer__link');
    footerGitLink2.setAttribute('href', 'https://github.com/lgklsv');
    footerGitLink2.setAttribute('target', '_blank');
    footerGitLink2.innerHTML = 'lgklsv';

    footerCredentials.append(footerGitLink2);

    // copyright (bottom)
    const footerCopyright: HTMLElement = createElem('div', 'footer__copyright');

    const rsSchoolLink: HTMLElement = createElem('a', 'footer__link');
    footerGitLink2.setAttribute('href', 'https://rs.school/js/');
    footerGitLink2.setAttribute('target', '_blank');

    const copyrightText: HTMLElement = createElem('p', 'footer__text');
    copyrightText.innerHTML = '© 2022 markett. All rights reserved.';
    
    footerCopyright.append(rsSchoolLink, copyrightText)

    footerContainer.append(footerCredentials, footerCopyright);
    footer.append(footerContainer);
    return footer;
}