/* eslint-disable indent */
import '../styles/popUpSignUp.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';

export async function useAPI(): Promise<void> {
    try {
        await axios.post(constants.WOW_ME_UP_SING_UP, {
            login: elementsOfDom.inputIdUsername.value,
            password: elementsOfDom.inputIdPassword.value,
            first_name: elementsOfDom.inputIdFirstName.value,
            last_name: elementsOfDom.inputIdLastName.value,
        });
        elementsOfDom.divClassContainerSignUP.classList.toggle(selectorsCss.classHidden, true);
        elementsOfDom.divClassContainerSignIn.classList.toggle(selectorsCss.classHidden, false);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}
function setErrorFor(input: HTMLElement, message: string): void {
    const formControl = input.parentElement;
    const small = elementsOfDom.tagSmall;
    formControl.classList.add('error');
    small.innerText = message;
}

function setSuccessFor(input: HTMLElement): void {
    const formControl = input.parentElement;
    formControl.classList.add('success');
}
export function checkInputs(): void {
    const usernameValue = elementsOfDom.inputIdUsername.value.trim();
    const passwordValue = elementsOfDom.inputIdPassword.value.trim();
    switch (true) {
        case (usernameValue === ''):
            setErrorFor(elementsOfDom.inputIdUsername, 'Username cannot be blank');
            break;
        case (!usernameValue[0].match(/[a-zA-Z]/i)):
            setErrorFor(elementsOfDom.inputIdUsername, 'Login must starts with a letter');
            break;
        case (!usernameValue.match(/[^a-zA-Z0-9]/i)):
            setErrorFor(elementsOfDom.inputIdUsername, 'Login must contains only letters and numbers');
            break;
        default:
            setSuccessFor(elementsOfDom.inputIdUsername);
    }

    switch (true) {
        case (passwordValue === ''):
            setErrorFor(elementsOfDom.inputIdPassword, 'Password cannot be blank');
            break;
        case (!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i)):
            setErrorFor(elementsOfDom.inputIdPassword, 'Password must have at least one letter and one number');
            break;
        case (passwordValue.length < 8):
            setErrorFor(elementsOfDom.inputIdPassword, 'Password must have minimum eight characters');
            break;
        default:
            // eslint-disable-next-line @typescript-eslint/indent
            setSuccessFor(elementsOfDom.inputIdPassword);
    }
    useAPI();
}
