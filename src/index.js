import { elementsOfDom, selectorsCss } from "./constantsElements";
import './styles/mainScreen.css';
import logo from './img/logo.svg';
import logoFilters from './img/logoFilters.svg';
import logoSearch from './img/logoSearch.svg';
import logoUser from './img/logoUser.svg';
import space from './img/space.jpg';

elementsOfDom.inputIdInputSearch.addEventListener('click', findFilms);
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.imgIdThemes.addEventListener('click', changeTheme);
elementsOfDom.inputIdAuth.addEventListener('click', getAuth);
elementsOfDom.buttonIdNextBtn.addEventListener('click', getNextPaginationFilmItem);
elementsOfDom.buttonIdPreviousBtn.addEventListener('click', getPreviousFilmItem);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);

document.querySelector('#budget-min-min').addEventListener('change', getRangeValue);
document.querySelector('#budget-min-max').addEventListener('input', getRangeValue);

function getRangeValue(e) {
    console.log(e.target);
}

function findFilms() {

}

function getFilters(e) {
    console.log('wo')
}

function changeTheme() {

}

function getAuth() {

}

function getCurrentFilm() {

}

function getNextPaginationFilmItem() {

}

function getPreviousFilmItem() {

}

function saveFilters() {

}