import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const specialReducer = createSlice({
    name : 'specialReducer',
    initialState : [],
    reducers : {
        setSpecialList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setSpecialList } = specialReducer.actions;

export default specialReducer;