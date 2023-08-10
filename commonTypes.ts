export interface GenreItem {
    genre: string;
    setReducerFunc: SetReducerFunc;
}

export type SetReducerFunc = (data: any) => void;

export interface MovieJsonItem {
    movieVal: string;
}