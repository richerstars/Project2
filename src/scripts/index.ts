import { elementsOfDom } from './constants/constantsElements';
import '../styles/main.css';
import {
    changeModalWindow, renderNewFilm,
    checkToken, getFilters, logOut,
    saveFilters, checkAdult,
    setSignUp, setSignIn,
    resetFilters, openFilmCard,
    getInputValues, showInputSearch,
    getFilmBySearchInput,
} from './logic';

document.addEventListener('DOMContentLoaded', checkToken);
document.querySelector('.section').addEventListener('change', getInputValues);
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', logOut);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
elementsOfDom.buttonIdResetBtn.addEventListener('click', resetFilters);
elementsOfDom.inputIdAdult.addEventListener('change', checkAdult);
elementsOfDom.buttonIdCheckSignIn.addEventListener('click', changeModalWindow);
elementsOfDom.buttonIdCheckSignUp.addEventListener('click', changeModalWindow);
elementsOfDom.buttonIdSetSignUpBtn.addEventListener('click', setSignUp);
elementsOfDom.buttonIdSetSignInBtn.addEventListener('click', setSignIn);
elementsOfDom.buttonShowMoreBtn.addEventListener('click', renderNewFilm);
elementsOfDom.sectionFilmsShowMore.addEventListener('click', openFilmCard);
elementsOfDom.divClassSearch.addEventListener('click', showInputSearch);
elementsOfDom.inputClassSearchInput.addEventListener('change', getFilmBySearchInput);
