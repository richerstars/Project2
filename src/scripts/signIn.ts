import '../styles/popUpSignIn.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
// eslint-disable-next-line import/no-cycle
import { renderNewFilm } from './logic';
import selectorsCss from './constants/constants.selectorsCss';

export default async function checkAuthorize(): Promise<void> {
    try {
        const { data: { message: { accessToken } } } = await axios.post(constants.SERVER_SING_IN, {
            login: elementsOfDom.inputIdUsernameSignIn.value,
            password: elementsOfDom.inputIdPasswordSignIn.value,
        });
        if (accessToken) {
            document.cookie = `token=${accessToken};max-age=3600`;
            elementsOfDom.sectionClassPopUp.classList.add(selectorsCss.classHidden);
            elementsOfDom.buttonShowMoreBtn.classList.remove(selectorsCss.classHidden);
            elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
            await renderNewFilm();
            return;
        }
        return;
    } catch (error) {
        // eslint-disable-next-line no-console
        elementsOfDom.classSignInErr.classList.add('error');
        elementsOfDom.classSignInErr.textContent = 'Wrong login or password';
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    }
}
