import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const familyReducer = createSlice({
    name : 'familyReducer',
    initialState : [],
    reducers : {
        setFamilyList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setFamilyList } = familyReducer.actions;

export default familyReducer;