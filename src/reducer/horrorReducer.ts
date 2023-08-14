import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const horrorReducer = createSlice({
    name : 'horrorReducer',
    initialState : [],
    reducers : {
        setHorrorList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setHorrorList } = horrorReducer.actions;

export default horrorReducer;