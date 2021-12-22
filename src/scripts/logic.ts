import axios from 'axios';
import 'regenerator-runtime/runtime';
import { elementsOfDom, elemsQuerySelectors } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import { constants } from './constants/configConstants';
// eslint-disable-next-line import/no-cycle
import checkAuthorize from './signIn';
import { checkInputs } from './signUp';
import {
    IGetMovieParam,
    IMovies,
    ILanguages,
    IGenres,
}
    from './interface/interfaces';

let count = 2;

function createTemplateShowMore({
    id,
    poster_path,
    title,
    tagline,
}): HTMLElement {
    const cardId = elemsQuerySelectors.filmsItem;
    const linkId = elemsQuerySelectors.linkPage;
    const cardPoster = elemsQuerySelectors.imgFilmsItem;
    const describe = elemsQuerySelectors.descriptionFilm;
    describe.textContent = `${title}`;
    cardId.setAttribute('id', `${id}`);
    cardId.setAttribute('title', `${tagline}`);
    linkId.setAttribute('id', `link-${id}`);
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`);
    return cardId.cloneNode(true);
}

export async function getMovies(attr: number): Promise<void> {
    try {
        const { data: { movies } } = await axios.get(constants.WOW_ME_UP_MOVIES);
        movies.forEach((element: IMovies, index: number) => {
            if (index <= attr) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
    } catch (error) {
        // eslint-disable-next-line no-console
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

export async function renderNewFilm(): Promise<IGetMovieParam> {
    try {
        const { data: { totalCount, movies } } = await axios.get(`${constants.WOW_ME_UP_MOVIES}/?${constants.GET_PARAMS.PAGE}${count}`);
        this.attributes[1].value++;
        if (this.attributes[1].value > 20) {
            this.style.disabled = true;
            return;
        }

        if (!totalCount) {
            elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
            return;
        }
        movies.forEach((element: IMovies, index: number) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
    } catch (err) {
        // eslint-disable-next-line no-console
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

export function changeModalWindow(e: Event): void {
    e.preventDefault();
    if ((<HTMLElement>e.target).id === 'checkSignIn') {
        elementsOfDom.divClassContainerSignUP.style.display = 'none';
        elementsOfDom.divClassContainerSignIn.style.display = 'block';
        return;
    }
    elementsOfDom.divClassContainerSignIn.style.display = 'none';
    elementsOfDom.divClassContainerSignUP.style.display = 'block';
}

export function checkAdult(e: Event): void {
    (<HTMLElement>e.target).parentElement.classList.toggle('checkedAdult');
    (<HTMLElement>e.target).parentElement.classList.toggle('filters-input');
}

function renderLangsOptionsTemplate({
    value,
    name,
}): void {
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

export async function getFilters(): Promise<void> {
    try {
        elementsOfDom.sectionClassSection.classList.toggle('filters-item');
        elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');

        const { data: { languages } } = await axios.get(constants.WOW_ME_UP_LANGUAGES);
        const { data: { genres } } = await axios.get(constants.WOW_ME_UP_GENRES);

        languages.forEach((elem: ILanguages) => {
            elementsOfDom.selectIdSelectLanguages.appendChild(renderLangsOptionsTemplate(elem));
        });
        genres.forEach((elem: IGenres) => {
            (elementsOfDom.selectIdSelectGenres.appendChild(renderGenresOptionsTemplate(elem)));
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getFilters: ', err);
    }
}

export async function getMoviesByDynamicParams(request): Promise<void> {
    try {
        if (elementsOfDom.sectionFilmsShowMore.children) {
            // eslint-disable-next-line no-loops/no-loops
            while (elementsOfDom.sectionFilmsShowMore.firstChild) {
                elementsOfDom.sectionFilmsShowMore
                    .removeChild(elementsOfDom.sectionFilmsShowMore.firstChild);
            }
        }
        const { data: { movies } } = await axios.get(request);
        movies.forEach((element: IMovies, index: number) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getMoviesByDynamicParams: ', err);
    }
}

function createDynamic(obj: IGetMovieParam) {
    let url = `${constants.WOW_ME_UP_MOVIES}?`;
    Object.keys(obj)
        .forEach((element) => {
            if (obj[element]) url += `${element}=${obj[element]}&`;
        });
    url = url.substring(0, url.length - 1);
    getMoviesByDynamicParams(url);
}
export function resetFilters(body): void {
    const result = Object.values(body).filter((item) => item);
    console.log(result);
    if (result) return elementsOfDom.divClassContainerBtnReset.classList.toggle('hidden', false);
    elementsOfDom.divClassContainerBtnReset.classList.toggle('hidden', true);
}
export function saveFilters(): void {
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
        budget_min: budgetMin,
        budget_max: budgetMax,
        popularity_min: popularityMin,
        popularity_max: popularityMax,
        release_date_first: releaseDateFirst,
        release_date_last: releaseDateLast,
        revenue_min: revenueMin,
        revenue_max: revenueMax,
    });
    elementsOfDom.sectionClassSection.classList.toggle('filters-item');
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');
}

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
