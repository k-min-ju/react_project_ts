import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const lastYearReducer = createSlice({
    name : 'lastYearReducer',
    initialState : [],
    reducers : {
        setLastYearList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setLastYearList } = lastYearReducer.actions;

export default lastYearReducer;