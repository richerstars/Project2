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
    linkId.setAttribute('id', `${id}`);
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

export async function renderNewFilm(): Promise<IGetMovieParam> {
    try {
        const {
            data: {
                totalCount,
                movies,
            },
        } = await axios.get(`${constants.WOW_ME_UP_MOVIES}/?${constants.GET_PARAMS.PAGE}${count}`);
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

export function checkToken(): void {
    const token: string = localStorage.getItem('token');
    if (token) {
        elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        getMovies(20);
    }
}

export function changeModalWindow(e: Event): void {
    e.preventDefault();
    if ((<HTMLElement>e.target).id === 'checkSignIn') {
        elementsOfDom.inputIdUsername.value = '';
        elementsOfDom.inputIdPassword.value = '';
        elementsOfDom.inputIdFirstName.value = '';
        elementsOfDom.inputIdLastName.value = '';
        elementsOfDom.inputIdUsername.parentElement.classList.remove('error');
        elementsOfDom.inputIdPassword.parentElement.classList.remove('error');
        elementsOfDom.inputIdFirstName.parentElement.classList.remove('error');
        elementsOfDom.inputIdLastName.parentElement.classList.remove('error');
        elementsOfDom.divClassContainerSignUP.classList.toggle('hidden');
        elementsOfDom.divClassContainerSignIn.classList.toggle('hidden');
        return;
    }
    elementsOfDom.smallIdErrorLogin.textContent = '';
    elementsOfDom.inputIdUsernameSignIn.value = '';
    elementsOfDom.inputIdPasswordSignIn.value = '';
    elementsOfDom.divClassContainerSignUP.classList.toggle('hidden');
    elementsOfDom.divClassContainerSignIn.classList.toggle('hidden');
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
}): void {
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

function createDynamic(obj: IGetMovieParam): void {
    let url = `${constants.WOW_ME_UP_MOVIES}?`;
    Object.keys(obj)
        .forEach((element) => {
            if (obj[element]) url += `${element}=${obj[element]}&`;
        });
    url = url.substring(0, url.length - 1);
    getMoviesByDynamicParams(url);
}

export function resetFilters(): void {
    elementsOfDom.inputIdAdult.checked = false;
    elementsOfDom.inputIdAdult.parentElement.classList.remove('checkedAdult');
    elementsOfDom.inputIdAdult.parentElement.classList.add('filters-input');
    elementsOfDom.selectIdSelectLanguages.value = '';
    elementsOfDom.inputIdInputTitle.value = '';
    elementsOfDom.inputIdBudgetMinNumber.value = '';
    elementsOfDom.inputIdBudgetMaxNumber.value = '';
    elementsOfDom.inputIdPopularityMinNumber.value = '';
    elementsOfDom.inputIdPopularityMaxNumber.value = '';
    elementsOfDom.inputIdReleaseDayFirst.value = '';
    elementsOfDom.inputIdReleaseDayLast.value = '';
    elementsOfDom.inputIdRevenueMinNumber.value = '';
    elementsOfDom.inputIdRevenueMaxNumber.value = '';
}

export function saveFilters(): void {
    const adult: boolean = elementsOfDom.inputIdAdult.checked;
    const language: string = elementsOfDom.selectIdSelectLanguages.value;
    const title: string = elementsOfDom.inputIdInputTitle.value;
    const budgetMin: number = elementsOfDom.inputIdBudgetMinNumber.value;
    const budgetMax: number = elementsOfDom.inputIdBudgetMaxNumber.value;
    const popularityMin: number = elementsOfDom.inputIdPopularityMinNumber.value;
    const popularityMax: number = elementsOfDom.inputIdPopularityMaxNumber.value;
    const releaseDateFirst: string = elementsOfDom.inputIdReleaseDayFirst.value;
    const releaseDateLast: string = elementsOfDom.inputIdReleaseDayLast.value;
    const revenueMin: number = elementsOfDom.inputIdRevenueMinNumber.value;
    const revenueMax: number = elementsOfDom.inputIdRevenueMaxNumber.value;
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

export function logOut(): void {
    localStorage.clear();
    document.location.reload();
    elementsOfDom.sectionClassPopUp.classList.toggle(selectorsCss.classHidden, false);
}

export function setSignIn(e: Event): void {
    e.preventDefault();
    checkAuthorize();
}

export function setSignUp(e: Event): void {
    e.preventDefault();
    checkInputs();
}
export function openFilmCard(event: MouseEvent): void {
    if ((<HTMLElement>event.target).parentElement.classList.contains('linkPage')) {
        const movieId = Number((<HTMLElement>event.target).parentElement.id);
        window.open(`./descriptionFilm.html#${movieId}`);
    }
}

export function getInputValues(e: Event): void {
    if ((<HTMLElement>e.target).classList.contains('inputValueNumber')) {
        (<HTMLInputElement>(<HTMLElement>e.target).previousElementSibling
            .previousElementSibling).value = (<HTMLInputElement>e.target).value;
    }
    elementsOfDom.inputIdBudgetMinNumber.value = elementsOfDom.inputBudgetMinRange.value;
    elementsOfDom.inputIdBudgetMaxNumber.value = elementsOfDom.inputIdBudgetMaxRange.value;
    elementsOfDom.inputIdPopularityMinNumber.value = elementsOfDom.inputIdPopularityMinRange.value;
    elementsOfDom.inputIdPopularityMaxNumber.value = elementsOfDom.inputIdPopularityMaxRange.value;
    elementsOfDom.inputIdRevenueMinNumber.value = elementsOfDom.inputIdRevenueMinRange.value;
    elementsOfDom.inputIdRevenueMaxNumber.value = elementsOfDom.inputIdRevenueMaxRange.value;
}

export function showInputSearch():void {
    elementsOfDom.inputClassSearchInput.classList.toggle(selectorsCss.classHidden);
}

export function getFilmBySearchInput():void {
    const inputValue = elementsOfDom.inputClassSearchInput.value;
    createDynamic({ title: inputValue });
}
