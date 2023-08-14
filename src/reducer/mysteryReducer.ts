import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const mysteryReducer = createSlice({
    name : 'mysteryReducer',
    initialState : [],
    reducers : {
        setMysteryList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setMysteryList } = mysteryReducer.actions;

export default mysteryReducer;