import {createSlice} from "@reduxjs/toolkit";

const recentReleaseReducer = createSlice({
    name : 'recentReleaseReducer',
    initialState : [],
    reducers : {
        setRecentReleaseList(state, action) {
            let recentReleaseMovie = [...state];
            recentReleaseMovie = action.payload;
            return recentReleaseMovie;
        }
    }
});

export let { setRecentReleaseList } = recentReleaseReducer.actions;

export default recentReleaseReducer;