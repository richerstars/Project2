type TMovie = {
    id: number,
    adult: boolean,
    backdrop_path: string,
    budget: number,
    homepage: string,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    status: string,
    tagline: string,
    title: string,
    genre_ids: number[],
    movie_rate: number
};

export type TData = {
    movie: TMovie
};

export type TGenres = {
    id: number
    name: string
};
