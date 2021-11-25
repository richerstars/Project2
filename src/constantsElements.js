export const elementsOfDom = {
    mainClassWrapper: document.querySelector(selectorsCss.classWrapper),
    navHeaderNav: document.querySelector(selectorsCss.classHeaderNav),
    divClassLogo: document.querySelector(selectorsCss.classLogo),
    inputIdInputSearch: document.querySelector(selectorsCss.idInputSearch),
    imgIdFilters: document.querySelector(selectorsCss.idFilters),
    imgIdThemes: document.querySelector(selectorsCss.idThemes),
    imgIdAuth: document.querySelector(selectorsCss.idAuth),
    sectionclassPopularFilms: document.querySelector(selectorsCss.classPopularFilms),
    allDivClassPopularFilmsItem: document.querySelectorAll(selectorsCss.classPopularFilmsItem),
    allDivClassFilmsPaginationItem: document.querySelectorAll(selectorsCss.classFilmsPaginationItem),
    buttonIdPreviousBtn: document.querySelector(selectorsCss.idPreviousBtn),
    buttonIdNextBtn: document.querySelector(selectorsCss.idNextBtn)
};

const selectorsCss = {
    classWrapper: '.wrapper',
    idAuthorizedForm: '#authorizedForm',
    classHeaderNav: '.headerNav',
    classLogo: '.logo',
    idInputSearch: '#inputSearch',
    idFilters: '#filters',
    idThemes: '#themes',
    idAuth: '#auth',
    classPopularFilms: '.popularFilms',
    classPopularFilmsItem: '.popularFilmsItem',
    classFilmsPaginationItem: '.filmsPaginationItem',
    idPreviousBtn: '#previousBtn',
    idNextBtn: '#nextBtn'
};