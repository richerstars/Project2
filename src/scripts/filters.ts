import axios from 'axios';
import 'regenerator-runtime/runtime';
import { elementsOfDom, elemsQuerySelectors } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import { constants } from './constants/configConstants';
// eslint-disable-next-line import/no-cycle

import {
    IGetMovieParam,
    IMovies,
}
    from './interface/interfaces';
import { createTemplateShowMore } from './getmovie';

let countFilters = 1;

function clearMovies() {
    if (elementsOfDom.sectionFilmsShowMore.children && countFilters < 3) {
        elementsOfDom.sectionFilmsShowMore.innerHTML = '';
    }
}

export async function getMoviesByDynamicParams(request):Promise<void> {
    try {
        clearMovies();
        elementsOfDom.classMask.classList.remove(selectorsCss.classHidden);
        const { data: { message: movies } } = await axios.get(request);
        if (movies === 'Not found') {
            // notFound();
            elementsOfDom.sectionFilmsShowMore
                .appendChild(elemsQuerySelectors.notFound.cloneNode(true));
            elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
            return;
        }
        movies.forEach((element:IMovies) => {
            elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
        });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getMoviesByDynamicParams: ', err);
    } finally {
        elementsOfDom.classMask.classList.add(selectorsCss.classHidden);
    }
}

export function createDynamic(obj:IGetMovieParam):void {
    console.log('Im trying');
    let url = `${constants.SERVER_MOVIES}?`;
    Object.keys(obj)
        .forEach((element) => {
            if (obj[element]) url += `${element}=${obj[element]}&`;
        });
    url += `${constants.GET_PARAMS.PAGE}${countFilters}`;
    console.log(url);
    // url = url.substring(0, url.length - 1);
    // console.log(url);
    countFilters++;
    getMoviesByDynamicParams(url);
}

export function resetFilters():void {
    elementsOfDom.inputIdAdult.checked = false;
    elementsOfDom.inputIdAdult.parentElement.classList.remove('checkedAdult');
    elementsOfDom.inputIdAdult.parentElement.classList.add('filters-input');
    elementsOfDom.selectIdSelectLanguages.value = '';
    elementsOfDom.inputIdMinVNumberRange.value = '';
    elementsOfDom.inputIdMaxVNumberRange.value = '';
    elementsOfDom.inputIdMinValueRange.value = '0';
    elementsOfDom.inputIdMaxValueRange.value = '365000000';
    elementsOfDom.inputIdReleaseDayFirst.value = '';
    elementsOfDom.inputIdReleaseDayLast.value = '';
    elementsOfDom.inputIdFilters.classList.remove('active');
    elementsOfDom.selectIdSelectGenres.value = '';
}

export async function getFilters():Promise<void> {
    try {
        elementsOfDom.sectionClassSection.classList.toggle('filters-item');
        elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');
        elementsOfDom.bigWindow.classList.toggle('hidden');
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getFilters: ', err);
    }
}

export function getFilterData() {
    const adult:boolean = elementsOfDom.inputIdAdult.checked;
    const languages:string = elementsOfDom.selectIdSelectLanguages.value;
    const budgetMin:number = elementsOfDom.inputIdMinVNumberRange.value;
    const budgetMax:number = elementsOfDom.inputIdMaxVNumberRange.value;
    const releaseDateFirst:string = elementsOfDom.inputIdReleaseDayFirst.value;
    const releaseDateLast:string = elementsOfDom.inputIdReleaseDayLast.value;
    const genres:string = elementsOfDom.selectIdSelectGenres.value;
    return {
        adult,
        languages,
        budget_min: budgetMin,
        budget_max: budgetMax,
        release_date_first: releaseDateFirst,
        release_date_last: releaseDateLast,
        genre_id: genres,
    };
}

export function saveFilters():void {
    const request = getFilterData();
    elementsOfDom.inputIdFilters.classList.add('active');
    elementsOfDom.bigWindow.classList.toggle('hidden');
    createDynamic(request);
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    elementsOfDom.sectionClassSection.classList.toggle('filters-item');
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');
}

export function getFilmBySearchInput():void {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    const inputValue = elementsOfDom.inputClassSearchInput.value;
    createDynamic({ title: inputValue });
}
