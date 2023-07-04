import "./Browse.css";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import googleLogOut from "./login/GoogleLogOut.js";
import SpecialMovie from "./movie/specialMovie.js";
import LastYearMovie from "./movie/lastYearMovie.js";
import RecentReleaseMovie from "./movie/recentReleaseMovie.js";
import AnimationMovie from "./movie/animationMovie.js";
import CrimeMovie from "./movie/crimeMovie.js"
import ThrillerMovie from "./movie/thrillerMovie.js";
import DramaMovie from "./movie/dramaMovie";
import SFMovie from "./movie/sfMovie";
import {
    getLastYearMovie,
    getRecentReleaseMovie,
    getAnimationMovie,
    getCrimeMovie,
    getThrillerMovie,
    getDramaMovie,
    getSFMovie,
    getSpecialMovie
} from "./movie/movieListFunc.js";

function Browse() {
    const specialReducer = useSelector((state) => state.specialReducer);
    const lastYearReducer = useSelector((state) => state.lastYearReducer);
    const recentReleaseReducer = useSelector((state) => state.recentReleaseReducer);
    const animationReducer = useSelector((state) => state.animationReducer);
    const crimeReducer = useSelector((state) => state.crimeReducer);
    const thrillerReducer = useSelector((state) => state.thrillerReducer);
    const dramaReducer = useSelector((state) => state.dramaReducer);
    const sfReducer = useSelector((state) => state.sfReducer);
    let dispatch = useDispatch();

    let [isMovieStart, setIsMovieStart] = useState(false);
    let [isReplay, setIsReplay] = useState(false);
    let [muted, setMuted] = useState(true);

    let [specialMovieFunc, setSpecialMovieFunc] = useState();
    let specialMovieInit;

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        const loginType = sessionStorage.getItem("loginType");
        if(window.common.isEmpty(accessToken) && window.common.isEmpty(loginType)) {
            location.href = '/login';
            return;
        }

        // 영화 리스트 조회
        getSpecialMovie(dispatch);
        getLastYearMovie(dispatch);
        getRecentReleaseMovie(dispatch);
        getAnimationMovie(dispatch);
        getCrimeMovie(dispatch);
        getThrillerMovie(dispatch);
        getDramaMovie(dispatch);
        getSFMovie(dispatch);

        specialMovieInit = () => {
            // specialMovie 재생 시 사운드OFF 기본 값 설정
            if(window.common.isEmpty(localStorage.getItem('specialMovieMuted'))) localStorage.setItem('specialMovieMuted', "ON");
            setTimeout(() => {
                // 메인 이미지 걷어낸 후 동영상 재생
                let $element = document.querySelector('.trailer-billboard');
                $element.classList.add('video-playing')
                $element.children[0].classList.add('dismiss-static', 'dismiss-mask');
                $element.children[0].children[0].className = 'nfp nf-player-container notranslate inactive NFPlayer';

                // chrome 자동 재생 정책 > 음소거를 해야만 autoPlay 사용가능(동영상 자동 재생 시 원치 않는 사운드 재생 방지)
                // specialMovie컴포넌트 로드 후 동영상을 강제로 재생시키고 사운드 설정.
                // 동영상 강제 재생 후 사운드ON이 chrome 정책상 불가
                const $specialMovie = document.getElementById("specialMovie");
                // 사운드OFF
                if(localStorage.getItem('specialMovieMuted') == "ON") {
                    $specialMovie.play();
                    setMuted(true);
                }
                // 사운드ON
                // else if(localStorage.getItem('specialMovieMuted') == "OFF") {
                //     $specialMovie.muted = true;
                //     $specialMovie.play();
                //     $specialMovie.muted = false;
                //     setMuted(false);
                // }
                else {
                    $specialMovie.muted = true;
                    $specialMovie.play();
                    setMuted(true);
                }
                setIsMovieStart(true);
            }, 2500);

            setInterval(function(){
                // specialMovie 영상 종료 후 실행할 함수
                if(document.getElementById("specialMovie").ended) {
                    // 음소거 버튼 hide후 리플레이 버튼 show
                    setIsMovieStart(false);
                    setIsReplay(true);
                }
            },200);

        }
        setSpecialMovieFunc(specialMovieInit);

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
                                            <a aria-label="넷플릭스" className="logo icon-logoUpdate active" href="/browse">
                                                <img className="logo icon-logoUpdate active" src={process.env.PUBLIC_URL + '/netfilx_logo.png'} />
                                            </a>
                                            <ul className="tabbed-primary-navigation">
                                                <li className="navigation-menu"><a className="menu-trigger" role="button" aria-haspopup="true" href="todo" tabIndex="0">메뉴</a></li>
                                                <li className="navigation-tab"><a className="current active" href="/browse">홈</a></li>
                                                <li className="navigation-tab"><a href="#" onClick={(e) => {e.preventDefault()}}>시리즈</a></li>
                                                <li className="navigation-tab"><a href="#" onClick={(e) => {e.preventDefault()}}>영화</a></li>
                                                <li className="navigation-tab"><a href="#" onClick={(e) => {e.preventDefault()}}>NEW! 요즘 대세 콘텐츠</a></li>
                                                <li className="navigation-tab"><a href="#" onClick={(e) => {e.preventDefault()}}>내가 찜한 콘텐츠</a></li>
                                                <li className="navigation-tab"><a href="#" onClick={(e) => {e.preventDefault()}}>언어별로 찾아보기</a></li>
                                            </ul>
                                            <div className="secondary-navigation">
                                                <div className="nav-element">
                                                    <div className="searchBox">
                                                        <button className="searchTab" aria-label="검색">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon" data-name="Search">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z" fill="currentColor"></path>
                                                            </svg>
                                                        </button>

                                                        {/*<div className="searchInput">*/}
                                                        {/*    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon ltr-0 e1mhci4z1" data-name="Search">*/}
                                                        {/*        <path fillRule="evenodd" clipRule="evenodd" d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z" fill="currentColor"></path>*/}
                                                        {/*    </svg>*/}
                                                        {/*    <label htmlFor="searchInput" id="searchInput-label" className="visually-hidden">검색</label>*/}
                                                        {/*    <input type="text" id="searchInput" name="searchInput" placeholder="제목, 사람, 장르" maxLength="80" className="focus-visible" />*/}
                                                        {/*    <span className="icon-close empty" />*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                                <div className="nav-element show-kids">
                                                    <a href="#" onClick={(e) => {e.preventDefault()}}>키즈</a>
                                                </div>
                                                <div className="nav-element">
                                                    <span className="notifications">
                                                        <button className="notifications-menu" aria-haspopup="true" aria-expanded="false" aria-label="알림">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Notification">
                                                                <path d="M13 4.07092C16.3922 4.55624 18.9998 7.4736 18.9998 11V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11C4.99978 7.47345 7.6076 4.55599 11 4.07086V2L13 2V4.07092ZM16.9998 15.1287V11C16.9998 8.23858 14.7612 6 11.9998 6C9.23836 6 6.99978 8.23858 6.99978 11V15.1287C8.64041 15.0437 10.3089 15 11.9998 15C13.6907 15 15.3591 15.0437 16.9998 15.1287ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z" fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            {/*<div className="callout-arrow"></div>*/}
                                                        </button>
                                                        {/*<AlarmDropDown />*/}
                                                    </span>
                                                </div>
                                                <div className="nav-element">
                                                {/*<div className="nav-element">*/}
                                                    <div className="account-menu-item">
                                                        <div className="account-dropdown-button">
                                                            <a href="/YourAccount" role="button">
                                                                <span className="profile-link" role="presentation">
                                                                    <img className="profile-icon" src="http://occ-0-4796-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcFOODvM2-dL-e5zPcoGJ_I2cdHupjSPT_Daxamtsl7X60u5tnkYULcMLms2VRWD17aovP7MknmLUszew6S2rIxrQkSy2Qg.png?r=a13" alt=""></img>
                                                                    {/*<div className="callout-arrow"></div>*/}
                                                                </span>
                                                            </a>
                                                            <span className="caret" role="presentation"></span>
                                                        </div>
                                                        {/*<AccountDropDown />*/}
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
                                        <SpecialMovie movieList={specialReducer} specialMovieFunc={specialMovieFunc} isMovieStart={isMovieStart} setIsMovieStart={setIsMovieStart}
                                                      isReplay={isReplay} setIsReplay={setIsReplay} muted={muted} setMuted={setMuted}/>

                                        {/*지난 1년간 공개된 컨텐츠*/}
                                        <LastYearMovie movieList={lastYearReducer}/>

                                        {/*최근 개봉한 영화*/}
                                        <RecentReleaseMovie movieList={recentReleaseReducer}/>

                                        {/*애니메이션 영화*/}
                                        <AnimationMovie movieList={animationReducer}/>

                                        {/*범죄 영화*/}
                                        <CrimeMovie movieList={crimeReducer}/>

                                        {/*스릴러 영화*/}
                                        <ThrillerMovie movieList={thrillerReducer}/>

                                        {/*드라마 영화*/}
                                        <DramaMovie movieList={dramaReducer} />

                                        {/*SF 영화*/}
                                        <SFMovie movieList={sfReducer} />
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

export default Browse;