import axios from 'axios';
import 'regenerator-runtime/runtime';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import { constants } from './constants/configConstants';
// eslint-disable-next-line import/no-cycle
import checkAuthorize from './signIn';
import { checkInputs } from './signUp';

import { IMovies }

    from './interface/interfaces';
import { createTemplateShowMore } from './getmovie';

let count = 1;

function loader() {
    elementsOfDom.classMask.classList.add('hidden');
}

export async function getMovies(attr:number):Promise<void> {
    try {
        const { data: { message: movies } } = await axios.get(constants.SERVER_MOVIES);
        movies.forEach((element:IMovies, index:number) => {
            if (index <= attr) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        loader();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export async function renderNewFilm():Promise<void> {
    try {
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        const {
            data: {
                message: movies,
            },
        } = await axios.get(`${constants.SERVER_MOVIES}?${constants.GET_PARAMS.PAGE}${count}`);
        // this.attributes[1].value++;
        // if (this.attributes[1].value > 20) {
        //     this.style.disabled = true;
        //     return;
        // }

        // if (!totalCount) {
        //     elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        //     elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        //     return;
        // }
        movies.forEach((element:IMovies, index:number) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('renderNewFilm: ', err);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        loader();
    }
}

export function checkToken():void {
    setTimeout(loader, 1000);
    if (document.cookie.length > 6) {
        elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        renderNewFilm();
    }
}

export function changeModalWindow(e:Event):void {
    e.preventDefault();
    if ((<HTMLElement>e.target).id === 'checkSignIn') {
        elementsOfDom.inputIdUsername.value = '';
        elementsOfDom.inputIdPassword.value = '';
        elementsOfDom.inputIdFirstName.value = '';
        elementsOfDom.inputIdLastName.value = '';
        elementsOfDom.classErrorHolder.classList.remove('error');
        elementsOfDom.inputIdUsername.parentElement.classList.remove('error');
        elementsOfDom.inputIdPassword.parentElement.classList.remove('error');
        elementsOfDom.inputIdFirstName.parentElement.classList.remove('error');
        elementsOfDom.inputIdLastName.parentElement.classList.remove('error');
        elementsOfDom.divClassContainerSignUP.classList.toggle('hidden');
        elementsOfDom.divClassContainerSignIn.classList.toggle('hidden');
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

const minVal:HTMLInputElement = document.querySelector('#minRange');
const maxVal:HTMLInputElement = document.querySelector('#maxRange');
const minNumVal:HTMLInputElement = document.querySelector('#minNumberRange');
const maxNumVal:HTMLInputElement = document.querySelector('#maxNumberRange');
const slider = document.querySelector('.range-slider');

function getInputValuess(e) {
    e.preventDefault();
    if ((<HTMLElement>e.target).classList.contains('inputValueNumber')) {
        (<HTMLInputElement>(<HTMLElement>e.target).previousElementSibling
            .previousElementSibling).value = (<HTMLInputElement>e.target).value;
    }
    if (+minVal.value >= (+maxVal.value - 10000)) {
        minVal.value = (Number(maxVal.value) - 10000).toString();
    }
    minNumVal.value = minVal.value;
    maxNumVal.value = maxVal.value;
}
slider.addEventListener('input', getInputValuess);
