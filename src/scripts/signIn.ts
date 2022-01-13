import '../styles/popUpSignUp.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
// eslint-disable-next-line import/no-cycle
import selectorsCss from './constants/constants.selectorsCss';
import renderNewFilm from './renderMovie';

export default async function checkAuthorize(): Promise<void> {
    try {
        const { headers: { token: accessToken } } = await axios
            .post(constants.SERVER_SING_IN, {
                login: elementsOfDom.inputIdUsernameSignIn.value,
                password: elementsOfDom.inputIdPasswordSignIn.value,
            });

        if (accessToken) {
            document.cookie = `token=${accessToken};max-age=3600`;
            elementsOfDom.sectionClassPopUp.classList.add(selectorsCss.classHidden);
            elementsOfDom.buttonShowMoreBtn.classList.remove(selectorsCss.classHidden);
            elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
            await renderNewFilm(constants.SERVER_MOVIES);
            return;
        }
        return;
    } catch (error) {
        elementsOfDom.classSignInErr.classList.add('error');
        elementsOfDom.classSignInErr.textContent = 'Wrong login or password';
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    }
}
