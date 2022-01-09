import 'regenerator-runtime/runtime';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
// eslint-disable-next-line import/no-cycle
import checkAuthorize from './signIn';
import { checkInputs } from './signUp';
import {
    clearImputs, loader
} from './helpers';
import { renderNewFilm } from './renderMovie';

export function checkToken():void {
    setTimeout(loader, 1000);
    if (document.cookie.length > 6) {
        elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        renderNewFilm();
        renderGenresLanguges();
    }
}

export function changeModalWindow(e:Event):void {
    e.preventDefault();
    if ((<HTMLElement>e.target).id === 'checkSignIn') {
        clearImputs();
        return;
    }
    elementsOfDom.inputIdUsernameSignIn.value = '';
    elementsOfDom.inputIdPasswordSignIn.value = '';
    elementsOfDom.divClassContainerSignUP.classList.toggle('hidden');
    elementsOfDom.divClassContainerSignIn.classList.toggle('hidden');
}

export function checkAdult(e:Event):void {
    (<HTMLElement>e.target).parentElement.classList.toggle('checkedAdult');
    (<HTMLElement>e.target).parentElement.classList.toggle('filters-input');
}

export function logOut():void {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    document.cookie = 'token=;';
    document.location.reload();
    elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden, false);
}

export function setSignIn(e:Event):void {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    e.preventDefault();
    checkAuthorize();
}

export function setSignUp(e:Event):void {
    e.preventDefault();
    checkInputs();
}

export function openFilmCard(event:MouseEvent):void {
    if ((<HTMLElement>event.target).parentElement.classList.contains('filmsItem')) {
        const movieId = Number((<HTMLElement>event.target).parentElement.id);
        window.open(`./descriptionFilm.html#${movieId}`);
    }
}

export function getInputValues(e:Event):void {
    if ((<HTMLElement>e.target).classList.contains('inputValueNumber')) {
        (<HTMLInputElement>(<HTMLElement>e.target).previousElementSibling
            .previousElementSibling).value = (<HTMLInputElement>e.target).value;
    }
}

export function showInputSearch():void {
    elementsOfDom.inputClassSearchInput.classList.toggle(selectorsCss.classHidden);
}

export function getInputValuess(e) {
    e.preventDefault();
    if ((<HTMLElement>e.target).classList.contains('inputValueNumber')) {
        (<HTMLInputElement>(<HTMLElement>e.target).previousElementSibling
            .previousElementSibling).value = (<HTMLInputElement>e.target).value;
    }
    if (+elementsOfDom.minVal.value >= (+elementsOfDom.maxVal.value - 10000)) {
        elementsOfDom.minVal.value = (Number(elementsOfDom.maxVal.value) - 10000).toString();
    }
    elementsOfDom.minNumVal.value = elementsOfDom.minVal.value;
    elementsOfDom.maxNumVal.value = elementsOfDom.maxVal.value;
}
function renderGenresLanguges() {
    throw new Error('Function not implemented.');
}

