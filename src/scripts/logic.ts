import 'regenerator-runtime/runtime';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import checkAuthorize from './signIn';
import { checkInputs } from './signUp';
import {
    clearImputs, loader, renderGenresLanguges,
} from './helpers';
import renderNewFilm from './renderMovie';
import { constants } from './constants/configConstants';
import {
    createDynamic, getFilmBySearchInput, getFilterData,
} from './filters';

export function checkToken(): void {
    loader();
    if (document.cookie.length > 6) {
        elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        renderGenresLanguges(document.cookie);
        renderNewFilm(constants.SERVER_MOVIES);
    }
}

export function showMoreMovies(): void {
    if (elementsOfDom.inputIdFilters.classList.contains('active')) {
        elementsOfDom.inputClassSearchInput.value = '';
        createDynamic(getFilterData());
    } else if ((<HTMLInputElement>elementsOfDom.inputClassSearchInput).value) {
        getFilmBySearchInput();
    } else {
        renderNewFilm(constants.SERVER_MOVIES);
    }
}

export function changeModalWindow(e: Event): void {
    e.preventDefault();
    if ((<HTMLElement>e.target).id === 'checkSignIn') {
        clearImputs();
        return;
    }
    elementsOfDom.classSignInErr.classList.remove('error');
    elementsOfDom.classSignInErr.innerHTML = '';
    elementsOfDom.inputIdUsernameSignIn.value = '';
    elementsOfDom.inputIdPasswordSignIn.value = '';
    elementsOfDom.divClassContainerSignUP.classList.toggle('hidden');
    elementsOfDom.divClassContainerSignIn.classList.toggle('hidden');
}

export function checkAdult(e: Event): void {
    (<HTMLElement>e.target).parentElement.classList.toggle('checkedAdult');
    (<HTMLElement>e.target).parentElement.classList.toggle('filters-input');
}

export function logOut(): void {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    document.cookie = 'token=;';
    document.location.reload();
    elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden, false);
}

export function setSignIn(e: Event): void {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    e.preventDefault();
    checkAuthorize();
}

export function setSignUp(e: Event): void {
    e.preventDefault();
    checkInputs();
}

export function openFilmCard(event: MouseEvent): void {
    if ((<HTMLElement>event.target).parentElement.classList.contains('filmsItem')) {
        const movieId = Number((<HTMLElement>event.target).parentElement.id);
        window.open(`./descriptionFilm.html#${movieId}`);
    }
}

export function showInputSearch(): void {
    elementsOfDom.inputClassSearchInput.focus();
}

export function getInputValues(e: Event): void {
    e.preventDefault();
    if ((<HTMLElement>e.target).classList.contains('inputValueNumber')) {
        (<HTMLInputElement>(<HTMLElement>e.target).previousElementSibling
            .previousElementSibling).value = (<HTMLInputElement>e.target).value;
    }
    if (+elementsOfDom.inputIdMinValueRange.value >= (+elementsOfDom.inputIdMaxValueRange
        .value - 10000)) {
        elementsOfDom.inputIdMinValueRange.value = (Number(elementsOfDom.inputIdMaxValueRange
            .value) - 10000).toString();
    }
    elementsOfDom.inputIdMinVNumberRange.value = elementsOfDom.inputIdMinValueRange.value;
    elementsOfDom.inputIdMaxVNumberRange.value = elementsOfDom.inputIdMaxValueRange.value;
}
