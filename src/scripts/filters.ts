import axios from 'axios';
import 'regenerator-runtime/runtime';
import { elementsOfDom, elemsQuerySelectors } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import { constants } from './constants/configConstants';
// eslint-disable-next-line import/no-cycle

import {
    IGetMovieParam,
    IMovies,
    ILanguages,
    IGenres,
}
    from './interface/interfaces';
import { createTemplateShowMore } from './getmovie';

function renderLangsOptionsTemplate({
    iso_639_1,
    english_name,
}):HTMLElement {
    elementsOfDom.templateIdLangOptions.value = iso_639_1;
    elementsOfDom.templateIdLangOptions.textContent = `${english_name}`;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

function renderGenresOptionsTemplate({
    id,
    name,
}):HTMLElement {
    elementsOfDom.templateIdLangOptions.value = id;
    elementsOfDom.templateIdLangOptions.textContent = name;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

export async function getMoviesByDynamicParams(request):Promise<void> {
    try {
        if (elementsOfDom.sectionFilmsShowMore.children) {
            // eslint-disable-next-line no-loops/no-loops
            while (elementsOfDom.sectionFilmsShowMore.firstChild) {
                elementsOfDom.sectionFilmsShowMore
                    .removeChild(elementsOfDom.sectionFilmsShowMore.firstChild);
            }
        }
        console.log(request);
        const { data: { message: movies } } = await axios.get(request);
        movies.forEach((element:IMovies, index:number) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getMoviesByDynamicParams: ', err);
    }
}

function createDynamic(obj:IGetMovieParam):void {
    let url = `${constants.SERVER_MOVIES}?`;
    console.log(obj);
    Object.keys(obj)
        .forEach((element) => {
            if (obj[element]) url += `${element}=${obj[element]}&`;
        });
    console.log(url);
    url = url.substring(0, url.length - 1);
    console.log(url);
    getMoviesByDynamicParams(url);
}

export async function getFilters():Promise<void> {
    try {
        elementsOfDom.sectionClassSection.classList.toggle('filters-item');
        elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');
        elementsOfDom.bigWindow.classList.toggle('hidden');

        const { data: { message: { languages, genres } } } = await axios
            .get(constants.SERVER_FILTERS);
        languages.forEach((elem:ILanguages) => {
            elementsOfDom.selectIdSelectLanguages.appendChild(renderLangsOptionsTemplate(elem));
        });
        genres.forEach((elem:IGenres) => {
            (elementsOfDom.selectIdSelectGenres.appendChild(renderGenresOptionsTemplate(elem)));
        });
        elementsOfDom.selectIdSelectLanguages.value = '';
        elementsOfDom.selectIdSelectGenres.value = '';
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getFilters: ', err);
    }
}

export function saveFilters():void {
    const adult:boolean = elementsOfDom.inputIdAdult.checked;
    const languages:string = elementsOfDom.selectIdSelectLanguages.value;
    // const budgetMin:number = elementsOfDom.inputIdBudgetMinNumber.value;
    // const budgetMax:number = elementsOfDom.inputIdBudgetMaxNumber.value;
    const releaseDateFirst:string = elementsOfDom.inputIdReleaseDayFirst.value;
    const releaseDateLast:string = elementsOfDom.inputIdReleaseDayLast.value;
    elementsOfDom.inputIdFilters.classList.add('active');
    elementsOfDom.bigWindow.classList.toggle('hidden');
    createDynamic({
        adult,
        languages,
        // budget_min: budgetMin,
        // budget_max: budgetMax,
        release_date_first: releaseDateFirst,
        release_date_last: releaseDateLast,
    });
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    elementsOfDom.sectionClassSection.classList.toggle('filters-item');
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');
}

export function resetFilters():void {
    elementsOfDom.inputIdAdult.checked = false;
    elementsOfDom.inputIdAdult.parentElement.classList.remove('checkedAdult');
    elementsOfDom.inputIdAdult.parentElement.classList.add('filters-input');
    elementsOfDom.selectIdSelectLanguages.value = '';
    // elementsOfDom.inputIdBudgetMinNumber.value = '';
    // elementsOfDom.inputIdBudgetMaxNumber.value = '';
    elementsOfDom.inputIdReleaseDayFirst.value = '';
    elementsOfDom.inputIdReleaseDayLast.value = '';
    elementsOfDom.inputIdFilters.classList.remove('active');
    elementsOfDom.selectIdSelectGenres.value = '';
}

export function getFilmBySearchInput():void {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    const inputValue = elementsOfDom.inputClassSearchInput.value;
    createDynamic({ title: inputValue });
}
