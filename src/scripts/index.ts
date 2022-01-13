import { elementsOfDom } from './constants/constantsElements';
import '../styles/main.css';
import './404';
import {
    changeModalWindow,
    checkToken, logOut,
    checkAdult,
    setSignUp, setSignIn,
    openFilmCard,
    getInputValues, showInputSearch, showMoreMovies,
} from './logic';
import {
    getFilters, saveFilters, resetFilters, hidetFilters, inputSearch,
} from './filters';
import { nameCheck, passCheck, userCheck } from './signUp';

document.addEventListener('DOMContentLoaded', checkToken);
elementsOfDom.classRangeSlider.addEventListener('input', getInputValues);
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', logOut);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
elementsOfDom.buttonIdResetBtn.addEventListener('click', resetFilters);
document.querySelector('.filters-input').addEventListener('change', checkAdult);
elementsOfDom.buttonIdCheckSignIn.addEventListener('click', changeModalWindow);
elementsOfDom.buttonIdCheckSignUp.addEventListener('click', changeModalWindow);
elementsOfDom.buttonIdSetSignUpBtn.addEventListener('click', setSignUp);
elementsOfDom.buttonIdSetSignInBtn.addEventListener('click', setSignIn);
elementsOfDom.buttonShowMoreBtn.addEventListener('click', showMoreMovies);
elementsOfDom.sectionFilmsShowMore.addEventListener('click', openFilmCard);
elementsOfDom.divClassSearch.addEventListener('click', showInputSearch);
elementsOfDom.inputClassSearchInput.addEventListener('change', inputSearch);
elementsOfDom.bigWindow.addEventListener('click', hidetFilters);
elementsOfDom.inputIdUsername
    .addEventListener('change', () => userCheck(elementsOfDom.inputIdUsername));
elementsOfDom.inputIdPassword
    .addEventListener('change', () => passCheck(elementsOfDom.inputIdPassword));
elementsOfDom.inputIdFirstName
    .addEventListener('change', () => nameCheck(elementsOfDom.inputIdFirstName));
elementsOfDom.inputIdLastName
    .addEventListener('change', () => nameCheck(elementsOfDom.inputIdLastName));
