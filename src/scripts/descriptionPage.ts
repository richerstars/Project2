/* eslint-disable import/extensions */
import '../styles/descriptionPage.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';

async function getMovieById(): Promise<void> {
    try {
        const id = window.location.hash.substring(window.location.hash.length - 2);
        console.log(id);
        const { data: { movie } } = await axios.get(`${constants.WOW_ME_UP_MOVIES}/${id}`);
        console.log(movie.title);
        elementsOfDom.h1IdHOneDF.textContent = movie.title;
    } catch (err) {
        console.error('getMovieById: ', err.message);
    }
}

document.addEventListener('DOMContentLoaded', getMovieById);
