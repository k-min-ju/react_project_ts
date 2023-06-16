import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

let slidesPer1 = 7;
let slidesPer2 = 5;
let slidesPer3 = 4;
let slidesPer4 = 3;

function LastYearMovie(props) {
    if(props.movieList.length == 0) return;
    console.log(111)
    let movieList = [...props.movieList];

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    };

    return (
        <div>
            <div className="lolomoRow lolomoRow_title_card ltr-0" data-list-context="newRelease">
                <h2 className="rowTitle ltr-0">지난 1년간 공개된 영화
                    {/*<a className="rowTitle ltr-0" href="/browse/m/new-release">*/}
                    {/*    <div className="row-header-title">지난 1년간 공개된 콘텐츠</div>*/}
                    {/*    <div className="aro-row-header more-visible">*/}
                    {/*        <div className="see-all-link">모두 보기</div>*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-chevron-right" viewBox="0 0 16 16">*/}
                    {/*            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}
                    {/*</a>*/}
                </h2>
                <div className="rowContainer rowContainer_title_card" id="row-1">
                    <div className="ptrack-container">
                        <div className="rowContent slider-hover-trigger-layer">
                                <div className="slider">
                                    <div className="sliderMask showPeek">
                                        <div className="sliderContent row-with-x-columns">
                                            <Swiper style={{'--swiper-pagination-bullet-inactive-opacity': '1'}}
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                navigation
                                                spaceBetween={10}
                                                speed={750}
                                                loop={true}
                                                pagination={pagination}
                                                onSlideChange={(swiper) => {
                                                    swiper.update();
                                                }}
                                                onSlideChangeTransitionEnd={(swiper) => {
                                                    const element = swiper.el;
                                                    // 이전 버튼 활성화
                                                    element.childNodes[1].style = 'display: flex !important;';
                                                }}
                                                breakpoints={{
                                                    1378: {
                                                        slidesPerView: slidesPer1,
                                                        slidesPerGroup: slidesPer1,
                                                    },
                                                    998: {
                                                        slidesPerView: slidesPer2,
                                                        slidesPerGroup: slidesPer2,
                                                    },
                                                    625: {
                                                        slidesPerView: slidesPer3,
                                                        slidesPerGroup: slidesPer3,
                                                    },
                                                    0: {
                                                        slidesPerView: slidesPer4,
                                                        slidesPerGroup: slidesPer4,
                                                    }
                                                }}
                                            >
                                            {
                                                movieList.map((item, index) => {
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            <div className={'slider-item slider-item-' + index} style={{width: '100%'}}>
                                                                <div className={'title-card-container ltr-' + index}>
                                                                    <div id={'title-card-1-' + index} className="title-card">
                                                                        <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
                                                                            <a href="/watch/81264371?tctx=1%2C0%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81264371%2C" role="link" aria-label={item.title} tabIndex="0" aria-hidden="false" className="slider-refocus">
                                                                                <div className="boxart-size-16x9 boxart-container boxart-rounded" style={{height: '170px'}}>
                                                                                    <img className="boxart-image boxart-image-in-padded-container" style={{height: '100%'}} src={
                                                                                        item.posters.split("|")[0]
                                                                                    } alt=""/>
                                                                                    <div className="fallback-text-container" aria-hidden="true">
                                                                                        <p className="fallback-text">{item.title}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                            </Swiper>
                                        </div>
                                    </div>

                                    {/*<span className="handle handleNext active" tabIndex="0" role="button" aria-label="콘텐츠 더 보기">*/}
                                    {/*    <b className="indicator-icon icon-rightCaret" onClick={() => {*/}

                                    {/*    }}>*/}
                                    {/*        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">*/}
                                    {/*          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>*/}
                                    {/*        </svg>*/}
                                    {/*    </b>*/}
                                    {/*</span>*/}
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <div className="lolomoRow lolomoRow_title_card ltr-0" data-list-context="newRelease">
        //         <h2 className="rowHeader ltr-0">
        //             <a className="rowTitle ltr-0" href="/browse/m/new-release">
        //                 <div className="row-header-title">지난 1년간 공개된 콘텐츠</div>
        //                 <div className="aro-row-header more-visible">
        //                     <div className="see-all-link">모두 보기</div>
        //                     <div className="aro-row-chevron icon-akiraCaretRight"></div>
        //                 </div>
        //             </a>
        //         </h2>
        //         <div className="rowContainer rowContainer_title_card" id="row-1">
        //             <div className="ptrack-container">
        //                 <div className="rowContent slider-hover-trigger-layer">
        //                     <div className="slider">
        //                         <ul className="pagination-indicator">
        //                             <li className="active"></li>
        //                             <li className=""></li>
        //                             <li className=""></li>
        //                             <li className=""></li>
        //                             <li className=""></li>
        //                             <li className=""></li>
        //                             <li className=""></li>
        //                         </ul>
        //                         <div className="sliderMask showPeek">
        //                             <div className="sliderContent row-with-x-columns">
        //                                 <div className="slider-item slider-item-0">
        //                                     <div className="title-card-container ltr-0">
        //                                         <div id="title-card-1-0" className="title-card">
        //                                             <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
        //                                                 <a href="/watch/81264371?tctx=1%2C0%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81264371%2C" role="link" aria-label="하트시그널" tabIndex="0" aria-hidden="false" className="slider-refocus">
        //                                                     <div className="boxart-size-16x9 boxart-container boxart-rounded">
        //                                                         <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbmtBWcftTk87jMmenEYjD47FDuB93pqKR0cWo5R3gdzbEb4sNT2FdBVdKk8G0FL9DkUZFsCmpMDhYd6GLFO12V24OJ9Q7lkXkeh0tT-IPQQroyyfbeKcesQ1xgwwpZw8ZHLdVMtLmRPaxoyMxpk_hSziTegs623ClXfP6xDs416tZlz77eUvlWVxO-HGsgcFZjqfvKD_aQ9vQsyPVqK2jBj5ZeLQTZyAyjThSQRF6h-SSJnn-FMcX9sNe0T-b5LK5JCfDB0teEX4-Blzn-Z5TRFBr2ij11L3Dff4H9GyVwX-ZNakXxrjubEH56KuBZ-tgCneeEX44J0xqly7Ejog9ezdpS1qAOfoN4Mm-RntacXbzfq29X_0YJ1Mt61dTEUdcAya3kHo0so-SfqLrBLcH7H4gdBIAfHBToZ3BhsxTI3Gu_sFT-2WSU2xksG5f-qsRYxBnnN.webp?r=eab" alt="" />
        //                                                         <div className="fallback-text-container" aria-hidden="true">
        //                                                             <p className="fallback-text">하트시그널</p>
        //                                                         </div>
        //                                                     </div>
        //                                                 </a>
        //                                             </div>
        //                                             <div className="bob-container"></div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-1">
        //                                     <div className="title-card-container ltr-0">
        //                                         <div id="title-card-1-1"
        //                                              className="title-card">
        //                                             <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
        //                                                 <a href="/watch/80223108?tctx=1%2C1%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A80223108%2C" role="link" aria-label="셀링 선셋" tabIndex="0" aria-hidden="false" className="slider-refocus">
        //                                                     <div className="boxart-size-16x9 boxart-container boxart-rounded">
        //                                                         <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABSbdnzkayMwes2xm36oCKpR5c4OGhlzLkeGYFCcNmlSrO_RCl4nU0fXLo2e4o8x1Sa5SD7nU3lYXjboykIOdJVktH1QuzuNEQn7iQh-TPmtlP-IGh4f3h9URD54amg_gN1OSJwsy4T-4JcD38I-gDHrCKPSBX56Xmx6F-et2puRrfiB-7Sh6VLuybhts1_3Lou4fzNh_Qc3dV0FTN0PT28HdNqZGVRaJKcYOG5_wS1NGpDuVX-o1uplBodRrAgRf1g3l1wPIDPSeV_zKGfhXvgHvFv1SM4r_N3sQiWILiZPDpjXFDcto_3EZOxU.jpg?r=0c8" alt="" />
        //                                                         <div className="fallback-text-container" aria-hidden="true">
        //                                                             <p className="fallback-text">셀링 선셋</p>
        //                                                         </div>
        //                                                     </div>
        //                                                 </a>
        //                                             </div>
        //                                             <div className="bob-container"></div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-2">
        //                                     <div className="title-card-container ltr-0">
        //                                         <div id="title-card-1-2"
        //                                              className="title-card">
        //                                             <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
        //                                                 <a href="/watch/81689378?tctx=1%2C2%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81689378%2C"
        //                                                    role="link" aria-label="내일은 위닝샷"
        //                                                    tabIndex="0" aria-hidden="false"
        //                                                    className="slider-refocus">
        //                                                     <div className="boxart-size-16x9 boxart-container boxart-rounded">
        //                                                         <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABS8skNanZwqa6Lu07frpY4Vli2aIvksp9jbUTZtslmJtSb4upFXyFHRxFiWq7q8FNF7ZsyniseF2r53oZVnhqef0tH-03ZD7Iu5ENmI0HnVow8BKAIqV6kSE_H6Yl6IRlcLd61XvbdL40oOA4WTF_9Sekt8sYUw5Gfuz98wRJ7gRSrKNZZrnX8yqpp09fKq80x3kv0yz02vSzzdgE4gX5r8wMCDifwn4MNQR7pX0UShf9yRp9wS03HffoXVMfEEirV3-QyWaiRVV-uDNeiVyucnsuR4pXwrGMjfEbfeLJkTZIoFaetWOzbzaY9HPNf8wEFkbqNe6txxuuGw3OnW_IGl9kMRbdnfrVNMXWNpQ57ul-GR048CxWyGmzNogTpspqDwwk51TGo4OoaaVY4RnPHlemhJ883x-7b9MAYprksQmI8SpJp8n9tWYkvN0T_HpqMZrwKpM.webp?r=45c" alt="" />
        //                                                         <div className="fallback-text-container" aria-hidden="true">
        //                                                             <p className="fallback-text">내일은 위닝샷</p>
        //                                                         </div>
        //                                                     </div>
        //                                                 </a></div>
        //                                             <div className="bob-container"></div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-">
        //                                     <div className="title-card-container ltr-0">
        //                                         <div id="title-card-1-8"
        //                                              className="title-card">
        //                                             <div className="ptrack-content" data-ui-tracking-context="" data-tracking-uuid="">
        //                                                 <a href="/watch/81672245?tctx=1%2C8%2C%2C%2C%2C%2C%2C%2C%2CVideo%3A81672245%2C" aria-label="대행사" tabIndex="-1" aria-hidden="true" className="slider-refocus">
        //                                                     <div className="boxart-size-16x9 boxart-container boxart-rounded">
        //                                                         <img className="boxart-image boxart-image-in-padded-container" src="http://occ-0-993-2218.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABaLzxDqM0XUjbatIMWHVxSbwFToCKVDK8qoNU3VWX1LRDc32vs4Akqm5-7nTj_1uE_lMUFOwUD27HjaFFGgEpnMFzggmHFDw41Y.webp?r=be6" alt="" />
        //                                                         <div className="fallback-text-container" aria-hidden="true">
        //                                                             <p className="fallback-text">대행사</p>
        //                                                         </div>
        //                                                     </div>
        //                                                 </a>
        //                                             </div>
        //                                             <div className="bob-container"></div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-">
        //                                     <div className="smallTitleCard loadingTitle fullWidth">
        //                                         <div className="ratio-16x9 no-pulsate"></div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-">
        //                                     <div className="smallTitleCard loadingTitle fullWidth">
        //                                         <div className="ratio-16x9 no-pulsate"></div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-">
        //                                     <div className="smallTitleCard loadingTitle fullWidth">
        //                                         <div className="ratio-16x9 no-pulsate"></div>
        //                                     </div>
        //                                 </div>
        //                                 <div className="slider-item slider-item-">
        //                                     <div className="smallTitleCard loadingTitle fullWidth">
        //                                         <div className="ratio-16x9 no-pulsate"></div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <span className="handle handleNext active" tabIndex="0" role="button" aria-label="콘텐츠 더 보기">
        //                             <b className="indicator-icon icon-rightCaret"></b>
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default React.memo(LastYearMovie);