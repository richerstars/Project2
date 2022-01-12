import axios from 'axios';
import { elementsOfDom } from './constants/constantsElements';
import { constants } from './constants/configConstants';
import { IGenres, ILanguages } from './interface/interfaces';
import selectorsCss from './constants/constants.selectorsCss';

export function renderLangsOptionsTemplate({
    iso_639_1,
    english_name,
}):HTMLElement {
    elementsOfDom.templateIdLangOptions.value = iso_639_1;
    elementsOfDom.templateIdLangOptions.textContent = `${english_name}`;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

export function renderGenresOptionsTemplate({
    id,
    name,
}):HTMLElement {
    elementsOfDom.templateIdLangOptions.value = id;
    elementsOfDom.templateIdLangOptions.textContent = name;
    return elementsOfDom.templateIdLangOptions.cloneNode(true);
}

export function loader() {
    elementsOfDom.classMask.classList.toggle(selectorsCss.classHidden);
}

export function clearImputs() {
    elementsOfDom.inputIdUsername.value = '';
    elementsOfDom.inputIdPassword.value = '';
    elementsOfDom.inputIdFirstName.value = '';
    elementsOfDom.inputIdLastName.value = '';
    elementsOfDom.classErrorHolder.classList.remove('error');
    elementsOfDom.inputIdUsername.parentElement.classList.remove('error');
    elementsOfDom.inputIdPassword.parentElement.classList.remove('error');
    elementsOfDom.inputIdFirstName.parentElement.classList.remove('error');
    elementsOfDom.inputIdLastName.parentElement.classList.remove('error');
    elementsOfDom.inputIdUsername.classList.remove('placeError');
    elementsOfDom.inputIdPassword.classList.remove('placeError');
    elementsOfDom.inputIdFirstName.classList.remove('placeError');
    elementsOfDom.inputIdLastName.classList.remove('placeError');
    elementsOfDom.divClassContainerSignUP.classList.toggle('hidden');
    elementsOfDom.divClassContainerSignIn.classList.toggle('hidden');
}

export async function renderGenresLanguges() {
    try {
        const { data: { message: { languages, genres } } } = await axios
            .get(constants.SERVER_FILTERS);
        languages.forEach((elem:ILanguages) => {
            elementsOfDom.selectIdSelectLanguages.appendChild(renderLangsOptionsTemplate(elem));
        });
        genres.forEach((elem:IGenres) => {
            (elementsOfDom.selectIdSelectGenres.appendChild(renderGenresOptionsTemplate(elem)));
        });
        elementsOfDom.selectIdSelectLanguages.value = '';
        elementsOfDom.selectIdSelectGenres.value = '';
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('getFilters: ', err);
    }
}
