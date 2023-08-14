import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const highteenReducer = createSlice({
    name : 'highteenReducer',
    initialState : [],
    reducers : {
        setHighteenList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setHighteenList } = highteenReducer.actions;

export default highteenReducer;