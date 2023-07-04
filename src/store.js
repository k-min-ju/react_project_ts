import {configureStore} from "@reduxjs/toolkit";
import lastYearReducer from './reducer/lastYearReducer.js';
import recentReleaseReducer from "./reducer/recentReleaseReducer.js";
import animationReducer from "./reducer/animationReducer.js";
import crimeReducer from "./reducer/crimeReducer.js";
import thrillerReducer from "./reducer/thrillerReducer.js";
import dramaReducer from "./reducer/dramaReducer.js";
import sfReducer from "./reducer/sfReducer.js";
import specialReducer from "./reducer/specialReducer.js";

export default configureStore({
    reducer: {
        lastYearReducer : lastYearReducer.reducer,
        recentReleaseReducer: recentReleaseReducer.reducer,
        animationReducer: animationReducer.reducer,
        crimeReducer: crimeReducer.reducer,
        thrillerReducer: thrillerReducer.reducer,
        dramaReducer: dramaReducer.reducer,
        sfReducer: sfReducer.reducer,
        specialReducer: specialReducer.reducer,
    }
})