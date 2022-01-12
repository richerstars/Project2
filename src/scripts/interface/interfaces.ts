export interface IGetMovieParam {
    adult?: boolean,
    page?: number,
    pre_page?: number,
    budget_min?: number,
    budget_max?: number,
    languages?: string,
    title?: string,
    popularity_min?: number,
    popularity_max?: number,
    release_date_first?: string,
    release_date_last?: string,
    revenue_min?: number,
    revenue_max?: number,
    genre_id?:string
}

export interface IMovies {
    adult: boolean,
    backdrop_path: string,
    budget: number,
    genre_ids: Array<number>,
    homepage: string,
    id: number,
    imdb_id: string,
    movie_rate?: string,
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
    title: string
}

export interface ILanguages {
    iso_639_1: string,
    english_name: string,
}

export interface IGenres {
    id: number,
    name: string
}
