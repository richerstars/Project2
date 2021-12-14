import { elementsOfDom } from "../../constantsElements";
import '../../mainScreen.css';
import '../../styles/signUp.css';
import '../../styles/sign.css';
import { useAPI, checkInputs } from "./signUp";
import { checkAuthorize } from "./signIn";
import { changeModalWindow, renderNewFilm, getMovies, checkToken, getFilters, getAuth, saveFilters, resetFilters, checkAdult } from './logic'

document.addEventListener('DOMContentLoaded', checkToken)
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', getAuth);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
elementsOfDom.buttonIdResetBtn.addEventListener('click', resetFilters);
elementsOfDom.inputIdAdult.addEventListener('change', checkAdult);
elementsOfDom.buttonIdCheckSignIn.addEventListener('click', changeModalWindow)
elementsOfDom.buttonIdCheckSignUp.addEventListener('click', changeModalWindow)
elementsOfDom.buttonIdSetSignUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    checkInputs();
    useAPI();
});
elementsOfDom.buttonIdSetSignInBtn.addEventListener('click', function (e) {
    e.preventDefault();
    checkAuthorize();
    getMovies(2);
});
elementsOfDom.buttonShowMoreBtn.addEventListener('click', renderNewFilm)

