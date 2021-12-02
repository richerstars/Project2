import { elementsOfDom, selectorsCss } from "../../constantsElements";
import '../../styles/mainScreen.css';
import '../../styles/nouislider.css';
import logo from '../../img/logo.svg';
import logoFilters from '../../img/logoFilters.svg';
import logoSearch from '../../img/logoSearch.svg';
import logoUser from '../../img/logoUser.svg';
import space from '../../img/space.jpg';
import doublelider from './range.slider';
import noUiSlider from './nouislider';


elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', getAuth);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
elementsOfDom.buttonIdResetBtn.addEventListener('click', resetFilters);
elementsOfDom.inputIdAdult.addEventListener('change', checkAdult);


function checkAdult(e) {
    e.target.parentElement.classList.toggle('checkedAdult');
    e.target.parentElement.classList.toggle('filters-input');
}

function findFilms() {

}

function getFilters(e) {

    elementsOfDom.sectionClassSection.classList.toggle('filters-item')
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none')
}



function getAuth() {

}

function getCurrentFilm() {

}

function checkFilters() {

}

function saveFilters() {

}
function resetFilters() {

}
