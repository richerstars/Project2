// import { elementsOfDom, selectorsCss } from "./constantsElements";
// import './styles/mainScreen.css';
// import logo from './img/logo.svg';
// import logoFilters from './img/logoFilters.svg';
// import logoSearch from './img/logoSearch.svg';
// import logoUser from './img/logoUser.svg';
// import space from './img/space.jpg';
const selectorsCss = {
    classWrapper: '.wrapper',
    idAuthorizedForm: '#authorizedForm',
    classHeaderNav: '.headerNav',
    classLogo: '.logo',
    idFilters: '#filters',
    idThemes: '#themes',
    idAuth: '#auth',
    classPopularFilms: '.popularFilms',
    classPopularFilmsItem: '.popularFilmsItem',
    classFilmsPaginationItem: '.filmsPaginationItem',
    classFiltersItem: '.filters-item',
    idSaveBtn: "#saveBtn",
    classFiltersItemNone: '.filters-item-none',
    classSection: '.section',
    classRangeSlider: '.rangeSlider',
    idAdult: '#Adult'
};

const elementsOfDom = {
    mainClassWrapper: document.querySelector(selectorsCss.classWrapper),
    navHeaderNav: document.querySelector(selectorsCss.classHeaderNav),
    divClassLogo: document.querySelector(selectorsCss.classLogo),
    imgIdThemes: document.querySelector(selectorsCss.idThemes),
    inputIdAuth: document.querySelector(selectorsCss.idAuth),
    sectionclassPopularFilms: document.querySelector(selectorsCss.classPopularFilms),
    allDivClassPopularFilmsItem: document.querySelectorAll(selectorsCss.classPopularFilmsItem),
    allDivClassFilmsPaginationItem: document.querySelectorAll(selectorsCss.classFilmsPaginationItem),
    inputIdFilters: document.querySelector(selectorsCss.idFilters),
    sectionClassFiltersItem: document.querySelector(selectorsCss.classFiltersItem),
    buttonIdSaveBtn: document.querySelector(selectorsCss.idSaveBtn),
    sectionClassFiltersItemNone: document.querySelector(selectorsCss.classFiltersItemNone),
    sectionClassSection: document.querySelector(selectorsCss.classSection),
    inputIdAdult: document.querySelector(selectorsCss.idAdult)
};

elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', getAuth);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
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

function getNextPaginationFilmItem() {

}

function getPreviousFilmItem() {

}

function saveFilters() {

}
