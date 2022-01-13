import '../styles/popUpSignUp.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import constantsString from './constants/constantsString';
import { clearImputs } from './helpers';

export async function useAPI():Promise<void> {
    try {
        await axios.post(constants.SERVER_SING_UP, {
            login: elementsOfDom.inputIdUsername.value,
            password: elementsOfDom.inputIdPassword.value,
            first_name: elementsOfDom.inputIdFirstName.value,
            last_name: elementsOfDom.inputIdLastName.value,
            user_role: 'users',
        });
        elementsOfDom.divClassContainerSignUP.classList.toggle(selectorsCss.classHidden, true);
        elementsOfDom.divClassContainerSignIn.classList.toggle(selectorsCss.classHidden, false);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

function setError(element:HTMLElement, textMessage:string) {
    element.classList.add('error');
    element.innerText = textMessage;
}

export function checkInputs():void {
    const error = elementsOfDom.classErrorHolder;
    const usernameValue = elementsOfDom.inputIdUsername.value.trim();
    const passwordValue = elementsOfDom.inputIdPassword.value.trim();
    const firstNameValue = elementsOfDom.inputIdFirstName.value.trim();
    const lastNameValue = elementsOfDom.inputIdLastName.value.trim();
    switch (true) {
        case (usernameValue.length === 0 || passwordValue.length === 0
        || firstNameValue.length === 0
        || lastNameValue.length === 0):
            setError(error, constantsString.blankString);
            break;
        case (elementsOfDom.inputIdUsername.classList.contains('placeError')):
            setError(error, constantsString.loginErrLetter);
            break;
        case (elementsOfDom.inputIdPassword.classList.contains('placeError')):
            setError(error, constantsString.passCheck);
            break;
        case (elementsOfDom.inputIdFirstName.classList.contains('placeError')
            || elementsOfDom.inputIdLastName.classList.contains('placeError')):
            setError(error, constantsString.fistLastCheckLetter);
            break;
        default:
            clearImputs();
            useAPI();
    }
}

export function userCheck(elem) {
    if (elem.value.trim().length === 0) {
        elem.classList.add('placeError');
    } else if (!elem.value.trim()
        .match(/^\D[\S]+/i)) {
        elem.classList.add('placeError');
    } else {
        elem.classList.remove('placeError');
    }
}

export function passCheck(elem) {
    if (elem.value.trim().length === 0) {
        elem.classList.add('placeError');
    } else if (!elem.value.trim()
        .match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/s)) {
        elem.classList.add('placeError');
    } else {
        elem.classList.remove('placeError');
    }
}
export function nameCheck(elem) {
    if (elem.value.trim().length === 0) {
        elem.classList.add('placeError');
    } else if (!elem.value.trim().match(/^[a-zA-Z]+$/)) {
        elem.classList.add('placeError');
    } else {
        elem.classList.remove('placeError');
    }
}
