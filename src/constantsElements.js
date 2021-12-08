export const selectorsCss = {
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
    idResetBtn: '#resetBtn',
    classFiltersItemNone: '.filters-item-none',
    classSection: '.section',
    classRangeSlider: '.rangeSlider',
    idAdult: '#Adult',
    idInputTitle: '#inputTitle',
    idRevenueMax: '#revenue-max',
    classContainerInputRange: '.container-input-range'
};

export const elementsOfDom = {
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
    buttonIdResetBtn: document.querySelector(selectorsCss.idResetBtn),
    sectionClassFiltersItemNone: document.querySelector(selectorsCss.classFiltersItemNone),
    sectionClassSection: document.querySelector(selectorsCss.classSection),
    inputIdAdult: document.querySelector(selectorsCss.idAdult),
    inputIdInputTitle: document.querySelector(selectorsCss.idInputTitle),
    divIdRevenueMax: document.querySelector(selectorsCss.idRevenueMax),
    divClassContainerInputRange: document.querySelector(selectorsCss.classContainerInputRange)
};

