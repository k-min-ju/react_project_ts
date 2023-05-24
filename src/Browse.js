import "./Browse.css";
import {useEffect} from "react";
import axios from "axios";

function Browse() {
    useEffect(() => {
        let searchParam = {
            key: process.env.REACT_APP_KOBIS_API_KEY,
            repNationCd: '22041011',
            openStartDt: '2023',
            curPage: 1,
            itemPerPage: 20
        };
        getMovieList(searchParam);
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
                                        <span className="volatile-billboard-animations-container">
                                            <div className="billboard-row" role="region" aria-label="특별 소개 콘텐츠">
                                                <div className="ptrack-container billboard-presentation-tracking">
                                                    <div className="billboard-presentation-tracking ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                        <div className="billboard-presentation-tracking ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                            <div className="billboard billboard-pane billboard-originals trailer-billboard video-playing">
                                                                <div className="billboard-motion dismiss-mask dismiss-static">
                                                                    <div className="nfp nf-player-container notranslate inactive NFPlayer" tabIndex="-1">
                                                                        <div className="VideoContainer VideoContainer--use-element-dimensions" aria-hidden="true" role="presentation" data-uia="player" data-videoid="81636983">
                                                                            <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                                                                                <div id="81636983" style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                                                                                    {/*<video src="" style="" />*/}
                                                                                    <div className="player-timedtext" style={{display: 'none', direction: 'ltr'}}></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="nfp-aspect-wrapper">
                                                                            <div className="nfp-aspect-container">
                                                                                <div className="nfp-aspect-inner" style={{paddingTop: '56.25%'}}></div>
                                                                                <div className="image-based-timed-text" style={{position: 'absolute', inset: '0px 0px 242.993px', transform: 'translateZ(0px)'}}>
                                                                                    <svg width="100%" height="100%" style={{position: 'absolute', inset: '0px'}} viewBox="0 0 1280 720">
                                                                                        {/*<image xlinkHref="blob:https://www.netflix.com/4acf31b9-76ec-45ff-b4e8-c06c685ddb6f" width="419" height="54" x="431" y="71" data-id="69222" />*/}
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="PlayerControlsNeo__layout PlayerControlsNeo__layout--inactive">
                                                                            <div className="PlayerControlsNeo__all-controls PlayerControlsNeo__all-controls--low-power">
                                                                                <div className="PlayerControlsNeo__gradient-top"></div>
                                                                                <div className="PlayerControlsNeo__gradient-bottom"></div>
                                                                                <div className="PlayerControlsNeo__core-controls">
                                                                                    <div data-uia="nfplayer-bottom-controls" className="PlayerControlsNeo__bottom-controls PlayerControlsNeo__bottom-controls--faded">
                                                                                        <div className="PlayerControlsNeo__progress-control-row PlayerControlsNeo__progress-control-row--row-standard">
                                                                                            <div className="PlayerControlsNeo__progress-container"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="motion-background-component bottom-layer full-screen">
                                                                        <div className="hero-image-wrapper">
                                                                            <img className="hero static-image image-layer" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXjKQ0Fm3w9S41URw4bNFQtdZmm_o_PyhPyjiUza5gEPkXOgcq35Awo_jGDb5jW-Zxlepc_b_CtPjF66yLGUrbXemqfPaXjD7C3y.webp?r=5ee" alt="" />
                                                                            <div className="trailer-vignette vignette-layer"></div>
                                                                            <div className="hero-vignette vignette-layer"></div>
                                                                            <div className="embedded-components button-layer"></div>
                                                                        </div>
                                                                        <div className="embedded-components button-layer">
                                                                            <span className="ActionButtons">
                                                                                <div className="global-supplemental-audio-toggle audio-btn button-layer">
                                                                                    <button aria-label="음성 켜기"className="color-supplementary hasIcon round ltr-uhap25" data-uia="audio-toggle-unmuted" type="button">
                                                                                        <div className="ltr-1ol9m1e">
                                                                                            <div className="small ltr-1evcx25" role="presentation">
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="VolumeHigh">
                                                                                                    <path d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" fill="currentColor"></path>
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                    </button>
                                                                                    {/*<button aria-label="다시 재생" className="color-supplementary hasIcon round ltr-uhap25" type="button">*/}
                                                                                    {/*    <div className="ltr-1ol9m1e">*/}
                                                                                    {/*        <div className="small ltr-1evcx25" role="presentation">*/}
                                                                                    {/*            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Refresh">*/}
                                                                                    {/*            <path d="M13.1747 3.07702C11.01 2.79202 8.81537 3.30372 6.99988 4.51679C5.18439 5.72987 3.8718 7.56158 3.30668 9.67065C2.74155 11.7797 2.96243 14.0223 3.92815 15.9806C4.89388 17.9389 6.53859 19.4794 8.55586 20.3149C10.5731 21.1505 12.8254 21.2242 14.893 20.5224C16.9606 19.8205 18.7025 18.391 19.7942 16.5L18.0622 15.5C17.2131 16.9708 15.8582 18.0826 14.2501 18.6285C12.642 19.1744 10.8902 19.1171 9.32123 18.4672C7.75224 17.8173 6.47302 16.6192 5.7219 15.096C4.97078 13.5729 4.79899 11.8287 5.23853 10.1883C5.67807 8.5479 6.69897 7.12324 8.11102 6.17973C9.52307 5.23623 11.23 4.83824 12.9137 5.05991C14.5974 5.28158 16.1432 6.10778 17.2629 7.3846C18.1815 8.43203 18.762 9.7241 18.9409 11.0921L17.5547 10.168L16.4453 11.8321L19.4453 13.8321C19.7812 14.056 20.2188 14.056 20.5547 13.8321L23.5547 11.8321L22.4453 10.168L20.9605 11.1578C20.784 9.27909 20.0201 7.49532 18.7666 6.06591C17.3269 4.42429 15.3395 3.36202 13.1747 3.07702Z" fill="currentColor"></path>*/}
                                                                                    {/*            </svg>*/}
                                                                                    {/*        </div>*/}
                                                                                    {/*    </div>*/}
                                                                                    {/*</button>*/}
                                                                                </div>
                                                                            </span>
                                                                            <span className="maturity-rating ">
                                                                                <span className="maturity-graphic">
                                                                                    <svg id="maturity-rating-977" viewBox="0 0 100 100" className="svg-icon svg-icon-maturity-rating-977 ">
                                                                                        <path id="Fill---Orange" fill="#CD6D34" d="M88.727 100H11.27C5.05 100 0 94.952 0 88.727V11.273C0 5.047 5.05 0 11.27 0h77.457C94.952 0 100 5.047 100 11.273v77.454C100 94.952 94.952 100 88.727 100"></path>
                                                                                        <path id="15" fill="#FFFFFE" d="M36.876 15.482v68.651H21.509v-49.51h-5.484l7.097-19.141h13.754zm45.46 0V28.87H57.175v10.063h24.08c.845 0 1.533.687 1.533 1.534v42.13c0 .845-.688 1.532-1.534 1.532H43.616a1.533 1.533 0 01-1.533-1.533V62.202H57v8.988h10.874V52.052h-25.79v-36.57h40.254z"></path>
                                                                                    </svg>
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="fill-container">
                                                                    <div className="info meta-layer">
                                                                        <div className="logo-and-text meta-layer">
                                                                            <div className="titleWrapper" style={{transformOrigin: 'left bottom', transform: 'scale(1) translate3d(0px, 0px, 0px)', transitionDuration: '1300ms', transitionDelay: '0ms'}}>
                                                                                <div className="billboard-title">
                                                                                    <img alt="Queen Cleopatra" className="title-logo" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABRZySGZnShksIyikzJJvzCOEGOzb315hxl8vGI7F0_IE1sVAD4FPtJHeJLrc_EctoJK6LaP07sImaw_4Lk3M8Y5xua2c-axx6SLC-U5XSfth-qMYwKWx2y8uIJ6UvGMQoEbG_dNPMtrAXk8gAQ_3FPcY9blFbK_9t9f4Lhto4faN8Es8i_nG9A.webp?r=4cb" title="Queen Cleopatra" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="info-wrapper" style={{transform: 'translate3d(0px, 0px, 0px)', transitionDuration: '1300ms', transitionDelay: '0ms', opacity: '1'}}>
                                                                                <div className="info-wrapper-fade" style={{opacity: '1', transitionDuration: '600ms', transitionDelay: '200ms'}}>
                                                                                    <div className="episode-title-container"></div>
                                                                                    <div className="synopsis-fade-container">
                                                                                        <div className="synopsis no-supplemental">
                                                                                            <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">이집트의 마지막 파라오 클레오파트라. 왕좌와 가족, 그리고 왕조의 유산을 지키기 위해 싸웠던 그녀의 생애를 재연과 전문가 인터뷰를 통해 만나보는 다큐드라마.</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="billboard-links button-layer forward-leaning">
                                                                                <a data-uia="play-button" role="link" aria-label="재생"className=" playLink isToolkit"href="/watch/81459055?trackId=254015180&amp;tctx=0%2C0%2C2fbdb1df-563b-407e-9a2b-d4288b03f75b-19388176%2CNES_1516323CC09CD8ED0CE5B85ED672A1-951BB306AEF2A8-3F7AD7169C_p_1684898751024%2CNES_1516323CC09CD8ED0CE5B85ED672A1_p_1684898751024%2C%2C%2C%2C%2CVideo%3A81230204%2C">
                                                                                    <button className="color-primary hasLabel hasIcon ltr-ed00td" tabIndex="-1"type="button">
                                                                                        <div className="ltr-1ol9m1e">
                                                                                            <div className="medium ltr-1evcx25" role="presentation">
                                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Play">
                                                                                                    <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="ltr-14rufaj" style={{width: '1rem'}}></div>
                                                                                        <span className="ltr-j0gpa2">재생</span>
                                                                                    </button>
                                                                                </a>
                                                                                <button className="color-secondary hasLabel hasIcon ltr-1jtux27" data-uia="billboard-more-info" type="button">
                                                                                    <div className="ltr-1ol9m1e">
                                                                                        <div className="medium ltr-1evcx25" role="presentation">
                                                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard" data-name="Info">
                                                                                                <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ltr-14rufaj" style={{width: '1rem'}}></div>
                                                                                    <span className="ltr-j0gpa2">상세 정보</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        <div className="lolomoRow lolomoRow_title_card ltr-0" data-list-context="newRelease">
                                            <h2 className="rowHeader ltr-0">
                                                <a className="rowTitle ltr-0" href="/browse/m/new-release">
                                                    <div className="row-header-title">지난 1년간 공개된 콘텐츠</div>
                                                    <div className="aro-row-header more-visible">
                                                        <div className="see-all-link">모두 보기</div>
                                                        <div className="aro-row-chevron icon-akiraCaretRight"></div>
                                                    </div>
                                                </a>
                                            </h2>
                                            <div className="rowContainer rowContainer_title_card" id="row-1">
                                                <div className="ptrack-container">
                                                    <div className="rowContent slider-hover-trigger-layer">
                                                        <div className="slider">
                                                            <ul className="pagination-indicator">
                                                                <li className="active"></li>
                                                                <li className=""></li>
                                                                <li className=""></li>
                                                                <li className=""></li>
                                                                <li className=""></li>
                                                                <li className=""></li>
                                                                <li className=""></li>
                                                            </ul>
                                                            <div className="sliderMask showPeek">
                                                                <div className="sliderContent row-with-x-columns">
                                                                    <div className="slider-item slider-item-0">
                                                                        <div className="title-card-container ltr-0">
                                                                            <div id="title-card-1-0" className="title-card">
                                                                                <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                                                    <a href="/watch/81264371?tctx=1%2C0%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81264371%2C" role="link" aria-label="하트시그널" tabIndex="0" aria-hidden="false" className="slider-refocus">
                                                                                        <div className="boxart-size-16x9 boxart-container boxart-rounded">
                                                                                            <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbmtBWcftTk87jMmenEYjD47FDuB93pqKR0cWo5R3gdzbEb4sNT2FdBVdKk8G0FL9DkUZFsCmpMDhYd6GLFO12V24OJ9Q7lkXkeh0tT-IPQQroyyfbeKcesQ1xgwwpZw8ZHLdVMtLmRPaxoyMxpk_hSziTegs623ClXfP6xDs416tZlz77eUvlWVxO-HGsgcFZjqfvKD_aQ9vQsyPVqK2jBj5ZeLQTZyAyjThSQRF6h-SSJnn-FMcX9sNe0T-b5LK5JCfDB0teEX4-Blzn-Z5TRFBr2ij11L3Dff4H9GyVwX-ZNakXxrjubEH56KuBZ-tgCneeEX44J0xqly7Ejog9ezdpS1qAOfoN4Mm-RntacXbzfq29X_0YJ1Mt61dTEUdcAya3kHo0so-SfqLrBLcH7H4gdBIAfHBToZ3BhsxTI3Gu_sFT-2WSU2xksG5f-qsRYxBnnN.webp?r=eab" alt="" />
                                                                                            <div className="fallback-text-container" aria-hidden="true">
                                                                                                <p className="fallback-text">하트시그널</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div>
                                                                                <div className="bob-container"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-1">
                                                                        <div className="title-card-container ltr-0">
                                                                            <div id="title-card-1-1"
                                                                                 className="title-card">
                                                                                <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                                                    <a href="/watch/80223108?tctx=1%2C1%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A80223108%2C" role="link" aria-label="셀링 선셋" tabIndex="0" aria-hidden="false" className="slider-refocus">
                                                                                        <div className="boxart-size-16x9 boxart-container boxart-rounded">
                                                                                            <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABSbdnzkayMwes2xm36oCKpR5c4OGhlzLkeGYFCcNmlSrO_RCl4nU0fXLo2e4o8x1Sa5SD7nU3lYXjboykIOdJVktH1QuzuNEQn7iQh-TPmtlP-IGh4f3h9URD54amg_gN1OSJwsy4T-4JcD38I-gDHrCKPSBX56Xmx6F-et2puRrfiB-7Sh6VLuybhts1_3Lou4fzNh_Qc3dV0FTN0PT28HdNqZGVRaJKcYOG5_wS1NGpDuVX-o1uplBodRrAgRf1g3l1wPIDPSeV_zKGfhXvgHvFv1SM4r_N3sQiWILiZPDpjXFDcto_3EZOxU.jpg?r=0c8" alt="" />
                                                                                                <div className="fallback-text-container" aria-hidden="true">
                                                                                                    <p className="fallback-text">셀링 선셋</p>
                                                                                                </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div>
                                                                                <div className="bob-container"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-2">
                                                                        <div className="title-card-container ltr-0">
                                                                            <div id="title-card-1-2"
                                                                                 className="title-card">
                                                                                <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                                                    <a href="/watch/81689378?tctx=1%2C2%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81689378%2C"
                                                                                       role="link" aria-label="내일은 위닝샷"
                                                                                       tabIndex="0" aria-hidden="false"
                                                                                       className="slider-refocus">
                                                                                        <div className="boxart-size-16x9 boxart-container boxart-rounded">
                                                                                            <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABS8skNanZwqa6Lu07frpY4Vli2aIvksp9jbUTZtslmJtSb4upFXyFHRxFiWq7q8FNF7ZsyniseF2r53oZVnhqef0tH-03ZD7Iu5ENmI0HnVow8BKAIqV6kSE_H6Yl6IRlcLd61XvbdL40oOA4WTF_9Sekt8sYUw5Gfuz98wRJ7gRSrKNZZrnX8yqpp09fKq80x3kv0yz02vSzzdgE4gX5r8wMCDifwn4MNQR7pX0UShf9yRp9wS03HffoXVMfEEirV3-QyWaiRVV-uDNeiVyucnsuR4pXwrGMjfEbfeLJkTZIoFaetWOzbzaY9HPNf8wEFkbqNe6txxuuGw3OnW_IGl9kMRbdnfrVNMXWNpQ57ul-GR048CxWyGmzNogTpspqDwwk51TGo4OoaaVY4RnPHlemhJ883x-7b9MAYprksQmI8SpJp8n9tWYkvN0T_HpqMZrwKpM.webp?r=45c" alt="" />
                                                                                                <div className="fallback-text-container" aria-hidden="true">
                                                                                                    <p className="fallback-text">내일은 위닝샷</p>
                                                                                                </div>
                                                                                        </div>
                                                                                    </a></div>
                                                                                <div className="bob-container"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-">
                                                                        <div className="title-card-container ltr-0">
                                                                            <div id="title-card-1-8"
                                                                                 className="title-card">
                                                                                <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                                                    <a href="/watch/81672245?tctx=1%2C8%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81672245%2C" aria-label="대행사" tabIndex="-1" aria-hidden="true" className="slider-refocus">
                                                                                        <div className="boxart-size-16x9 boxart-container boxart-rounded">
                                                                                            <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABaLzxDqM0XUjbatIMWHVxSbwFToCKVDK8qoNU3VWX1LRDc32vs4Akqm5-7nTj_1uE_lMUFOwUD27HjaFFGgEpnMFzggmHFDw41Y.webp?r=be6" alt="" />
                                                                                            <div className="fallback-text-container" aria-hidden="true">
                                                                                                <p className="fallback-text">대행사</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div>
                                                                                <div className="bob-container"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-">
                                                                        <div className="smallTitleCard loadingTitle fullWidth">
                                                                            <div className="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-">
                                                                        <div className="smallTitleCard loadingTitle fullWidth">
                                                                            <div className="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-">
                                                                        <div className="smallTitleCard loadingTitle fullWidth">
                                                                            <div className="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="slider-item slider-item-">
                                                                        <div className="smallTitleCard loadingTitle fullWidth">
                                                                            <div className="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="handle handleNext active" tabIndex="0" role="button" aria-label="콘텐츠 더 보기">
                                                                <b className="indicator-icon icon-rightCaret"></b>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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

async function getMovieList(searchParam) {
    if(window.common.isNotEmpty(searchParam)) {
        let movieList;
        const kobisMovieSearch = axios.create({
            baseURL: 'https://kobis.or.kr'
        });
        let getMovieList = (params) => {
            return kobisMovieSearch.get("/kobisopenapi/webservice/rest/movie/searchMovieList.json", {params})
                                    .catch((err) => {
                                        console.log("error="+err);
                                    })
                                    .then((res) => {
                                        let movieInfo = res.data.movieListResult.movieList;
                                        if(movieInfo.length > 0) {
                                            movieList = movieInfo.filter((movie) => !movie.genreAlt.includes("성인물"));
                                        }
                                    });
        }
        await getMovieList(searchParam);
        console.log(movieList);
    }
}

export default Browse;