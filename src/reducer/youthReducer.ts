import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const youthReducer = createSlice({
    name : 'youthReducer',
    initialState : [],
    reducers : {
        setYouthList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setYouthList } = youthReducer.actions;

export default youthReducer;