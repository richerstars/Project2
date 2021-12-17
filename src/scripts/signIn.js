import '../styles/PopUpSignIn.css';
import axios from "axios";
import {constants} from "./constants/configConstants";
import {elementsOfDom} from "./constants/constantsElements";

const password = document.getElementById('passwordSignIn');
const username = document.getElementById('usernameSignIn');

export async function checkAuthorize() {
    try {
        const response = await axios.post(constants.WOW_ME_UP_SING_IN, {
            login: username.value,
            password: password.value
        })
        elementsOfDom.sectionClassPopUp.style.display = 'none';
        localStorage.setItem('token', response.data.token);

    } catch (error) {
        console.error(error);
    }
}
