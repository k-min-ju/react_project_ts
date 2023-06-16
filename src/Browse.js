import "./Browse.css";
import {useEffect, useMemo} from "react";
import axios from "axios";
import SpecialMovie from "./movie/specialMovie.js";
import LastYearMovie from "./movie/lastYearMovie.js";
import {setLastYearList} from "./reducer/lastYearReducer.js";
import {setRecentReleaseList} from "./reducer/recentReleaseReducer.js";
import {setAnimationList} from "./reducer/animationReducer.js";
import {useDispatch, useSelector} from "react-redux";
import RecentReleaseMovie from "./movie/recentReleaseMovie.js";
import AnimationMovie from "./movie/animationMovie.js";

function Browse() {
    const lastYearReducer = useSelector((state) => state.lastYearReducer);
    const recentReleaseReducer = useSelector((state) => state.recentReleaseReducer);
    const animationReducer = useSelector((state) => state.animationReducer);
    let dispatch = useDispatch();

    useEffect(() => {
        getLastYearMovie(dispatch);
        getRecentReleaseMovie(dispatch);
        getAnimationMovie(dispatch);
    }, []);


    return (
        <>
            <div id="appMountPoint">
                <div className="netflix-sans-font-loaded">
                    <div dir="ltr" className="extended-diacritics-language">
                        <div>
                            <div className="bd dark-background" lang="ko-KR" data-uia="container-adult" style={{overflow: 'visible'}}>
                                <div className="pinning-header" style={{position: 'sticky', top: '0', height: 'auto', minHeight: '70px', zIndex: '1'}}>
                                    <div className="pinning-header-container" style={{background: 'transparent'}}>
                                    <div id="clcsBanner" style={{overflow: 'auto'}}></div>
                                        <div className="main-header has-billboard menu-navigation" role="navigation">
                                            <a aria-label="넷플릭스" className="logo icon-logoUpdate active" href="/browse"></a>
                                            <ul className="tabbed-primary-navigation">
                                                <li className="navigation-menu"><a className="menu-trigger" role="button" aria-haspopup="true" href="todo" tabIndex="0">메뉴</a></li>
                                                <li className="navigation-tab"><a className="current active" href="/browse">홈</a></li>
                                                <li className="navigation-tab"><a href="/browse/genre/83">시리즈</a></li>
                                                <li className="navigation-tab"><a href="/browse/genre/34399">영화</a></li>
                                                <li className="navigation-tab"><a href="/latest">NEW! 요즘 대세 콘텐츠</a></li>
                                                <li className="navigation-tab"><a href="/browse/my-list">내가 찜한 콘텐츠</a></li>
                                                <li className="navigation-tab"><a href="/browse/original-audio">언어별로 찾아보기</a></li>
                                            </ul>
                                            <div className="secondary-navigation">
                                                <div className="nav-element">
                                                    <div className="searchBox">
                                                        <button className="searchTab" tabIndex="0" aria-label="검색" data-uia="search-box-launcher">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon" data-name="Search">
                                                                <path d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z" fill="currentColor"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="nav-element show-kids">
                                                    <a href="/Kids">키즈</a>
                                                </div>
                                                <div className="nav-element">
                                                    <span className="notifications">
                                                        <button className="notifications-menu" aria-haspopup="true" aria-expanded="false" aria-label="알림">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Notification">
                                                                <path d="M13 4.07092C16.3922 4.55624 18.9998 7.4736 18.9998 11V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11C4.99978 7.47345 7.6076 4.55599 11 4.07086V2L13 2V4.07092ZM16.9998 15.1287V11C16.9998 8.23858 14.7612 6 11.9998 6C9.23836 6 6.99978 8.23858 6.99978 11V15.1287C8.64041 15.0437 10.3089 15 11.9998 15C13.6907 15 15.3591 15.0437 16.9998 15.1287ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z" fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            <span className="notification-pill">15</span>
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="nav-element">
                                                    <div className="account-menu-item">
                                                        <div className="account-dropdown-button">
                                                            <a href="/YourAccount" role="button" tabIndex="0" aria-haspopup="true" aria-expanded="false" aria-label="&amp;#xBBFC;&amp;#xBFCC;&nbsp;- 계정 &amp; 설정">
                                                                <span className="profile-link" role="presentation">
                                                                    <img className="profile-icon" src="http://occ-0-4796-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcFOODvM2-dL-e5zPcoGJ_I2cdHupjSPT_Daxamtsl7X60u5tnkYULcMLms2VRWD17aovP7MknmLUszew6S2rIxrQkSy2Qg.png?r=a13" alt=""></img>
                                                                </span>
                                                            </a>
                                                            <span className="caret" role="presentation"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mainView" id="main-view" role="main">
                                    <div className="lolomo is-fullbleed">
                                        <h1 className="visually-hidden">Netflix 홈</h1>

                                        {/*특별 소개 컨텐츠*/}
                                        <SpecialMovie/>

                                        {/*지난 1년간 공개된 컨텐츠*/}
                                        <LastYearMovie movieList={lastYearReducer}/>

                                        {/*최근 개봉한 영화*/}
                                        <RecentReleaseMovie movieList={recentReleaseReducer}/>

                                        {/*애니메이션 영화*/}
                                        <AnimationMovie movieList={animationReducer}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// KMDb에 영화 리스트 요청
async function getKMDbMovieList(searchParam, dispatch, setDataFunction) {
    if(window.common.isNotEmpty(searchParam)) {
        const movieSearch = axios.create({
            baseURL: process.env.REACT_APP_KMDB_API_URL
        });
        let getMovieList = (params) => {
            return movieSearch.get("/openapi-data2/wisenut/search_api/search_json2.jsp", {params})
                .catch((err) => {
                    console.log("error="+err);
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

function getLastYearMovie(dispatch) {
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
        listCount: 50
    };
    getKMDbMovieList(searchParam, dispatch, setLastYearList);
}

function getRecentReleaseMovie(dispatch) {
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
function getAnimationMovie(dispatch) {
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
        listCount: 50
    };
    getKMDbMovieList(searchParam, dispatch, setAnimationList);
}

// async function getKobisMovieList(searchParam) {
//     if(window.common.isNotEmpty(searchParam)) {
//         let movieList;
//         const movieSearch = axios.create({
//             baseURL: 'https://kobis.or.kr'
//         });
//         let getMovieList = (params) => {
//             return movieSearch.get("/kobisopenapi/webservice/rest/movie/searchMovieList.json", {params})
//                                     .catch((err) => {
//                                         console.log("error="+err);
//                                     })
//                                     .then((res) => {
//                                         let movieInfo = res.data.movieListResult.movieList;
//                                         if(movieInfo.length > 0) {
//                                             movieList = movieInfo.filter((movie) => !movie.genreAlt.includes("성인물"));
//                                         }
//                                     });
//         }
//         await getMovieList(searchParam);
//     }
// }

export default Browse;