import './sign.css';
import axios from "axios";
import {constants} from "../../configConstants";
import {elementsOfDom} from "../../constantsElements";

const form = document.getElementById('form');
const password = document.getElementById('passwordSignIn');
const username = document.getElementById('usernameSignIn');
const ErrorLogin = document.getElementById('ErrorLogin');
form.addEventListener('submit', e => {
    e.preventDefault();
    checkAuthorize();
})

export async function checkAuthorize() {
    try {
         const response = await axios.post(constants.WOW_ME_UP_SING_IN, {
            login: username.value,
            password: password.value
        })
        switch (true) {
            case response.status === 400 :
                break;
            case response.status === 403:
                break;
            default:
                elementsOfDom.sectionClassPopUp.style.display = 'none';
                localStorage.setItem('token', response.data.token);
                break;
        }
    } catch (error) {
        console.error(error);
    }
}