import axios from 'axios';
import { loader } from './helpers';
import { constants } from './constants/configConstants';
import { IMovies } from './interface/interfaces';
import { elementsOfDom } from './constants/constantsElements';
import { createTemplateShowMore } from './getmovie';
import selectorsCss from './constants/constants.selectorsCss';

let count = 1;

export default async (url: string): Promise<void> => {
    try {
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        const token = document.cookie;
        const {
            data: {
                message: {
                    data: movies,
                },
            },
        } = await axios.get(`${url}?${constants.GET_PARAMS.PAGE}${count}&${token}`);
        movies.forEach((element: IMovies, index: number) => {
            if (index <= 20) {
                elementsOfDom.sectionFilmsShowMore.appendChild(createTemplateShowMore(element));
            }
        });
        count++;
        loader();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('renderNewFilm: ', err);
        elementsOfDom.buttonShowMoreBtn.classList.toggle(selectorsCss.classHidden);
        elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
        loader();
    }
};
