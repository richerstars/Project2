import '../styles/popUpSignIn.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
// eslint-disable-next-line import/no-cycle
import { getMovies } from './logic';
import selectorsCss from './constants/constants.selectorsCss';

export default async function checkAuthorize() :Promise<void> {
    try {
        const response = await axios.post(constants.WOW_ME_UP_SING_IN, {
            login: elementsOfDom.inputIdUsernameSignIn.value,
            password: elementsOfDom.inputIdPasswordSignIn.value,
        });
        elementsOfDom.sectionClassPopUp.style.display = 'none';
        if (!response.data.token) return;
        await getMovies(20);
        localStorage.setItem('token', response.data.token);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}
