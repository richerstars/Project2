import '../styles/popUpSignUp.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import renderNewFilm from './renderMovie';
import constantsString from './constants/constantsString';
import { renderGenresLanguges } from './helpers';

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
            await renderGenresLanguges(document.cookie);
            return;
        }
        return;
    } catch (error) {
        elementsOfDom.classSignInErr.classList.add('error');
        elementsOfDom.classSignInErr.textContent = constantsString.wrongLogin;
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    }
}
