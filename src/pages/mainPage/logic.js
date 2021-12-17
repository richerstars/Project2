import { elementsOfDom, selectorsCss } from "../../constantsElements";
import { constants } from "../../configConstants";
import axios from "axios";
import { checkAuthorize } from "./signIn";
import { useAPI, checkInputs } from "./signUp";

export async function getMovies(attr) {
    try {
        const response = await axios.get(constants.WOW_ME_UP_MOVIES)
        response.data.movies.forEach((element, index) => {
            if (index <= attr) {
                elementsOfDom.sectionClassNewFilms.appendChild(createNewFilmCard(element));
            }
            return;
        });
    } catch (error) {
        console.error(error);
    }
}
function createNewFilmCard({ id, poster_path, title, tagline }) {
    const cardId = elementsOfDom.templateIdTemplateCard.querySelector('.newFilmsItem');
    const cardPoster = elementsOfDom.templateIdTemplateCard.querySelector('.imgPoster');
    const describe = elementsOfDom.templateIdTemplateCard.querySelector('.descriptionNewFilm');
    describe.textContent = `${title} `
    cardId.setAttribute('id', `${id}`)
    cardId.setAttribute('title', `${tagline}`)
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`)
    return cardId.cloneNode(true);
}

export function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
        elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden);
        getMovies(2);
    }
    return;
}
export function changeModalWindow(e) {
    e.preventDefault();
    if (e.target.id === 'checkSignIn') {
        elementsOfDom.divClassContainerSignUP.style.display = "none";
        elementsOfDom.divClassContainerSignIn.style.display = "block";
        return;
    }
    elementsOfDom.divClassContainerSignIn.style.display = "none";
    elementsOfDom.divClassContainerSignUP.style.display = "block";
}

let count = 1;
export async function renderNewFilm() {
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
            return;
        });
        count++;
    } catch (err) {
        console.error('renderNewFilm: ', err);
    }
}
function createTemplateShowMore({ id, poster_path, title, tagline }) {
    const cardId = elementsOfDom.templateFilmsShowMore.querySelector('.filmsItem');
    const cardPoster = elementsOfDom.templateFilmsShowMore.querySelector('.imgFilmsItem');
    const describe = elementsOfDom.templateFilmsShowMore.querySelector('.descriptionFilm');
    describe.textContent = `${title}`
    cardId.setAttribute('id', `${id}`)
    cardId.setAttribute('title', `${tagline}`)
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`)
    return cardId.cloneNode(true);
}
export function checkAdult(e) {
    e.target.parentElement.classList.toggle('checkedAdult');
    e.target.parentElement.classList.toggle('filters-input');
}
export async function getFilters() {

    elementsOfDom.sectionClassSection.classList.toggle('filters-item');
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');

    const resLangs = await axios.get(constants.WOW_ME_UP_LANGUAGES);
    const resGenres = await axios.get(constants.WOW_ME_UP_GENRES);

    resLangs.data.languages.forEach(elem => {
        elementsOfDom.selectIdSelectLanguages.appendChild(renderLangsOptionsTemplate(elem));
    });

    resGenres.data.genres.forEach(elem => {
        elementsOfDom.selectIdSelectGenres.appendChild(renderGenresOptionsTemplate(elem));
    });

}

function renderLangsOptionsTemplate({ value, name }) {
    elementsOfDom.templateIdLangOptions.value = value;
    elementsOfDom.templateIdLangOptions.textContent = `${name}`;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

function renderGenresOptionsTemplate({ id, name }) {
    elementsOfDom.templateIdLangOptions.value = id;
    elementsOfDom.templateIdLangOptions.textContent = name;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

export function saveFilters() {
    const adult = elementsOfDom.inputIdAdult.checked;
    const language = elementsOfDom.selectIdSelectLanguages.value;
    const title = elementsOfDom.inputIdInputTitle.value;
    const selectedGenres = elementsOfDom.selectIdSelectGenres.value;
    const budget_min = elementsOfDom.inputIdBudgetMinNumber.value;
    const budget_max = elementsOfDom.inputIdBudgetMaxNumber.value;
    const popularity_min = elementsOfDom.inputIdPopularityMinNumber.value;
    const popularity_max = elementsOfDom.inputIdPopularityMaxNumber.value;
    const release_date_first = elementsOfDom.inputIdReleaseDayFirst.value;
    const release_date_last = elementsOfDom.inputIdReleaseDayLast.value;
    const revenue_min = elementsOfDom.inputIdRevenueMinNumber.value;
    const revenue_max = elementsOfDom.inputIdRevenueMaxNumber.value;
    createDynamic({
        adult, language, title, budget_min, budget_max, popularity_min,
        popularity_max, release_date_first, release_date_last,
        revenue_min, revenue_max
    });
}
function createDynamic(obj) {

    let url = constants.WOW_ME_UP_MOVIES + '?';

    for (const item of Object.keys(obj)) {
        if (obj[item]) url += item + '=' + obj[item] + '&';
    }

    url = url.substring(0, url.length - 1);

    getMoviesByDynamicParams(url);

}

export async function getMoviesByDynamicParams(request) {
    try {
        if (elementsOfDom.sectionFilmsShowMore.children) {
            for (const item of elementsOfDom.sectionFilmsShowMore.children) {
                elementsOfDom.sectionFilmsShowMore.removeChild(item);
            }
        }
        const res = await axios.get(request);
        res.data.movies.forEach((element, index) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
            return;
        });
        count++;
    } catch (err) {
        console.error('getMoviesByDynamicParams: ', err);
    }
}
// export function resetFilters() {

// }

export function goToUp() {
    return scroll(0, 100);
}

export function logOut() {
    localStorage.clear();
    location.reload();
    elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden, false);
}

export function setSignUp(e) {
    e.preventDefault();
    checkInputs();
    useAPI();
}

export function setSignIn(e) {
    e.preventDefault();
    checkAuthorize();
    getMovies(2);
}