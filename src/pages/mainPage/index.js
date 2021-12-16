import { elementsOfDom } from "../../constantsElements";
import '../../mainScreen.css';
import '../../styles/signUp.css';
import '../../styles/sign.css';
import {
    changeModalWindow, renderNewFilm, getMovies,
    checkToken, getFilters, logOut,
    saveFilters, resetFilters, checkAdult,
    goToUp, setSignUp, setSignIn
} from './logic'

document.addEventListener('DOMContentLoaded', checkToken)
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', logOut);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
// elementsOfDom.buttonIdResetBtn.addEventListener('click', resetFilters);
elementsOfDom.inputIdAdult.addEventListener('change', checkAdult);
elementsOfDom.buttonIdCheckSignIn.addEventListener('click', changeModalWindow)
elementsOfDom.buttonIdCheckSignUp.addEventListener('click', changeModalWindow)
elementsOfDom.buttonIdSetSignUpBtn.addEventListener('click', setSignUp);
elementsOfDom.buttonIdSetSignInBtn.addEventListener('click', setSignIn);
elementsOfDom.buttonShowMoreBtn.addEventListener('click', renderNewFilm);

elementsOfDom.buttonIdArrowToUp.addEventListener('click', goToUp);