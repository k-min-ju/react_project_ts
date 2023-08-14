import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const meloReducer = createSlice({
    name : 'meloReducer',
    initialState : [],
    reducers : {
        setMeloList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setMeloList } = meloReducer.actions;

export default meloReducer;