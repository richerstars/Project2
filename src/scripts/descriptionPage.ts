import '../styles/descriptionPage.css';
import axios from 'axios';
import '../img/reklama.gif';
import { TData, TGenres } from './types/types';

require('babel-core/register');
require('babel-polyfill');

const id = document.URL.split('#')[1];

const taskItemTemplate = (<HTMLElement>document.getElementById('taskMovieTemplate')).innerHTML;
const mainMovie = <HTMLElement>document.querySelector('.movie_page');

const htmlToElement = (html: string) => {
    const template: HTMLTemplateElement = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content;
};

const normoleseGenres = async (): Promise<TGenres[]> => {
    try {
        const response = await axios.get('https://wowmeup.pp.ua/genres');
        return response.data.genres;
    } catch (error) {
        return [];
    }
};

const normaliseDate = (date: string): string => {
    const normalDate = date.split('T')[0];
    return normalDate.replace('-', '/').replace('-', '/');
};

const showFilm = async (movieInfo: TData) => {
    const {
        poster_path: posterPath, release_date: releaseDate, genre_ids: genreIds,
        movie_rate: movieRate, original_language: originalLanguage,
        adult, popularity, title, overview, original_title: originalTitle,
    } = movieInfo.movie;

    const genres = await normoleseGenres();
    // eslint-disable-next-line no-return-assign
    const normalGenres = genres.reduce((acc: string, element: TGenres) => (genreIds.includes(element.id) ? acc = `${acc} ${element.name}` : acc), ' ');

    if (taskItemTemplate) {
        const html: string = taskItemTemplate
            .replace('{{poster_path}}', (`https://image.tmdb.org/t/p/original${posterPath}`))
            .replace('{{release_date}}', normaliseDate(releaseDate))
            .replace('{{title}}', title)
            .replace('{{overview}}', overview)
            .replace('{{original_title}}', originalTitle)
            .replace('{{genre_ids}}', normalGenres)
            .replace('{{movie_rate}}', movieRate ? movieRate.toString() : 'No rate')
            .replace('{{original_language}}', originalLanguage)
            .replace('{{adult}}', adult ? '18+' : '13+')
            .replace('{{popularity}}', popularity.toString());
        const newTaskEl = htmlToElement(html);
        if (newTaskEl && mainMovie) {
            mainMovie.appendChild(newTaskEl);
        }
    }
};

const getFilm = async (movieId: string) => {
    try {
        const { data } = await axios.get(`https://wowmeup.pp.ua/movie/${movieId}`);
        showFilm(data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

getFilm(id);
