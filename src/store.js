import {configureStore} from "@reduxjs/toolkit";
import lastYearReducer from './reducer/lastYearReducer.js';
import recentReleaseReducer from "./reducer/recentReleaseReducer.js";
import animationReducer from "./reducer/animationReducer.js";

export default configureStore({
    reducer: {
        lastYearReducer : lastYearReducer.reducer,
        recentReleaseReducer: recentReleaseReducer.reducer,
        animationReducer: animationReducer.reducer
    }
})