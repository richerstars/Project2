import '../styles/popUpSignUp.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import constantsString from './constants/constantsString';

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
        case (!usernameValue[0].match(/[a-zA-Z]/i)):
            setError(error, constantsString.loginErrLetter);
            break;
        // case (!usernameValue.match(/[^a-zA-Z0-9]/i)):
        //     error.innerText = constantsString.loginValidate;
        //     break;
        case (!passwordValue.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/s)):
            setError(error, constantsString.passCheck);
            break;
        // case (passwordValue.length < 8 || firstNameValue.length < 8
        // || lastNameValue.length < 15):
        //     error.classList.add('error');
        //     error.innerText = constantsString.firstLastLength;
        //     break;
        case (!firstNameValue.match(/^[a-zA-Z]+$/) || !lastNameValue.match(/^[a-zA-Z]+$/)):
            setError(error, constantsString.fistLastCheckLetter);
            break;
        default:
            useAPI();
    }
}
