import "./Browse.css";
import {useEffect, useState} from "react";
import axios from "axios";
import SpecialMovie from "./movie/specialMovie.js";
import {setLastYearList} from "./reducer/lastYearReducer.js";
import {setRecentReleaseList} from "./reducer/recentReleaseReducer.js";
import {setAnimationList} from "./reducer/animationReducer.js";
import {useDispatch, useSelector} from "react-redux";
import LastYearMovie from "./movie/lastYearMovie.js";
import RecentReleaseMovie from "./movie/recentReleaseMovie.js";
import AnimationMovie from "./movie/animationMovie.js";
import {useNavigate} from "react-router-dom";
import googleLogOut from "./login/GoogleLogOut.js";

function Browse() {
    const lastYearReducer = useSelector((state) => state.lastYearReducer);
    const recentReleaseReducer = useSelector((state) => state.recentReleaseReducer);
    const animationReducer = useSelector((state) => state.animationReducer);
    let dispatch = useDispatch();

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        const loginType = sessionStorage.getItem("loginType");
        if(window.common.isEmpty(accessToken) && window.common.isEmpty(loginType)) {
            location.href = '/login';
            return;
        }

        getLastYearMovie(dispatch);
        getRecentReleaseMovie(dispatch);
        getAnimationMovie(dispatch);
    }, []);

    let [isAccountFocus, setIsAccountFocus] = useState(false);
    let mouseLeaveTimer;

    const mouseEnter = () => {
        let caret = document.getElementsByClassName('caret')
        if(!caret[0].classList.contains('open')) {
            caret[0].classList.add('open');
        }
        setIsAccountFocus(true);
        clearTimeout(mouseLeaveTimer);
    }
    const mouseLeave = () => {
        mouseLeaveTimer = setTimeout(() => {
            let caret = document.getElementsByClassName('caret')
            caret[0].classList.remove('open')
            setIsAccountFocus(false);
        }, 400);
    }

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
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z" fill="currentColor"></path>
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
                                                            {/*<span className="notification-pill">15</span>*/}
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="nav-element" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} >
                                                    <div className="account-menu-item">
                                                        <div className="account-dropdown-button">
                                                            <a href="/YourAccount" role="button">
                                                                <span className="profile-link" role="presentation">
                                                                    <img className="profile-icon" src="http://occ-0-4796-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcFOODvM2-dL-e5zPcoGJ_I2cdHupjSPT_Daxamtsl7X60u5tnkYULcMLms2VRWD17aovP7MknmLUszew6S2rIxrQkSy2Qg.png?r=a13" alt=""></img>
                                                                    {
                                                                        isAccountFocus ? <div className="callout-arrow"></div> : ''
                                                                    }
                                                                </span>
                                                            </a>
                                                            <span className="caret" role="presentation"></span>
                                                        </div>
                                                        {
                                                            isAccountFocus ? <AccountDropDown isAccountFocus={isAccountFocus} /> : ''
                                                        }
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
        const getMovieList = (params) => {
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

// 지난 1년간 공개된 영화 리스트
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

// 최근 개봉한 영화 리스트
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

// 애니메이션 영화 리스트
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

// 드롭다운 메뉴
const AccountDropDown = (props) => {
    setTimeout(() => {
        let accountDropDown = document.getElementsByClassName("account-drop-down");
        let calloutArrow = document.getElementsByClassName("callout-arrow");
        if(props.isAccountFocus) {
            accountDropDown[0].style = 'opacity: 1; transition-duration: 150ms';
            calloutArrow[0].style = 'opacity: 1; transition-duration: 150ms';
        }
    }, 50);

    const doLogout = () => {
        const loginType = sessionStorage.getItem('loginType');
        switch (loginType) {
            case 'G' :
                googleLogOut();
                location.href = '/login';
                break;
            case 'N' :
                sessionStorage.removeItem('loginType');
                location.href = '/login';
            default :
                location.href = '/login';
        }
    }

    return (
        <>
            <div className="account-drop-down sub-menu theme-lakira">
                <div className="ptrack-content">
                    <div className="topbar"></div>
                    <ul className="account-links sub-menu-list" aria-label="계정">
                        <li className="sub-menu-item profile-link" >
                            <a aria-label="프로필 관리" className="sub-menu-link sub-menu-link-icon" href="/profiles/manage">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Edit">
                                    <path d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z" fill="currentColor"></path>
                                </svg>
                                <span>프로필 관리</span></a></li>
                        <li className="sub-menu-item">
                            <a className="sub-menu-link sub-menu-link-icon" href="/account/profile/transfer/EI5UEVFEZFCRHIZQZEIHVPCEBE">
                                <svg id="profile-transfer" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 1C3.79086 1 2 2.79086 2 5V17C2 19.2091 3.79086 21 6 21H9.58579L8.29289 22.2929L9.70711 23.7071L12.7071 20.7071C13.0976 20.3166 13.0976 19.6834 12.7071 19.2929L9.70711 16.2929L8.29289 17.7071L9.58579 19H6C4.89543 19 4 18.1046 4 17V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V17C20 18.1046 19.1046 19 18 19H15V21H18C20.2091 21 22 19.2091 22 17V5C22 2.79086 20.2091 1 18 1H6ZM7.5 10C8.32843 10 9 9.32843 9 8.5C9 7.67157 8.32843 7 7.5 7C6.67157 7 6 7.67157 6 8.5C6 9.32843 6.67157 10 7.5 10ZM18 8.5C18 9.32843 17.3284 10 16.5 10C15.6716 10 15 9.32843 15 8.5C15 7.67157 15.6716 7 16.5 7C17.3284 7 18 7.67157 18 8.5ZM16.402 12.1985C15.7973 12.6498 14.7579 13 13.5 13C12.2421 13 11.2027 12.6498 10.598 12.1985L9.40195 13.8015C10.4298 14.5684 11.9192 15 13.5 15C15.0808 15 16.5702 14.5684 17.598 13.8015L16.402 12.1985Z" fill="currentColor"></path>
                                </svg>
                                <span>프로필 이전</span></a></li>
                        <li className="sub-menu-item">
                            <a className="sub-menu-link sub-menu-link-icon" href="/YourAccount">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="User">
                                    <path d="M9.00011 8C9.00011 6.34315 10.3433 5 12.0001 5C13.657 5 15.0001 6.34315 15.0001 8C15.0001 9.65685 13.657 11 12.0001 11C10.3433 11 9.00011 9.65685 9.00011 8ZM12.0001 3C9.23869 3 7.00011 5.23858 7.00011 8C7.00011 10.7614 9.23869 13 12.0001 13C14.7615 13 17.0001 10.7614 17.0001 8C17.0001 5.23858 14.7615 3 12.0001 3ZM5.98069 21.1961C6.46867 18.7563 8.61095 17 11.0991 17H12.9011C15.3893 17 17.5316 18.7563 18.0195 21.1961L19.9807 20.8039C19.3057 17.4292 16.3426 15 12.9011 15H11.0991C7.65759 15 4.69447 17.4292 4.01953 20.8039L5.98069 21.1961Z" fill="currentColor"></path>
                                </svg>
                                <span>계정</span></a></li>
                        <li className="sub-menu-item">
                            <a className="sub-menu-link sub-menu-link-icon" href="https://help.netflix.com/">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Question">
                                    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 8.5C10.6831 8.5 10 9.24303 10 10H8C8 7.75697 10.0032 6.5 12 6.5C13.9968 6.5 16 7.75697 16 10C16 11.3487 14.9191 12.2679 13.8217 12.68C13.5572 12.7793 13.3322 12.9295 13.1858 13.0913C13.0452 13.2467 13 13.383 13 13.5V14H11V13.5C11 12.0649 12.1677 11.1647 13.1186 10.8076C13.8476 10.5339 14 10.1482 14 10C14 9.24303 13.3169 8.5 12 8.5ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z" fill="currentColor"></path>
                                </svg>
                                <span>고객 센터</span></a></li>
                    </ul>
                    <ul className="sub-menu-list sign-out-links">
                        <li className="sub-menu-item">
                            <a className="sub-menu-link" onClick={doLogout}>넷플릭스에서 로그아웃</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
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