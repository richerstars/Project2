import {elementsOfDom, selectorsCss} from "../../constantsElements";
import '../../styles/mainScreen.css';
import '../Registration/signUp.css';
import '../Authorization/sign.css';
import {useAPI, checkInputs} from "../Registration/signUp";
import logo from '../../img/logo.svg';
import logoFilters from '../../img/logoFilters.svg';
import logoSearch from '../../img/logoSearch.svg';
import logoUser from '../../img/logoUser.svg';
import space from '../../img/space.jpg';
import {authorizate, checkAuthorize} from "../Authorization/signIn";
import axios from "axios";
import {constants} from "../../configConstants";

document.addEventListener('DOMContentLoaded', checkToken)
elementsOfDom.inputIdFilters.addEventListener('click', getFilters);
elementsOfDom.inputIdAuth.addEventListener('click', getAuth);
elementsOfDom.buttonIdSaveBtn.addEventListener('click', saveFilters);
elementsOfDom.buttonIdResetBtn.addEventListener('click', resetFilters);
elementsOfDom.inputIdAdult.addEventListener('change', checkAdult);
elementsOfDom.buttonIdCheckSignIn.addEventListener('click', changeModalWindow)
elementsOfDom.buttonIdCheckSignUp.addEventListener('click', changeModalWindow)
elementsOfDom.buttonIdSetSignUpBtn.addEventListener('click', function (e) {
    e.preventDefault();
    checkInputs();
    useAPI();
    getMovies(2);
});
elementsOfDom.buttonIdSetSignInBtn.addEventListener('click', function (e) {
    e.preventDefault();
    checkAuthorize();
    getMovies(2);
});
elementsOfDom.buttonShowMoreBtn.addEventListener('click', renderNewFilm)

const array = [];

function checkAdult(e) {
    e.target.parentElement.classList.toggle('checkedAdult');
    e.target.parentElement.classList.toggle('filters-input');
}

function findFilms() {

}

function getFilters(e) {

    elementsOfDom.sectionClassSection.classList.toggle('filters-item')
    elementsOfDom.sectionClassSection.classList.toggle('filters-item-none')
}


function getAuth() {

}

function getCurrentFilm() {

}

function checkFilters() {

}

function saveFilters() {

}

function resetFilters() {

}

function changeModalWindow(e) {
    e.preventDefault();
    if (e.target.id === 'checkSignIn') {
        elementsOfDom.divClassContainerSignUP.style.display = "none";
        elementsOfDom.divClassContainerSignIn.style.display = "block";
        return;
    }
    elementsOfDom.divClassContainerSignIn.style.display = "none";
    elementsOfDom.divClassContainerSignUP.style.display = "block";
}

async function getMovies(attr) {
    try {
        const response = await axios.get(constants.WOW_ME_UP_MOVIES)
        array.push(response.data.movies);
        console.log(array);
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

function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
        elementsOfDom.sectionClassPopUp.style.display = 'none';
        getMovies(2);
    }
    return;
}

function renderNewFilm() {
    this.attributes[1].value++;
    if (this.attributes[1].value >4){
        this.style.disabled = true;
        return ;
    }
    array[0].forEach((element, index) => {
        if (index <= 5) {
            console.log(element);
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
