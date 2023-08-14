import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const adventureReducer = createSlice({
    name : 'adventureReducer',
    initialState : [],
    reducers : {
        setAdventureList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setAdventureList } = adventureReducer.actions;

export default adventureReducer;