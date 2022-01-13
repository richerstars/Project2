import '../styles/descriptionPage.css';
import axios from 'axios';
import { TMovie, TGenres } from './types/types';

require('babel-core/register');
require('babel-polyfill');

const id = document.URL.split('#')[1];

const taskItemTemplate = (<HTMLElement>document.getElementById('taskMovieTemplate')).innerHTML;
const mainMovie = <HTMLElement>document.querySelector('.movie_page');

function loader() {
    document.querySelector('.masks').classList.add('hidden');
}

const htmlToElement = (html: string) => {
    const template: HTMLTemplateElement = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content;
};

const normoleseGenres = async (token: string): Promise<TGenres[]> => {
    try {
        const response = await axios.get(`http://localhost:5000/filters?${token}`);
        const { message: { genres } } = response.data;
        return genres;
    } catch (error) {
        return [];
    }
};

const normaliseDate = (date: string): string => {
    const normalDate = date.split('T')[0];
    return normalDate.replace('-', '/').replace('-', '/');
};

const showFilm = async (movieInfo: TMovie) => {
    const {
        poster_path: posterPath, release_date: releaseDate, genres: genreIds,
        original_language: originalLanguage, trailer,
        adult, popularity, title, overview, original_title: originalTitle,
    } = movieInfo;

    const genres = await normoleseGenres(document.cookie);
    // eslint-disable-next-line no-return-assign
    const normalGenres = genres.reduce((acc: string, element: TGenres) => (genreIds.includes(element.id) ? acc = `${acc} ${element.name}` : acc), ' ');

    if (taskItemTemplate) {
        document.querySelector('.title').textContent = title;
        const html: string = taskItemTemplate
            .replace('{{poster_path}}', (`https://image.tmdb.org/t/p/original${posterPath}`))
            .replace('{{release_date}}', normaliseDate(releaseDate))
            .replace('{{movieSrc}}', trailer)
            .replace('{{title}}', title)
            .replace('{{overview}}', overview)
            .replace('{{original_title}}', originalTitle)
            .replace('{{genre_ids}}', normalGenres)
            .replace('{{original_language}}', originalLanguage)
            .replace('{{adult}}', adult ? '18+' : '13+')
            .replace('{{popularity}}', popularity.toString());
        const newTaskEl = htmlToElement(html);
        if (newTaskEl && mainMovie) {
            mainMovie.appendChild(newTaskEl);
        }
    }
};

const getFilm = async (movieId: string, token: string) => {
    try {
        setTimeout(loader, 1000);
        const { data: { message: movieData } } = await axios.get(`http://localhost:5000/movies/id?movie_id=${movieId}&${token}`);
        showFilm(movieData);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

getFilm(id, document.cookie);
