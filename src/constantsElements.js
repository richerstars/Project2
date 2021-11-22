export const elementsOfDom = {
    mainClassWrapper: document.querySelector(selectorsCss.classWrapper),
    formIdAuthorizedForm: document.querySelector(selectorsCss.idAuthorizedForm),
    buttonIdbtnContinue: document.querySelector(selectorsCss.idbtnContinue),
    AllinputStyle: document.querySelectorAll('.inpStyle'),
    inputIdinpSubmit: document.querySelector(selectorsCss.idInpSubmit),
    inputIdPassword: document.querySelector(selectorsCss.idPassword),
    navHeaderNav: document.querySelector(selectorsCss.classHeaderNav),
    divClassLogo: document.querySelector(selectorsCss.classLogo)
};

const selectorsCss = {
    classWrapper: '.wrapper',
    idAuthorizedForm: '#authorizedForm',
    idbtnContinue: '#btnContinue',
    classInpStyle: '.inpStyle',
    idInpSubmit: '#inpSubmit',
    idPassword: '#password',
    classHeaderNav: '.headerNav',
    classLogo: '.logo'
};