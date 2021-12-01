export const selectorsCss = {
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
    idNextBtn: '#nextBtn',
    classFiltersItem: '.filters-item',
    idSaveBtn: "#saveBtn"
};

export const elementsOfDom = {
    mainClassWrapper: document.querySelector(selectorsCss.classWrapper),
    navHeaderNav: document.querySelector(selectorsCss.classHeaderNav),
    divClassLogo: document.querySelector(selectorsCss.classLogo),
    inputIdInputSearch: document.querySelector(selectorsCss.idInputSearch),
    imgIdThemes: document.querySelector(selectorsCss.idThemes),
    inputIdAuth: document.querySelector(selectorsCss.idAuth),
    sectionclassPopularFilms: document.querySelector(selectorsCss.classPopularFilms),
    allDivClassPopularFilmsItem: document.querySelectorAll(selectorsCss.classPopularFilmsItem),
    allDivClassFilmsPaginationItem: document.querySelectorAll(selectorsCss.classFilmsPaginationItem),
    buttonIdPreviousBtn: document.querySelector(selectorsCss.idPreviousBtn),
    buttonIdNextBtn: document.querySelector(selectorsCss.idNextBtn),
    inputIdFilters: document.querySelector(selectorsCss.idFilters),
    sectionClassFiltersItem: document.querySelector(selectorsCss.classFiltersItem),
    buttonIdSaveBtn: document.querySelector(selectorsCss.idSaveBtn)
};

