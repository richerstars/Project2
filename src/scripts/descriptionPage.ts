/* eslint-disable import/extensions */
import '../styles/descriptionPage.css';
import axios from 'axios';
import { constants } from './constants/configConstants';
import { elementsOfDom } from './constants/constantsElements';

async function getMovieById(): Promise<void> {
    try {
        const id = window.location.hash.substring(window.location.hash.length - 2);
        const { data: { movie } } = await axios.get(`${constants.WOW_ME_UP_MOVIES}/${id}`);
        elementsOfDom.h1IdHOneDF.textContent = movie.title;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getMovieById: ', err.message);
    }
}

document.addEventListener('DOMContentLoaded', getMovieById);
