import {configureStore} from "@reduxjs/toolkit";
import lastYearReducer from './reducer/lastYearReducer.js';
import recentReleaseReducer from "./reducer/recentReleaseReducer.js";
import animationReducer from "./reducer/animationReducer";
import crimeReducer from "./reducer/crimeReducer.js";
import thrillerReducer from "./reducer/thrillerReducer.js";
import dramaReducer from "./reducer/dramaReducer.js";
import sfReducer from "./reducer/sfReducer.js";
import specialReducer from "./reducer/specialReducer.js";
import actionReducer from "./reducer/actionReducer.js";
import adventureReducer from "./reducer/adventureReducer.js";
import comedyReducer from "./reducer/comedyReducer.js";
import familyReducer from "./reducer/familyReducer.js";
import highteenReducer from "./reducer/highteenReducer.js";
import horrorReducer from "./reducer/horrorReducer.js";
import meloReducer from "./reducer/meloReducer.js";
import mysteryReducer from "./reducer/mysteryReducer.js";
import romanceReducer from "./reducer/romanceReducer.js";
import youthReducer from "./reducer/youthReducer.js";
import movieSearchReducer from "./reducer/movieSearchReducer.js";

export const store = configureStore({
    reducer: {
        lastYearReducer : lastYearReducer.reducer,
        recentReleaseReducer: recentReleaseReducer.reducer,
        animationReducer: animationReducer.reducer,
        crimeReducer: crimeReducer.reducer,
        thrillerReducer: thrillerReducer.reducer,
        dramaReducer: dramaReducer.reducer,
        sfReducer: sfReducer.reducer,
        specialReducer: specialReducer.reducer,
        actionReducer: actionReducer.reducer,
        adventureReducer: adventureReducer.reducer,
        comedyReducer: comedyReducer.reducer,
        familyReducer: familyReducer.reducer,
        highteenReducer: highteenReducer.reducer,
        horrorReducer: horrorReducer.reducer,
        meloReducer: meloReducer.reducer,
        mysteryReducer: mysteryReducer.reducer,
        romanceReducer: romanceReducer.reducer,
        youthReducer: youthReducer.reducer,
        movieSearchReducer: movieSearchReducer.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;