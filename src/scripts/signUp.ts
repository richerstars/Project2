import '../styles/popUpSignUp.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import constantsString from './constants/constantsString';
import regExp from './constants/regExp';
import { clearImputs } from './helpers';
import { TBodySignUp } from './types/types';

export async function useAPI(userObj: TBodySignUp): Promise<void> {
    try {
        await axios.post(constants.SERVER_SING_UP, {
            ...userObj,
            user_role: 'users',
        });
        elementsOfDom.divClassContainerSignUP.classList.toggle(selectorsCss.classHidden, true);
        elementsOfDom.divClassContainerSignIn.classList.toggle(selectorsCss.classHidden, false);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

function setError(element: HTMLElement, textMessage: string): void {
    element.classList.add('error');
    element.innerText = textMessage;
}

export function checkInputs(): void {
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
            useAPI({
                login: usernameValue,
                password: passwordValue,
                first_name: firstNameValue,
                last_name: lastNameValue,
            });
    }
}

export function userCheck(elem): void {
    if (elem.value.trim().length === 0) {
        elem.classList.add('placeError');
    } else if (!elem.value.trim()
        .match(regExp.USER_REG_EXP)) {
        elem.classList.add('placeError');
    } else {
        elem.classList.remove('placeError');
    }
}

export function passCheck(elem): void {
    if (elem.value.trim().length === 0) {
        elem.classList.add('placeError');
    } else if (!elem.value.trim()
        .match(regExp.PASS_REG_EXP)) {
        elem.classList.add('placeError');
    } else {
        elem.classList.remove('placeError');
    }
}
export function nameCheck(elem): void {
    if (elem.value.trim().length === 0) {
        elem.classList.add('placeError');
    } else if (!elem.value.trim().match(regExp.NAME_REG_EXP)) {
        elem.classList.add('placeError');
    } else {
        elem.classList.remove('placeError');
    }
}
