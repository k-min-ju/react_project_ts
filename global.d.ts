import {GenreItem, MovieJsonItem} from "./commonTypes";

declare global {
    interface Window {
        common: {
            isEmpty: (value: any) => boolean;
            isNotEmpty: (value: any) => boolean;
            getDate: (date: Date) => string;
            getGenreJsonData: () => GenreItem[];
            getMovieJsonData: () => MovieJsonItem[];
            setWatchingMovieData: (paramData: any, movieVal: string) => void;
            getMovieVal: (movieVal: string, docId: string) => string;
            removeWatchingData: (docId: string) => void;
        };
    }
}