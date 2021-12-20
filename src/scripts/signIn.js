import '../styles/popUpSignIn.css';
import axios from "axios";
import { constants } from "./constants/configConstants";
import { elementsOfDom } from "./constants/constantsElements";
import { getMovies } from "./logic";
import { selectorsCss } from "./constants/constants.selectorsCss";

const password = document.getElementById('passwordSignIn');
const username = document.getElementById('usernameSignIn');

export async function checkAuthorize() {
    try {
        const response = await axios.post(constants.WOW_ME_UP_SING_IN, {
            login: username.value,
            password: password.value
        });
        elementsOfDom.sectionClassPopUp.style.display = 'none';
        if ( !response.data.token ) return;
        getMovies(20);
        localStorage.setItem('token', response.data.token);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);

    } catch ( error ) {
        console.error(error);
    }
}

