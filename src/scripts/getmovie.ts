import 'regenerator-runtime/runtime';
import { elemsQuerySelectors } from './constants/constantsElements';
import { constants } from './constants/configConstants';
// eslint-disable-next-line import/prefer-default-export
export function createTemplateShowMore({
    id,
    poster_path,
    title,
    tagline,
}):HTMLElement {
    const cardId = elemsQuerySelectors.filmsItem;
    const linkId = elemsQuerySelectors.linkPage;
    const cardPoster = elemsQuerySelectors.imgFilmsItem;
    const describe = elemsQuerySelectors.descriptionFilm;
    describe.textContent = `${title}`;
    cardId.setAttribute('id', `${id}`);
    cardId.setAttribute('title', `${tagline}`);
    linkId.setAttribute('id', `${id}`);
    cardPoster.setAttribute('src', `${constants.IMAGE_POSTER_LINK}${poster_path}`);
    return cardId.cloneNode(true);
}
