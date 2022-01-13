export type TMovie = {
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
    genres: number[],
    movie_rate: number,
    trailer: string
};

export type TGenres = {
    id: number
    name: string
};

export type TBodySignUp = {
    login: string,
    password: string,
    first_name: string,
    last_name: string
}