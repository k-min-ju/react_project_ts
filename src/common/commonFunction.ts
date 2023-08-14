import {setAnimationList} from "../reducer/animationReducer.js";
import {setCrimeList} from "../reducer/crimeReducer.js";
import {setThrillerList} from "../reducer/thrillerReducer.js";
import {setDramaList} from "../reducer/dramaReducer.js";
import {setSfList} from "../reducer/sfReducer.js";
import {setActionList} from "../reducer/actionReducer.js";
import {setAdventureList} from "../reducer/adventureReducer.js";
import {setHighteenList} from "../reducer/highteenReducer.js";
import {setHorrorList} from "../reducer/horrorReducer.js";
import {setMeloList} from "../reducer/meloReducer.js";
import {setMysteryList} from "../reducer/mysteryReducer.js";
import {setRomanceList} from "../reducer/romanceReducer.js";
import {setYouthList} from "../reducer/youthReducer.js";
import {Dispatch, SetStateAction} from "react";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export function isEmpty(str: string | number | object): boolean {
    return str == null || str == "" ? true : false;
}
export function isNotEmpty(str: string | number | object): boolean {
    return str != null && str != "" ? true : false;
}

export function getDate(date: Date) {
    if(isEmpty(date)) {
        date = new Date();
    }

    let yyyy = date.getFullYear();
    let getMonth = date.getMonth()+1;
    let mm = getMonth < 10 ? '0'+getMonth : getMonth;
    let getDate = date.getDate();
    let dd = getDate < 10 ? '0'+getDate : getDate;

    return yyyy + '' + mm + '' + dd;
}

// T가 아닌 T[]를 사용하는 이유 : 상태를 업데이트하는 함수를 받는 것이기 때문. Redux의 상태는 보통 배열이나 객체와 같은 자료구조로 표현
interface GenreItem<T> {
    genre: string;
    setReducerFunc: ActionCreatorWithPayload<T>;
}

export function getGenreJsonData() {
    const genreJson: GenreItem<[]>[] = [
        {
            genre : '애니메이션',
            setReducerFunc : setAnimationList
        },
        {
            genre : '범죄',
            setReducerFunc : setCrimeList
        },
        {
            genre : '스릴러',
            setReducerFunc : setThrillerList
        },
        {
            genre : '드라마',
            setReducerFunc : setDramaList
        },
        {
            genre : 'SF',
            setReducerFunc : setSfList
        },
        {
            genre : '액션',
            setReducerFunc : setActionList
        },
        {
            genre : '모험',
            setReducerFunc : setSfList
        },
        {
            genre : '코메디',
            setReducerFunc : setSfList
        },
        {
            genre : '가족',
            setReducerFunc : setAdventureList
        },
        {
            genre : '하이틴',
            setReducerFunc : setHighteenList
        },
        {
            genre : '공포',
            setReducerFunc : setHorrorList
        },
        {
            genre : '멜로',
            setReducerFunc : setMeloList
        },
        {
            genre : '미스터리',
            setReducerFunc : setMysteryList
        },
        {
            genre : '로맨스',
            setReducerFunc : setRomanceList
        },
        {
            genre : '청춘영화',
            setReducerFunc : setYouthList
        },
    ]
    return genreJson;
}

interface MovieJsonItem {
    movieVal: string;
}

export function getMovieJsonData() {
    const movieJson: MovieJsonItem[] = [
        {
            movieVal : 'MK059366_P02'
        },
        {
            movieVal : 'MK042227_P02'
        },
        {
            movieVal : 'MK044049_P02'
        },
        {
            movieVal : 'MK042090_P02'
        },
        {
            movieVal : 'MK042064_P02'
        },
        {
            movieVal : 'MK059454_P02'
        },
        {
            movieVal : 'MK059009_P02'
        },
        {
            movieVal : 'MK059556_P02'
        },
        {
            movieVal : 'MK059183_P02'
        },
        {
            movieVal : 'MK059366_P02'
        },
        {
            movieVal : 'MK059429_P02'
        },
        {
            movieVal : 'MK059595_P02'
        },
        {
            movieVal : 'MK059258_P02'
        },
        {
            movieVal : 'MK059530_P02'
        },
        {
            movieVal : 'MK059198_P02'
        },
        {
            movieVal : 'MK058820_P02'
        },
        {
            movieVal : 'MK059057_P02'
        },
        {
            movieVal : 'MK059466_P02'
        },
        {
            movieVal : 'MK059463_P02'
        },
        {
            movieVal : 'MK059487_P02'
        },
        {
            movieVal : 'MK059060_P02'
        },
        {
            movieVal : 'MK059055_P02'
        },
        {
            movieVal : 'MK059593_P02'
        },
        {
            movieVal : 'MK059513_P02'
        },
        {
            movieVal : 'MK059167_P02'
        },
        {
            movieVal : 'MK059505_P02'
        },
        {
            movieVal : 'MK059323_P02'
        },
        {
            movieVal : 'MK059322_P02'
        },
    ];

    return movieJson;
}

// 시청중인 영화를 보여주기 위한 함수
export function setWatchingMovieData(paramData, movieVal) {
    let movieData = JSON.parse(JSON.stringify(paramData));
    movieData.movieVal = movieVal;

    if(window.common.isEmpty(localStorage.getItem('watchingMovieData'))) {
        localStorage.setItem('watchingMovieData', JSON.stringify([movieData]));
    }
    else {
        const existingData = JSON.parse(localStorage.getItem('watchingMovieData'));
        let isDuplicate = false;
        existingData.find((movie => {
            if(movie.DOCID == movieData.DOCID) {
                isDuplicate = true;
                return true;
            }
        }));
        if(isDuplicate == false) {
            existingData.push(movieData);
            localStorage.setItem('watchingMovieData', JSON.stringify(existingData));
        }
    }

}

export function getMovieVal(movieVal, docId) {
    let result;
    let isDuplicate = false;
    let existingData;
    if(isNotEmpty(localStorage.getItem('watchingMovieData'))) {
        existingData = JSON.parse(localStorage.getItem('watchingMovieData'));
        existingData = existingData.find((movie => {
            if(movie.DOCID == docId) {
                isDuplicate = true;
                return movie;
            }
        }));
    }
    if(isDuplicate) {
        result = existingData.movieVal;
    }
    else {
        result = movieVal;
    }

    return result;
}

// 시청중인 영화 삭제
export function removeWatchingData(docId) {
    if(isEmpty(docId)) return;

    let existingData;
    localStorage.removeItem(docId);
    if(window.common.isNotEmpty(localStorage.getItem('watchingMovieData'))) {
        existingData = JSON.parse(localStorage.getItem('watchingMovieData'));
        existingData = existingData.filter((item, index) => item.DOCID !== docId);
        localStorage.setItem('watchingMovieData', JSON.stringify(existingData));
    }
}