import "./Browse.css";
import {useNavigate, useParams} from "react-router-dom";
import {getKMDBMovieOne} from "./movie/movieListFunc.js";
import {useEffect, useRef, useState} from "react";
import {ClipLoader} from "react-spinners";
import {IdleTimerProvider} from 'react-idle-timer';

let prevRailHeight = 0;

function Watch() {
    const {movieId, movieSeq} = useParams();                         // KMDb에 조회 요청할 영화 parameter
    let [status, setStatus] = useState('loading');          // loading : 로딩바 표시, active : 영화 상단, 하단 UI표시, passive : 영화 중지 상태일 때 영화에 대한 설명 표시
    let [isPlayMovie, setIsPlayMovie] = useState(false);    // true : 영화 상영중, false : 영화 중지
    let [movieData, setMovieData] = useState();                      // KMDb에 요청한 영화 DATA
    let [volumeStatus, setVolumeStatus] = useState();                // high, medium, low, off값으로 mute버튼 toggle
    let [playBackForward, setPlayBackForward] = useState();          // back : 뒤로 10초, forward : 앞으로 10초 이동하는 애니메이션 표시
    let [showTimeout, setShowTimeout] = useState();                  // mouse오버 시 SoundBar컴포넌트 유지시키는 용도
    let [disableClickBack, setDisableClickBack] = useState(false);          // 뒤로 10초 이동 시 0.5초 disabled
    let [disableClickForward, setDisableClickForward] = useState(false);    // 앞으로 10초 이동 시 0.5초 disabled
    const videoRef = useRef(null);
    const ariaValueRef = useRef(null);      // 사운드 바에서 사용
    const railRef = useRef(null);           // 사운드 바에서 사용
    const knobRef = useRef(null);           // 사운드 바에서 사용
    const prevRailHeight = useRef(null);    // 사운드 바에서 사용
    const navigate = useNavigate();
    // localStorage.getItem('movieMuted') : 최초 영화 시작 시 설정에 필요한 음소거 값
    // localStorage.getItem('movieVolume') : 최초 영화 시작 시 설정에 필요한 음량 값

    useEffect(() => {
        document.getElementsByTagName('html')[0].className = 't_33e568 t_5c6351 t_510ca7 t_17d527 t_75f67f t_89d625 js-focus-visible watch-video-root';

        // 음소거 기본값 설정
        if(window.common.isEmpty(localStorage.getItem('movieMuted'))) {
            localStorage.setItem('movieMuted', 'OFF');
        }
        // 음량 기본값 설정
        if(window.common.isEmpty(localStorage.getItem('movieVolume'))) {
            localStorage.setItem('movieVolume', '0.5');
        }

        // 영화 정보 가져오기 (movieData를 실제로 사용하진 않지만 하드코딩이 아니라면 이렇게 사용했을 것 같아 로직 구현)
        // 현재는 하드코딩 되어 있음
        getKMDBMovieOne(movieId, movieSeq)
        .catch((err) => {
            console.log(err.code);
        }).then((data) => {
            if(window.common.isEmpty(data)) return;

            setMovieData(data);
            document.querySelector('.ltr-omkt8s').classList.replace('inactive', 'active');

            setTimeout(() => {
                setStatus('active');
                setIsPlayMovie(true);

                document.querySelector('.ltr-1212o1j').style = 'display: block;';
                videoRef.current.play();
                if(localStorage.getItem('movieMuted') == 'ON') {
                    document.getElementById('movie').muted = true;
                    setVolumeStatus('off');
                    ariaValueRef.current.setAttribute('aria-valuenow', 0);
                    knobRef.current.style.top = 'calc(' + Math.floor(railRef.current.getBoundingClientRect().height) + 'px - 1.125rem)';
                    railRef.current.children[0].style.top = '0px';
                    railRef.current.children[0].style.height = '0px';
                }
                else {
                    document.getElementById('movie').muted = false;
                    document.getElementById('movie').volume = localStorage.getItem('movieVolume');
                    volumeSvg(videoRef, setVolumeStatus);
                    ariaValueRef.current.setAttribute('aria-valuenow', localStorage.getItem('movieVolume'))
                    knobRef.current.style.top = localStorage.getItem('knobTop');
                    railRef.current.children[0].style.top = localStorage.getItem('railTop');
                    railRef.current.children[0].style.height = localStorage.getItem('railHeight');
                }
            }, 2500);
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const handleResize = () => {
        // prevRailHeight.current : resize되기 전 레일의 height
        // railRef.current.offsetHeight : resize된 후 레일의 height
        // 사운드바
        const percent = ((prevRailHeight.current-railRef.current.offsetHeight) / prevRailHeight.current)*100;     // 브라우저가 줄어들거나 늘어난 % 구하기
        const knobCalcVal = knobRef.current.style.top;    // 볼륨 버튼의 top값 > calc(??px-1.125rem)
        // calc()에서 px값만 추출
        const startIndex = knobCalcVal.indexOf("(") + 1;
        const endIndex = knobCalcVal.indexOf("px");
        const knobTop = knobCalcVal.substring(startIndex, endIndex);
        const newTop = knobTop - ((knobTop * percent) / 100);

        knobRef.current.style.top = `calc(${newTop}px - 1.125rem`;
        railRef.current.children[0].style.top = `${newTop}px`;
        railRef.current.children[0].style.height = (railRef.current.offsetHeight - `${newTop}`) + 'px';
        prevRailHeight.current = railRef.current.offsetHeight;
    };


    return (
        <div className="netflix-sans-font-loaded">
            <div dir="ltr" className="extended-diacritics-language">
                <div className="watch-video" data-live-event-state="false" data-uia="watch-video">
                    <div className="watch-video--player-view">
                        {
                            // 로딩
                            // status == "loading" ? <Loading /> : <TimerComponent status={status} setStatus={setStatus} isPlayMovie={isPlayMovie}
                            //                                                     setIsPlayMovie={setIsPlayMovie} />
                        }
                        <div className="uma" id="uma" role="region"></div>
                        <div className="inactive ltr-omkt8s" tabIndex="0">
                            {
                                // 영화
                                // status != "loading" ? <Video isPlayMovie={isPlayMovie} setIsPlayMovie={setIsPlayMovie} status={status} setStatus={setStatus} /> : null
                                movieData != null && movieData != '' ? <Video videoRef={videoRef} /> : null
                            }
                            {
                                // 영화 조작 UI
                                status == "active" ? <Active movieData={movieData} volumeStatus={volumeStatus} setVolumeStatus={setVolumeStatus}
                                                             isPlayMovie={isPlayMovie} setIsPlayMovie={setIsPlayMovie} setPlayBackForward={setPlayBackForward}
                                                             disableClickBack={disableClickBack} disableClickForward={disableClickForward}
                                                             setDisableClickBack={setDisableClickBack} setDisableClickForward={setDisableClickForward}
                                                             navigate={navigate} setShowTimeout={setShowTimeout} videoRef={videoRef}
                                                             ariaValueRef={ariaValueRef} knobRef={knobRef} railRef={railRef} /> :
                                status == "passive" && isPlayMovie == false ? <Passive /> : null
                            }
                        </div>
                    </div>
                    {
                        // 영화 클릭 시 중앙에 play와 pause 이미지 노출
                        isPlayMovie ? <NotiPlay /> : <NotiPause />
                    }

                    <SoundBar showTimeout={showTimeout} ariaValueRef={ariaValueRef} railRef={railRef} knobRef={knobRef} videoRef={videoRef}
                              prevRailHeight={prevRailHeight} setVolumeStatus={setVolumeStatus}/>

                    {
                        playBackForward == 'back' ? <PlayBack /> :
                        playBackForward == 'forward' ? <PlayForward /> : null
                    }

                </div>
                <div className="visually-hidden screenReaderMessage" role="alert" aria-live="assertive">
                    <span></span>
                </div>
                <div className="visually-hidden" style={{display: 'none'}}>
                    <div id="standaloneAudioDescriptionAvailable">화면 해설이 제공됩니다</div>
                    <div id="episodesAudioDescriptionAvailable">일부 에피소드에 화면 해설이 제공됩니다</div>
                    <div id="standaloneTextClosedCaptionsAvailable">청각 장애인용 자막이 지원됩니다</div>
                    <div id="episodicTextClosedCaptionsAvailable">일부 에피소드에 청각 장애인용 자막이 지원됩니다</div>
                    <div id="playWithAudioDescription">화면 해설을 켠 채로 시작합니다</div>
                </div>
            </div>
        </div>
    )
}

// 10초 전으로 이동 시 화면에 표시
function PlayBack() {
    return (
        <div className="playback-notification playback-notification--back-10" data-uia="watch-video-notification-back-10">
            <div className="playback-notification-background"></div>
            <div className="playback-notification-icon large ltr-1evcx25" role="presentation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="Back10" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97066 20.8978 6.88324 21.5694 9.09717C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479973 13.5867 -0.214321 10.8238 0.0578004C8.71195 0.265799 6.70517 1.02858 5 2.2532V1H3V5C3 5.55228 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55228 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1758 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43388C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43388C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1758 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01928V15.8554H8.60395Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
    )
}

// 10초 다음으로 이동 시 화면에 표시
function PlayForward() {
    return (
        <div className="playback-notification playback-notification--forward-10" data-uia="watch-video-notification-forward-10">
            <div className="playback-notification-background"></div>
            <div className="playback-notification-icon large ltr-1evcx25" role="presentation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="Forward10" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.4443 3.68532C8.36795 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55229 21 5V1H19V2.2532C17.2948 1.02859 15.2881 0.2658 13.1762 0.057802C10.4133 -0.214319 7.64154 0.479975 5.33316 2.02238C3.02478 3.56479 1.32262 5.85989 0.516718 8.51661C-0.289188 11.1733 -0.148981 14.0273 0.913451 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09718C3.10219 6.88324 4.52065 4.97067 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55229 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2078 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1759 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43389C15.2078 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43389C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1759 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.429 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.429 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01929L7 9.81956V11.1405L8.60395 10.7163Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
    )
}

function getCalcValue(calcString) {
    // calcString 형식 예시: "calc(39.8959px - 1.125rem)"
    const regex = /calc\(([^)]+)\)/; // calc 내용 추출을 위한 정규식
    const matches = calcString.match(regex);

    if (matches && matches.length >= 2) {
        const expression = matches[1]; // calc 내용 추출 (예시: "39.8959px - 1.125rem")
        const tokens = expression.split(/\s+([+-])\s+/); // 공백과 연산자 기준으로 분리 (예시: ["39.8959px", "-", "1.125rem"])

        // 현재 뷰포트의 font-size 기준으로 rem을 px로 변환
        const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // 현재 뷰포트의 font-size
        const remToPx = (rem) => rem * fontSize;

        // 숫자 값을 추출하여 계산
        let result = parseFloat(tokens[0]); // 첫 번째 숫자로 초기화
        for (let i = 1; i < tokens.length; i += 2) {
            const value = parseFloat(tokens[i]);
            const unit = tokens[i + 1] || ''; // 연산자 다음에는 단위가 없을 수도 있으므로 기본값은 빈 문자열

            if (unit === '-') {
                result -= value;
            } else if (unit === '+') {
                result += value;
            }
        }

        return result;
    }

    return 0;
}

// 음량 조절 게이지 컴포넌트
function SoundBar(props) {
    let {showTimeout, ariaValueRef, railRef, knobRef, videoRef, prevRailHeight, setVolumeStatus} = props;
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        prevRailHeight.current = railRef.current.offsetHeight;
    }, [railRef.current]);

    const volumeControl = (event) => {
        prevRailHeight.current = railRef.current.offsetHeight;
        const knobHeight = knobRef.current.offsetHeight;
        const railTop = railRef.current.getBoundingClientRect().top;
        const railHeight = Math.floor(railRef.current.getBoundingClientRect().height);
        const mouseY = event.clientY;
        const newTop = Math.max(0, Math.min(railHeight, mouseY - railTop - knobHeight / 2));
        const newValue = 1 - (newTop / railHeight);
        let volume = Math.min(1, newValue).toString();

        knobRef.current.style.top = `calc(${newTop}px - 1.125rem`; // 볼륨 버튼 위치
        ariaValueRef.current.setAttribute('aria-valuenow', volume);
        videoRef.current.volume = volume; // 영화의 실제 볼륨 조절
        railRef.current.children[0].style.top = `${newTop}px`; // 볼륨 버튼 이동 시 레일의 빨간색 게이지 표시하기 위한 top
        railRef.current.children[0].style.height = (railRef.current.offsetHeight - `${newTop}`) + 'px'; // 볼륨 버튼 이동 시 레일의 빨간색 게이지 표시하기 위한 height

        volumeSvg(videoRef, setVolumeStatus);

        localStorage.setItem('movieVolume', volume);
        localStorage.setItem('knobTop', knobRef.current.style.top);
        localStorage.setItem('railTop', railRef.current.children[0].style.top);
        localStorage.setItem('railHeight', railRef.current.children[0].style.height);
    }

    const volumePointerDown = (event) => {
        setIsDragging(true);
        volumeControl(event);
    };

    const volumePointerUp = () => {
        setIsDragging(false);

        if(videoRef.current.volume > 0) {
            localStorage.setItem('movieMuted', 'OFF');
        }else {
            localStorage.setItem('movieMuted', 'ON');
        }
    };

    const volumePointerMove = (event) => {
        if (!isDragging) return;
        volumeControl(event);
    };

    const timeoutClear = () => {
        clearTimeout(showTimeout);
    }

    const timeout = () => {
        setTimeout(() => {
            const $muteBtn = document.getElementById('muteBtn').children[0];
            const $soundBar = document.querySelector('.ltr-4dcwks');
            $muteBtn.classList.remove('active');
            $soundBar.classList.remove('show');
        }, 300);
    }

    return (
        <div className="ltr-4dcwks show" style={{left: '272px', top: '640px'}} onMouseOver={timeoutClear} onMouseLeave={timeout}>
            <div className="ltr-f9fjby">
                <div className="watch-video--scrubber-volume-container medium" data-uia="watch-video-volume-content"
                     onPointerDown={volumePointerDown}
                     onPointerUp={volumePointerUp}
                     onPointerMove={volumePointerMove}
                     onPointerLeave={volumePointerUp}
                >
                    <div ref={ariaValueRef} aria-orientation="vertical" aria-valuemax="1" aria-valuemin="0" aria-valuenow="0" className="medium ltr-p2znkt" data-uia="scrubber"
                         max="1" min="0" role="slider" tabIndex="0" style={{height: '100%', width: 'auto', padding: '1.35rem 1.125rem'}}
                    >
                        <div ref={railRef} data-uia="scrubber-rail" className="ltr-c5fsq2" style={{height: '100%', width: '1.125rem'}}
                             onPointerDown={volumePointerDown}
                             onPointerUp={volumePointerUp}
                        >
                            <div data-uia="scrubber-rail-filled" className="ltr-1bhvfwo" style={{top: '0', width: '100%'}} />
                            <div ref={knobRef} data-uia="scrubber-knob" className="ltr-16i8klm" style={{left: '-0.5625rem', top: '0'}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NotiPlay() {
    return(
        <div className="playback-notification playback-notification--play" data-uia="watch-video-notification-play">
            <div className="playback-notification-background"></div>
            <div className="playback-notification-icon large ltr-1evcx25" role="presentation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="Play" aria-hidden="true">
                    <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
    )
}

function NotiPause() {
    return(
        <div className="playback-notification playback-notification--pause" data-uia="watch-video-notification-pause">
            <div className="playback-notification-background"></div>
            <div className="playback-notification-icon large ltr-1evcx25" role="presentation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="Pause" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
    )
}

// 로딩바
function Loading() {
    return (
        <div className="player-loading">
            <div className="player-loading-background-image player-loading-background-image-loading"></div>
            <div className="gradient"></div>
            <div>
                <div className="loading-children-container">
                    <ClipLoader color="rgba(214, 54, 54, 1)" size={65} speedMultiplier={0.8}/>
                    <div className="nfp-control-row top-right-controls">
                        <button className="touchable PlayerControls--control-element nfp-button-control circle-control-button button-nfplayerExit" role="button" aria-label="뒤로 가기"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 영화
function Video(props) {
    return (
        <div className="ltr-1212o1j" data-uia="video-canvas" style={{display: 'none'}}>
            <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
                    <video ref={props.videoRef} id="movie" onEnded={() => {document.getElementById('moviePlay').click();}} src="https://www.kmdb.or.kr/trailer/play/MK059186_P02.mp4" style={{width: '100%', height: '1208px'}}/>
                    <div className="player-timedtext" style={{display: 'none', direction: 'ltr'}} />
                </div>
            </div>
        </div>
    )
}

// 재생버튼
function moviePlayBtn(isPlayMovie, setIsPlayMovie) {
    if(isPlayMovie) {
        document.getElementById('movie').pause();
    }
    else {
        document.getElementById('movie').play();
    }
    setIsPlayMovie(!isPlayMovie);
}

// 음소거 버튼 컴포넌트
function MovieMutedBtn(props) {
    switch (props.volumeStatus) {
        case 'high' :
            return (
                <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="VolumeHigh" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z" fill="currentColor"></path>
                    </svg>
                </>
            )
        break;

        case 'medium' :
            return (
                <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="VolumeMedium" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM17.0709 4.92897C18.9462 6.80433 19.9998 9.34787 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87831 17.157 7.84347 15.6567 6.34318L17.0709 4.92897ZM14.2428 7.7574C15.368 8.88262 16.0001 10.4087 16.0001 12C16.0001 13.5913 15.368 15.1175 14.2428 16.2427L12.8285 14.8285C13.5787 14.0783 14.0001 13.0609 14.0001 12C14.0001 10.9392 13.5787 9.92176 12.8285 9.17161L14.2428 7.7574Z" fill="currentColor"></path>
                    </svg>
                </>
            )
        break;

        case 'low' :
            return (
                <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="VolumeLow" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 4C11 3.59554 10.7564 3.2309 10.3827 3.07612C10.009 2.92134 9.57889 3.00689 9.29289 3.29289L4.58579 8H1C0.447715 8 0 8.44771 0 9V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4ZM5.70711 9.70711L9 6.41421V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70711ZM16.0001 12C16.0001 10.4087 15.368 8.88259 14.2428 7.75737L12.8285 9.17158C13.5787 9.92173 14.0001 10.9391 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8284L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12Z" fill="currentColor"></path>
                    </svg>
                </>
            )
        break;

        case 'off' :
            return (
                <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="VolumeOff" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor"></path>
                    </svg>
                </>
            )
        break;

        default :
            return (
                <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="VolumeOff" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor"></path>
                    </svg>
                </>
            )
        break;
    }
}

function Active(props) {
    let {movieData, volumeStatus, setVolumeStatus, isPlayMovie, setIsPlayMovie, setPlayBackForward
        , disableClickBack, disableClickForward, setDisableClickBack, setDisableClickForward
        , navigate, setShowTimeout, videoRef, ariaValueRef, knobRef, railRef, timeLineBarRef
        , tickRef, tickLeftRef , redBtnRef, redLineRef} = props;

    useEffect(() => {
        document.getElementById('movieTitle').innerText = movieData[0].title;
        document.getElementById('movieDuration').innerText = convertToHHMM(document.getElementById('movie').duration);
    }, []);

    return (
        <div className="ltr-16tr625" style={{alignItems: 'normal', justifyContent: 'flex-end'}}>
            <div className="ltr-1jnlk6v" style={{alignItems: 'flex-start', flexGrow: '1', justifyContent: 'flex-start'}}>
                <div className="ltr-14rufaj" style={{alignItems: 'normal', justifyContent: 'normal'}}>
                    <div className="watch-video--back-container ltr-1jnlk6v" onClick={() => {moviePlayBtn(isPlayMovie, setIsPlayMovie)}} style={{alignItems: 'normal', flexGrow: '1', justifyContent: 'flex-start'}}>
                        <div className="medium ltr-my293h">
                            <button aria-label="Back to Browse" className=" ltr-14ph5iy" data-uia="control-nav-back" onClick={() => {navigate('/Browse')}}>
                                <div className="control-medium ltr-1evcx25" role="presentation">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="ArrowLeft" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M24 11.0001L3.41421 11.0001L8.70711 5.70718L7.29289 4.29297L0.292892 11.293C0.105356 11.4805 0 11.7349 0 12.0001C0 12.2653 0.105356 12.5196 0.292892 12.7072L7.29289 19.7072L8.70711 18.293L3.41421 13.0001H24V11.0001Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="watch-video--flag-container ltr-1jnlk6v" onClick={() => {moviePlayBtn(isPlayMovie, setIsPlayMovie)}} style={{alignItems: 'normal', flexGrow: '1', justifyContent: 'flex-end'}}>
                        <div className="medium ltr-my293h">
                            <button aria-label="Netflix 재생 문제 신고" className=" ltr-14ph5iy" data-uia="control-flag">
                                <div className="control-medium ltr-1evcx25" role="presentation">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="Flag" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 3C0.447715 3 0 3.44772 0 4V10.5714V21H2L2 11.5783C4.05836 11.6067 6.06478 11.7223 8 11.9167V14.5714C8 15.042 8.32807 15.4489 8.78794 15.5487C13.0747 16.4789 17.9011 17 23 17C23.5523 17 24 16.5523 24 16V9.42857C24 8.87629 23.5523 8.42857 23 8.42857C20.5907 8.42857 18.2474 8.30904 16 8.08326V5.42857C16 4.95801 15.6719 4.55111 15.2121 4.45132C10.9253 3.52108 6.09885 3 1 3ZM2 9.57813C4.44972 9.61098 6.83093 9.76415 9.11345 10.0248L10 10.126V11.0183V13.7591C13.6576 14.4969 17.7153 14.9341 22 14.9931V10.4219C19.5503 10.389 17.1691 10.2359 14.8866 9.97522L14 9.87399V8.98168V6.24091C10.3424 5.50309 6.2847 5.06594 2 5.00688V9.57813Z" fill="currentColor"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="watch-video--bottom-controls-container ltr-1jnlk6v" style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <div className="ltr-1qb0uev">
                    <div className="ltr-1bt0omd">
                        <div className="ltr-14rufaj" style={{alignItems: 'normal', justifyContent: 'normal'}}>
                            <div className="ltr-1jnlk6v" style={{alignItems: 'center', flexGrow: '1', justifyContent: 'normal'}}>

                                <div aria-orientation="horizontal" className="medium ltr-uykqh0" data-uia="timeline" role="slider" tabIndex="-1">
                                    <div data-uia="timeline-bar" className="ltr-yzurhj">
                                        <div className="ltr-1jssjem" />
                                        <div className="ltr-1xfifdu" />
                                        <div className="ltr-ai5t3i" />
                                        <div aria-label="재생 시간 표시줄" aria-valuemax="6520208" className="ltr-1gidbvb" style={{left: 'calc(0px - 0.75rem)'}}></div>
                                    </div>

                                    {/*<div className="ltr-1kex6ih show" style={{left: '309px', top: '-160px'}}>*/}
                                    {/*    <div className="ltr-f9fjby">*/}
                                    {/*        <div className="medium ltr-l5iwyw" data-uia="trick-play">*/}
                                    {/*            <div data-uia="trick-play-image">*/}
                                    {/*                <img alt="" src="blob:https://www.netflix.com/30521b6d-320b-4fba-a24b-75883cb2ae2a"/>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="trick-play-text" data-uia="trick-play-text">30:05</div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>



                            <div className="ltr-vpjz8w" style={{alignItems: 'center', justifyContent: 'center'}}>
                                <span className="ltr-13tzgng" id='movieDuration'>
                                </span>
                            </div>
                        </div>
                        <div className="ltr-14rufaj" style={{height: '3rem', minHeight: '3rem', minWidth: '100%', width: '100%'}} />
                        <div className="ltr-1bt0omd">
                            <div className="ltr-14rufaj" style={{alignItems: 'normal', justifyContent: 'normal'}}>
                                <div className="ltr-1jnlk6v" style={{alignItems: 'normal', justifyContent: 'normal'}}>
                                    <div className="medium ltr-my293h">
                                        <button aria-label="재생" id='moviePlay' className=" ltr-14ph5iy" onClick={() => {moviePlayBtn(props.isPlayMovie, props.setIsPlayMovie)}}>
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                {
                                                    props.isPlayMovie ?
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon-nfplayerPause ltr-0 e1mhci4z1" data-name="Pause" aria-hidden="true">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="currentColor"></path>
                                                    </svg>
                                                    :
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon-nfplayerPlay ltr-0 e1mhci4z1">
                                                        <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                                                    </svg>
                                                }
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="medium ltr-my293h">
                                        <button aria-label="뒤로 가기" className=" ltr-14ph5iy" onClick={() => {
                                            if(disableClickBack) return;
                                            playBackForward('back', setPlayBackForward, setDisableClickBack, setDisableClickForward)}
                                        }>
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" data-name="Back10" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97067 20.8978 6.88324 21.5694 9.09718C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479975 13.5867 -0.214319 10.8238 0.057802C8.71195 0.2658 6.70517 1.02859 5 2.2532V1H3V5C3 5.55229 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55229 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1759 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43389C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43389C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1759 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01929V15.8554H8.60395Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="medium ltr-my293h">
                                        <button aria-label="앞으로 가기" className=" ltr-14ph5iy" onClick={() => {
                                            if(disableClickForward) return;
                                            playBackForward('forward', setPlayBackForward, setDisableClickBack, setDisableClickForward)}
                                        }>
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.4443 3.68532C8.36794 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55228 21 5V1H19V2.2532C17.2948 1.02858 15.288 0.265799 13.1762 0.0578004C10.4133 -0.214321 7.64153 0.479973 5.33315 2.02238C3.02478 3.56479 1.32262 5.85989 0.516716 8.51661C-0.28919 11.1733 -0.148983 14.0273 0.913448 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09717C3.10218 6.88324 4.52065 4.97066 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55228 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2077 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1758 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43388C15.2077 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43388C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1758 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.4289 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.4289 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01928L7 9.81956V11.1405L8.60395 10.7163Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="medium ltr-my293h">
                                        <button id='muteBtn' aria-label="음량" className=" ltr-14ph5iy" onClick={movieMutedClick} onMouseOver={(e) => {movieMutedMouseOver(e)}} onMouseEnter={(e) => {movieMutedMouseOver(e)}} onMouseLeave={(e) => {movieMutedMouseLeave(e, setShowTimeout)}}>
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                <MovieMutedBtn volumeStatus={volumeStatus} />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="ltr-vf5me0" style={{alignItems: 'normal', flexGrow: '1', justifyContent: 'normal'}}>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="ltr-17qz7j2" style={{alignItems: 'normal', flexGrow: '1', justifyContent: 'normal'}}>
                                        <div className="medium ltr-er76rf" id='movieTitle'></div>
                                    </div>
                                </div>
                                <div className="ltr-1jnlk6v" style={{alignItems: 'normal', justifyContent: 'flex-end'}}>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="medium ltr-my293h">
                                        <button aria-label="음성 및 자막" className=" ltr-14ph5iy">
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1"aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 4C0 3.44772 0.447715 3 1 3H23C23.5523 3 24 3.44772 24 4V16C24 16.5523 23.5523 17 23 17H19V20C19 20.3688 18.797 20.7077 18.4719 20.8817C18.1467 21.0557 17.7522 21.0366 17.4453 20.8321L11.6972 17H1C0.447715 17 0 16.5523 0 16V4ZM2 5V15H12H12.3028L12.5547 15.1679L17 18.1315V16V15H18H22V5H2ZM10 9H4V7H10V9ZM20 11H14V13H20V11ZM12 13H4V11H12V13ZM20 7H12V9H20V7Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}} />
                                    <div className="medium ltr-my293h">
                                        <button aria-label="1x (기본)" className=" ltr-14ph5iy">
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.6427 7.43779C14.5215 4.1874 9.47851 4.1874 6.35734 7.43779C3.21422 10.711 3.21422 16.0341 6.35734 19.3074L4.91474 20.6926C1.02842 16.6454 1.02842 10.0997 4.91474 6.05254C8.823 1.98249 15.177 1.98249 19.0853 6.05254C22.9716 10.0997 22.9716 16.6454 19.0853 20.6926L17.6427 19.3074C20.7858 16.0341 20.7858 10.711 17.6427 7.43779ZM14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C12.1792 12 12.3528 12.0236 12.518 12.0677L15.7929 8.79289L17.2071 10.2071L13.9323 13.482C13.9764 13.6472 14 13.8208 14 14Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="ltr-14rufaj" style={{minWidth: '3rem', width: '3rem'}}></div>
                                    <div className="medium ltr-my293h">
                                        <button aria-label="전체 화면" className=" ltr-14ph5iy">
                                            <div className="control-medium ltr-1evcx25" role="presentation">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-0 e1mhci4z1" aria-hidden="true">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ltr-14rufaj" style={{height: '3rem', minHeight: '3rem', minWidth: '100%', width: '100%'}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 볼륨 상태 변경 및 음소거처리
function chgVolumeStatus(videoRef, setVolumeStatus, ariaValueRef, knobRef, railRef) {
    if(videoRef.current.muted) {
        videoRef.current.muted = false;
        if (videoRef.current.volume >= 0.7) {
            setVolumeStatus('high');
        } else if (videoRef.current.volume >= 0.4) {
            setVolumeStatus('medium');
        } else if (videoRef.current.volume > 0) {
            setVolumeStatus('low');
        } else if (videoRef.current.volume == 0) {
            setVolumeStatus('off');
        }
        localStorage.setItem('movieMuted', 'OFF');
        ariaValueRef.current.setAttribute('aria-valuenow', localStorage.getItem('movieVolume'));
        knobRef.current.style.top = localStorage.getItem('knobTop');
        railRef.current.children[0].style.top = localStorage.getItem('railTop');
        railRef.current.children[0].style.height = localStorage.getItem('railHeight');
    }
    else {
        videoRef.current.muted = true;
        setVolumeStatus('off');
        localStorage.setItem('movieMuted', 'ON');
        ariaValueRef.current.setAttribute('aria-valuenow', 0);
        knobRef.current.style.top = 'calc(' + Math.floor(railRef.current.getBoundingClientRect().height) + 'px - 1.125rem)';
        railRef.current.children[0].style.top = '0px';
        railRef.current.children[0].style.height = '0px';
    }
}

// 볼륨 상태 값만 변경
function volumeSvg(videoRef, setVolumeStatus) {
    if (videoRef.current.volume >= 0.7) {
        setVolumeStatus('high');
    } else if (videoRef.current.volume >= 0.4) {
        setVolumeStatus('medium');
    } else if (videoRef.current.volume > 0) {
        setVolumeStatus('low');
    } else if (videoRef.current.volume == 0) {
        setVolumeStatus('off');
    }
}

function Passive() {
    return (
        <div className="watch-video--evidence-overlay-container">
            <div className="medium ltr-1rl4r83" data-uia="evidence-overlay">
                <span className="ltr-1nxl1ss">시청 중인 콘텐츠</span>
                <h2 className="ltr-tznaxg">사도행자: 특별수사대</h2>
                <h3 className="ltr-1mauwht" data-uia="evidence-overlay-episode-metadata">
                    <span>2023</span>
                    <span>15+</span>
                    <span>1시간 40분</span>
                </h3>
                <p className="ltr-l09063" data-uia="evidence-overlay-synopsis">경찰 정보 요원이 범죄 조직에 의해
                    사살되면서, 관리하던 위장 요원 '블랙잭'의 모든 정보를 삭제한다. 어느 날 갑자기 '블랙 잭'을 자처하는 인물의 연락을 받은 홍콩 경찰은
                    블랙잭과의 접선을 위해 파티에 요원을 보낸다.
                </p>
                <span className="ltr-hpadbw">일시정지됨</span>
            </div>
        </div>
    )
}

function TimerComponent(props) {
    const {status, setStatus, isPlayMovie, setIsPlayMovie} = props;
    let [changeTimeout, setChangeTimeout] = useState();
    let timeout;

    const changeUI = (status) => {
        document.querySelector('.ltr-omkt8s').classList.replace(document.querySelector('.ltr-omkt8s').classList[0], status);
        setStatus(status);
    }

    // timeout 경과 시
    const onIdle = () => {
        changeUI('inactive');

        if (isPlayMovie == false && document.querySelector('.ltr-omkt8s').classList[0] == 'inactive') {
            timeout = 8000;
        } else {
            timeout = 3000;
        }

        setChangeTimeout(setTimeout(() => {
            changeUI('passive');
        }, timeout));
    }

    // 화면 클릭, 움직임 감지
    const onAction = (event) => {
        clearTimeout(changeTimeout);
        changeUI('active');

        // 스페이스바 입력
        if(event.code == 'Space') {
            moviePlayBtn(props.isPlayMovie, props.setIsPlayMovie);
        }
    }

    return (
        <div>
            <IdleTimerProvider timeout={3000} onIdle={onIdle} onAction={onAction} />
        </div>
    )
}

// 영화 상영 시간 계산
function convertToHHMM(totalSeconds) {
    let hours;
    let minutes;
    let formattedHours;
    let formattedMinutes;
    let result;

    hours = Math.floor(totalSeconds / 60); // 시간 구하기
    minutes = Math.floor(totalSeconds % 60); // 초 구하기
    formattedHours = ("0" + hours).slice(-2); // 시간과 분을 두 자릿수로 표시
    formattedMinutes = ("0" + minutes).slice(-2); // 시간과 분을 두 자릿수로 표시

    result = formattedHours + ":" + formattedMinutes;
    return result;
}

// 영화 10초 전 후 이동
function playBackForward(type, setPlayBackForward, setDisableClickBack, setDisableClickForward) {
    if(type == 'back') {
        document.getElementById('movie').currentTime -= 10;
        setPlayBackForward('back');
        setDisableClickBack(true);
        setTimeout(() => {
            setPlayBackForward('');
            setDisableClickBack(false);
        }, 500);
    }
    else if(type == 'forward') {
        document.getElementById('movie').currentTime += 10;
        setPlayBackForward('forward');
        setDisableClickForward(true);
        setTimeout(() => {
            setPlayBackForward('');
            setDisableClickForward(false);
        }, 500);
    }
}

// 음량 조절 바 생성
function movieMutedMouseOver(e) {
    const $muteBtn = e.target.parentNode.parentNode;
    const $soundBar = document.querySelector('.ltr-4dcwks');

    const muteBtnRect = document.getElementById('muteBtn').getBoundingClientRect();
    const soundBarRect = document.querySelector('.ltr-4dcwks').getBoundingClientRect();

    let left = Math.floor(muteBtnRect.x) + 5;
    let top = Math.floor(muteBtnRect.y - soundBarRect.height) - 10;

    if($muteBtn.classList.contains('active') == false) {
        $muteBtn.className = 'active ' + $muteBtn.className;
    }
    if($soundBar.classList.contains('show') == false) {
        $soundBar.style.left = `${left}px`;
        $soundBar.style.top = `${top}px`;
        $soundBar.classList.add('show');
    }
}

function movieMutedMouseLeave(e, setShowTimeout) {
    const $muteBtn = e.target.parentNode.parentNode;
    const $soundBar = document.querySelector('.ltr-4dcwks');

    let showTimeout = setTimeout(() => {
        $muteBtn.classList.remove('active');
        $soundBar.classList.remove('show');
    }, 300);

    setShowTimeout(showTimeout);
}

export default Watch;