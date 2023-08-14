import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const recentReleaseReducer = createSlice({
    name : 'recentReleaseReducer',
    initialState : [],
    reducers : {
        setRecentReleaseList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setRecentReleaseList } = recentReleaseReducer.actions;

export default recentReleaseReducer;