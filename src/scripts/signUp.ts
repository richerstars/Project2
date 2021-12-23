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
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input: HTMLElement): void {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
export function checkInputs(): void {
    const usernameValue = elementsOfDom.inputIdUsername.value.trim();
    const passwordValue = elementsOfDom.inputIdPassword.value.trim();
    if (usernameValue === '') {
        setErrorFor(elementsOfDom.inputIdUsername, 'Username cannot be blank');
    } else if (!usernameValue[0].match(/[a-zA-Z]/i)) {
        setErrorFor(elementsOfDom.inputIdUsername, 'Login must starts with a letter');
    } else if (!usernameValue.match(/[^a-zA-Z0-9]/i)) {
        setErrorFor(elementsOfDom.inputIdUsername, 'Login must contains only letters and numbers');
    } else {
        setSuccessFor(elementsOfDom.inputIdUsername);
    }

    if (passwordValue === '') {
        setErrorFor(elementsOfDom.inputIdPassword, 'Password cannot be blank');
    } else if (!passwordValue.match(/(?=.*[0-9])(?=.*[a-zA-Z])/i)) {
        setErrorFor(elementsOfDom.inputIdPassword, 'Password must have at least one letter and one number');
    } else if (passwordValue.length < 8) {
        setErrorFor(elementsOfDom.inputIdPassword, 'Password must have minimum eight characters');
    } else {
        setSuccessFor(elementsOfDom.inputIdPassword);
    }
    useAPI();
}
