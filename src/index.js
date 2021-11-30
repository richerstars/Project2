import { elementsOfDom } from "./constantsElements";

elementsOfDom.inputIdInputSearch.addEventListener('click', findFilms);
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.imgIdThemes.addEventListener('click', changeTheme);
elementsOfDom.imgIdAuth.addEventListener('click', getAuth);
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

function getFilters() {

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