// KMDb에 영화 리스트 요청
import axios from "axios";
import {setSpecialList} from "../reducer/specialReducer.js";
import {setDramaList} from "../reducer/dramaReducer.js";
import {setSfList} from "../reducer/sfReducer.js";
import {setLastYearList} from "../reducer/lastYearReducer.js";
import {setRecentReleaseList} from "../reducer/recentReleaseReducer.js";
import {setAnimationList} from "../reducer/animationReducer.js";
import {setCrimeList} from "../reducer/crimeReducer.js";
import {setThrillerList} from "../reducer/thrillerReducer.js";

const movieListCount = 60;

export function getKMDBMovieOne(movieId, movieSeq) {
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        movieId: movieId,
        movieSeq: movieSeq
    };
    return getKMDbMovieOne(searchParam);
}

// 메인 special 영화
export function getSpecialMovie(dispatch) {
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        movieId: 'F',
        movieSeq: '57989'
    };
    getKMDbMovieList(searchParam, dispatch, setSpecialList);
}

// 지난 1년간 공개된 영화 리스트
export function getLastYearMovie(dispatch) {
    let date = new Date();
    date.setFullYear(date.getFullYear()-1);
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,0',
        releaseDts: window.common.getDate(date),
        releaseDte: window.common.getDate(),
        ratedYn: 'Y',
        listCount: movieListCount
    };
    getKMDbMovieList(searchParam, dispatch, setLastYearList);
}

// 최근 개봉한 영화 리스트
export function getRecentReleaseMovie(dispatch) {
    let date = new Date();
    date.setMonth(date.getMonth()-1);
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,1',
        releaseDts: window.common.getDate(date),
        releaseDte: window.common.getDate(),
        ratedYn: 'Y',
        listCount: 20
    };
    getKMDbMovieList(searchParam, dispatch, setRecentReleaseList);
}

// 애니메이션 영화 리스트
export function getAnimationMovie(dispatch) {
    let date = new Date();
    date.setMonth(date.getMonth()-3);
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,1',
        releaseDts: window.common.getDate(date),
        releaseDte: window.common.getDate(),
        ratedYn: 'Y',
        type: '애니메이션',
        listCount: movieListCount
    };
    getKMDbMovieList(searchParam, dispatch, setAnimationList);
}

// 범죄 영화 리스트
export function getCrimeMovie(dispatch) {
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,1',
        ratedYn: 'Y',
        genre: '범죄',
        listCount: movieListCount
    };
    getKMDbMovieList(searchParam, dispatch, setCrimeList);
}

// 스릴러 영화 리스트
export function getThrillerMovie(dispatch) {
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,1',
        ratedYn: 'Y',
        genre: '스릴러',
        listCount: movieListCount
    };
    getKMDbMovieList(searchParam, dispatch, setThrillerList);
}

// 드라마 영화 리스트
export function getDramaMovie(dispatch) {
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,1',
        ratedYn: 'Y',
        genre: '드라마',
        listCount: movieListCount
    };
    getKMDbMovieList(searchParam, dispatch, setDramaList);
}

// SF 영화 리스트
export function getSFMovie(dispatch) {
    const searchParam = {
        ServiceKey: process.env.REACT_APP_KMDB_API_KEY,
        collection: 'kmdb_new2',
        detail: 'Y',
        sort: 'prodYear,1',
        ratedYn: 'Y',
        genre: 'SF',
        listCount: movieListCount
    };
    getKMDbMovieList(searchParam, dispatch, setSfList);
}

async function getKMDbMovieList(searchParam, dispatch, setDataFunction) {
    if(window.common.isNotEmpty(searchParam)) {
        const movieSearch = axios.create({
            baseURL: process.env.REACT_APP_KMDB_API_URL,
            timeout: 10000
        });
        const getMovieList = (params) => {
            return movieSearch.get("/openapi-data2/wisenut/search_api/search_json2.jsp", {params})
                .catch((err) => {
                    console.log("error="+err);
                    return Promise.reject(err);
                })
                .then((res) => {
                    if(window.common.isEmpty(res)) return;

                    let movieInfo = res.data.Data[0].Result;
                    if(movieInfo) {
                        movieInfo = movieInfo.filter((item) => window.common.isNotEmpty(item.posters));
                        dispatch(setDataFunction(movieInfo));
                    }
                });
        }
        await getMovieList(searchParam);
    }
}

async function getKMDbMovieOne(searchParam) {
    let movieInfo;
    if(window.common.isNotEmpty(searchParam)) {
        const movieSearch = axios.create({
            baseURL: process.env.REACT_APP_KMDB_API_URL,
            timeout: 10000
        });
        const getMovie = (params) => {
            return movieSearch.get("/openapi-data2/wisenut/search_api/search_json2.jsp", {params})
                .catch((err) => {
                    console.log("error="+err);
                    return Promise.reject(err);
                })
                .then((res) => {
                    if(window.common.isEmpty(res)) return;

                    movieInfo = res.data.Data[0].Result;
                });
        }
        await getMovie(searchParam);
    }

    return movieInfo;
}