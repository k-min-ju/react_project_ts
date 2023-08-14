import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const dramaReducer = createSlice({
    name : 'dramaReducer',
    initialState : [],
    reducers : {
        setDramaList(state, action: PayloadAction<[]>) {
            let movieList = [...state];
            movieList = action.payload;
            return movieList;
        }
    }
});

export let { setDramaList } = dramaReducer.actions;

export default dramaReducer;