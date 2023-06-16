import {createSlice} from "@reduxjs/toolkit";

const lastYearReducer = createSlice({
    name : 'lastYearReducer',
    initialState : [],
    reducers : {
        setLastYearList(state, action) {
            let lastYearMovie = [...state];
            lastYearMovie = action.payload;
            return lastYearMovie;
        }
    }
});

export let { setLastYearList } = lastYearReducer.actions;

export default lastYearReducer;