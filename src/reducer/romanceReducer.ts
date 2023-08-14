import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const romanceReducer = createSlice({
    name : 'romanceReducer',
    initialState : [],
    reducers : {
        setRomanceList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setRomanceList } = romanceReducer.actions;

export default romanceReducer;