import '../styles/PopUpSignUp.css';
import axios from "axios";
import {constants} from './constants/configConstants';
import {elementsOfDom, selectorsCss} from "./constants/constantsElements";

const username = document.getElementById('username');
const password = document.getElementById('password');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const sendError = document.getElementById('sendError');

export async function useAPI() {
    try {
        const response = await axios.post(constants.WOW_ME_UP_SING_UP, {
            password: password.value,
            login: username.value,
            first_name: firstName.value,
            last_name: lastName.value
        })
        elementsOfDom.divClassContainerSignUP.classList.toggle(selectorsCss.classHidden, true);
        elementsOfDom.divClassContainerSignIn.classList.toggle(selectorsCss.classHidden, false);
    } catch (error) {
        console.error(error);
    }
}

export function checkInputs() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    console.log(!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i));
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else if (!usernameValue[0].match(/[a-zA-Z]/i)) {
        setErrorFor(username, 'Login must starts with a letter');
    } else if (!!usernameValue.match(/[^a-zA-Z0-9]/i)) {
        setErrorFor(username, 'Login must contains only letters and numbers');
    } else {
        setSuccessFor(username)
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else if (!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i)) {
        setErrorFor(password, 'Password must have at least one letter and one number');
    } else if (passwordValue.length < 8) {
        setErrorFor(password, 'Password must have minimum eight characters')
    } else {
        setSuccessFor(password)
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }
}
