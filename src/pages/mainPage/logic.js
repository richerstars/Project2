import { elementsOfDom, selectorsCss } from "../../constantsElements";
import { constants } from "../../configConstants";
import axios from "axios";


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
function createNewFilmCard({ id, poster_path, title, original_title, tagline }) {
    const cardId = elementsOfDom.templateIdTemplateCard.querySelector('.newFilmsItem');
    const cardPoster = elementsOfDom.templateIdTemplateCard.querySelector('.imgPoster');
    const describe = elementsOfDom.templateIdTemplateCard.querySelector('.descriptionNewFilm');
    describe.textContent = `${title} / ${original_title}`
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
        console.log(res);
        if (!res.data.movies.length) return;
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
function createTemplateShowMore({ id, poster_path, title, original_title, tagline }) {
    const cardId = elementsOfDom.templateFilmsShowMore.querySelector('.filmsItem');
    const cardPoster = elementsOfDom.templateFilmsShowMore.querySelector('.imgFilmsItem');
    const describe = elementsOfDom.templateFilmsShowMore.querySelector('.descriptionFilm');
    describe.textContent = `${title} /   ${original_title}`
    cardId.setAttribute('id', `${id}`)
    cardId.setAttribute('title', `${tagline}`)
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`)
    return cardId.cloneNode(true);
}
export function checkAdult(e) {
    e.target.parentElement.classList.toggle('checkedAdult');
    e.target.parentElement.classList.toggle('filters-input');
}
export function getFilters(e) {

    elementsOfDom.sectionClassSection.classList.toggle('filters-item')
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none')
}
export function getAuth() {

}
export function saveFilters() {

}

export function resetFilters() {

}