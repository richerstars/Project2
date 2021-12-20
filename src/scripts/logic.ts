import axios from 'axios';
import { elementsOfDom } from './constants/constantsElements';
import { selectorsCss } from './constants/constants.selectorsCss';
import { constants } from './constants/configConstants';
import { checkAuthorize } from './signIn';
import { checkInputs } from './signUp';
import { IGetMovieParam } from './interface/interfaces';

// require('babel-core/register');
// require('babel-polyfill');
let count = 2;

function createTemplateShowMore({
    id,
    poster_path,
    title,
    tagline,
}):HTMLElement {
    const cardId = elementsOfDom.templateFilmsShowMore.querySelector('.filmsItem');
    const linkId = elementsOfDom.templateFilmsShowMore.querySelector('.linkPage');
    const cardPoster = elementsOfDom.templateFilmsShowMore.querySelector('.imgFilmsItem');
    const describe = elementsOfDom.templateFilmsShowMore.querySelector('.descriptionFilm');
    describe.textContent = `${title}`;
    cardId.setAttribute('id', `${id}`);
    cardId.setAttribute('title', `${tagline}`);
    linkId.setAttribute('id', `link-${id}`);
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`);
    return cardId.cloneNode(true);
}

export async function getMovies(attr):Promise<void> {
    try {
        const response = await axios.get(constants.WOW_ME_UP_MOVIES);
        response.data.movies.forEach((element, index) => {
            if (index <= attr) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
    } catch (error) {
        console.error(error);
    }
}

// function createNewFilmCard({ id, poster_path, title, tagline }) {
//     const cardId = elementsOfDom.templateIdTemplateCard.querySelector('.newFilmsItem');
//     const cardPoster = elementsOfDom.templateIdTemplateCard.querySelector('.imgPoster');
//     const describe = elementsOfDom.templateIdTemplateCard.querySelector('.descriptionNewFilm');
//     describe.textContent = `${title} `
//     cardId.setAttribute('id', `${id}`)
//     cardId.setAttribute('title', `${tagline}`)
//     cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`)
//     return cardId.cloneNode(true);
// }

export async function renderNewFilm():Promise<IGetMovieParam> {
    try {
        const res = await axios.get(`${constants.WOW_ME_UP_MOVIES}/?${constants.GET_PARAMS.PAGE}${count}`);
        this.attributes[1].value++;
        if (this.attributes[1].value > 20) {
            this.style.disabled = true;
            return;
        }

        if (!res.data.totalCount) {
            elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
            return;
        }
        res.data.movies.forEach((element, index) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
    } catch (err) {
        console.error('renderNewFilm: ', err);
    }
}

export function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
        elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        getMovies(20);
    }
}

export function changeModalWindow(e) {
    e.preventDefault();
    if (e.target.id === 'checkSignIn') {
        elementsOfDom.divClassContainerSignUP.style.display = 'none';
        elementsOfDom.divClassContainerSignIn.style.display = 'block';
        return;
    }
    elementsOfDom.divClassContainerSignIn.style.display = 'none';
    elementsOfDom.divClassContainerSignUP.style.display = 'block';
}

export function checkAdult(e) {
    e.target.parentElement.classList.toggle('checkedAdult');
    e.target.parentElement.classList.toggle('filters-input');
}

function renderLangsOptionsTemplate({
    value,
    name,
}) {
    elementsOfDom.templateIdLangOptions.value = value;
    elementsOfDom.templateIdLangOptions.textContent = `${name}`;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

function renderGenresOptionsTemplate({
    id,
    name,
}) {
    elementsOfDom.templateIdLangOptions.value = id;
    elementsOfDom.templateIdLangOptions.textContent = name;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

export async function getFilters() {
    elementsOfDom.sectionClassSection.classList.toggle('filters-item');
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');

    const resLangs = await axios.get(constants.WOW_ME_UP_LANGUAGES);
    const resGenres = await axios.get(constants.WOW_ME_UP_GENRES);

    resLangs.data.languages.forEach((elem) => {
        elementsOfDom.selectIdSelectLanguages.appendChild(renderLangsOptionsTemplate(elem));
    });

    resGenres.data.genres.forEach((elem) => {
        elementsOfDom.selectIdSelectGenres.appendChild(renderGenresOptionsTemplate(elem));
    });
}

export async function getMoviesByDynamicParams(request) {
    try {
        if (elementsOfDom.sectionFilmsShowMore.children) {
            // for (const item of elementsOfDom.sectionFilmsShowMore.children) {
            //     elementsOfDom.sectionFilmsShowMore.removeChild(item);
            // }
            elementsOfDom.sectionFilmsShowMore.children.forEach((item) => {
                elementsOfDom.sectionFilmsShowMore.removeChild(item);
            });
        }
        const res = await axios.get(request);
        res.data.movies.forEach((element, index) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
    } catch (err) {
        console.error('getMoviesByDynamicParams: ', err);
    }
}

function createDynamic(obj) {
    let url = `${constants.WOW_ME_UP_MOVIES}?`;

    // for(const item of Object.keys(obj)) {
    //     if (obj[item]) url += `${item}=${obj[item]}&`;
    // }
    Object.keys(obj)
        .forEach((element) => {
            if (obj[element]) url += `${element}=${obj[element]}&`;
        });

    url = url.substring(0, url.length - 1);

    getMoviesByDynamicParams(url);
}

export function saveFilters() {
    const adult = elementsOfDom.inputIdAdult.checked;
    const language = elementsOfDom.selectIdSelectLanguages.value;
    const title = elementsOfDom.inputIdInputTitle.value;
    const budgetMin = elementsOfDom.inputIdBudgetMinNumber.value;
    const budgetMax = elementsOfDom.inputIdBudgetMaxNumber.value;
    const popularityMin = elementsOfDom.inputIdPopularityMinNumber.value;
    const popularityMax = elementsOfDom.inputIdPopularityMaxNumber.value;
    const releaseDateFirst = elementsOfDom.inputIdReleaseDayFirst.value;
    const releaseDateLast = elementsOfDom.inputIdReleaseDayLast.value;
    const revenueMin = elementsOfDom.inputIdRevenueMinNumber.value;
    const revenueMax = elementsOfDom.inputIdRevenueMaxNumber.value;
    createDynamic({
        adult,
        language,
        title,
        budgetMin,
        budgetMax,
        popularityMin,
        popularityMax,
        releaseDateFirst,
        releaseDateLast,
        revenueMin,
        revenueMax,
    });
}

// export function resetFilters() {

// }

export function logOut() {
    localStorage.clear();
    document.location.reload();
    elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden, false);
}

export function setSignIn(e) {
    e.preventDefault();
    checkAuthorize();
}

export function setSignUp(e) {
    e.preventDefault();
    checkInputs();
}
