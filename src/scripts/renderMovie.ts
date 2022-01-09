import axios from 'axios';
import { loader } from './helpers';
import { constants } from './constants/configConstants';
import { IMovies } from './interface/interfaces';
import { elementsOfDom } from './constants/constantsElements';
import { createTemplateShowMore } from './getmovie';
import selectorsCss from './constants/constants.selectorsCss';

let count = 1;

export async function getMovies(attr:number):Promise<void> {
    try {
        const { data: { message: movies } } = await axios.get(constants.SERVER_MOVIES);
        movies.forEach((element:IMovies, index:number) => {
            if (index <= attr) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        loader();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export async function renderNewFilm():Promise<void> {
    try {
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        const {
            data: {
                message: movies,
            },
        } = await axios.get(`${constants.SERVER_MOVIES}?${constants.GET_PARAMS.PAGE}${count}`);
        movies.forEach((element:IMovies, index:number) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('renderNewFilm: ', err);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        loader();
    }
}
