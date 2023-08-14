import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const comedyReducer = createSlice({
    name : 'comedyReducer',
    initialState : [],
    reducers : {
        setComedyList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setComedyList } = comedyReducer.actions;

export default comedyReducer;