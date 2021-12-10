import {elementsOfDom} from "../../constantsElements";
import {constants} from "../../configConstants";
import axios from "axios";

const array = [];
export async function getMovies(attr) {
    try {
        const response = await axios.get(constants.WOW_ME_UP_MOVIES)
        array.push(response.data.movies);
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
 function createNewFilmCard({id, poster_path, title, original_title, tagline}) {
    const cardId = elementsOfDom.templateIdTemplateCard.querySelector('.newFilmsItem');
    const cardPoster = elementsOfDom.templateIdTemplateCard.querySelector('.imgPoster');
    const describe = elementsOfDom.templateIdTemplateCard.querySelector('.descriptionNewFilm');
    describe.textContent = `${title} /   ${original_title}`
    cardId.setAttribute('id', `${id}`)
    cardId.setAttribute('title', `${tagline}`)
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`)
    return cardId.cloneNode(true);
}

export function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
        elementsOfDom.sectionClassPopUp.style.display = 'none';
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
export function renderNewFilm() {
    this.attributes[1].value++;
    if (this.attributes[1].value >4){
        this.style.disabled = true;
        return ;
    }
    array[0].forEach((element, index) => {
        if (index <= 5) {
            elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
        }
        return;
    });
}
function createTemplateShowMore({id, poster_path, title, original_title, tagline}) {
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