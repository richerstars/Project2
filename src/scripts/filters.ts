import axios from 'axios';
import 'regenerator-runtime/runtime';
import { elementsOfDom } from './constants/constantsElements';
import selectorsCss from './constants/constants.selectorsCss';
import { constants } from './constants/configConstants';
import {
    IGetMovieParam,
    IMovies,
}
    from './interface/interfaces';
import { createTemplateShowMore } from './getmovie';
import { loader } from './helpers';

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
            elementsOfDom.svgContainer.classList.remove('hidden');
            return;
        }
        movies.forEach((element:IMovies) => {
            elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
        });
        if (elementsOfDom.buttonShowMoreBtn.classList.contains('hidden')) {
            elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getMoviesByDynamicParams: ', err);
    } finally {
        elementsOfDom.classMask.classList.add(selectorsCss.classHidden);
    }
}

export function createDynamic(obj:IGetMovieParam):void {
    let url = `${constants.SERVER_MOVIES}?`;
    Object.keys(obj)
        .forEach((element) => {
            if (obj[element]) url += `${element}=${obj[element]}&`;
        });
    url += `${constants.GET_PARAMS.PAGE}${countFilters}`;
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
    countFilters = 1;
}

export async function getFilters():Promise<void> {
    try {

        loader();
        development
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
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    countFilters = 1;
    const request = getFilterData();
    elementsOfDom.inputIdFilters.classList.add('active');
    elementsOfDom.bigWindow.classList.toggle('hidden');
    elementsOfDom.svgContainer.classList.add('hidden');
    createDynamic(request);
    elementsOfDom.sectionClassSection.classList.toggle('filters-item');
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none');
}

export function getFilmBySearchInput():void {
    loader();
    const inputValue = elementsOfDom.inputClassSearchInput.value.trim();
    elementsOfDom.svgContainer.classList.add('hidden');
    createDynamic({ title: inputValue });
}

export function inputSearch() {
    countFilters = 1;
    getFilmBySearchInput();
}

export function hidetFilters(event:MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('big-window')) getFilters();
}
