import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const sfReducer = createSlice({
    name : 'sfReducer',
    initialState : [],
    reducers : {
        setSfList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setSfList } = sfReducer.actions;

export default sfReducer;