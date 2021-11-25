import { elementsOfDom } from "./constantsElements";

elementsOfDom.inputIdInputSearch.addEventListener('click', findFilms);
elementsOfDom.imgIdFilters.addEventListener('click', getFilters);
elementsOfDom.imgIdThemes.addEventListener('click', changeTheme);
elementsOfDom.imgIdAuth.addEventListener('click', getAuth);
elementsOfDom.buttonIdNextBtn.addEventListener('click', getNextPaginationFilmItem);
elementsOfDom.buttonIdPreviousBtn.addEventListener('click', getPreviousFilmItem);

for (const item of elementsOfDom.allDivClassFilmsPaginationItem) {
    item.addEventListener('click', getCurrentFilm);
}

for (const item of elementsOfDom.allDivClassPopularFilmsItem) {
    item.addEventListener('click', getCurrentFilm);
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