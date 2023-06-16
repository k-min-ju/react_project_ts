import {createSlice} from "@reduxjs/toolkit";

const animationReducer = createSlice({
    name : 'animationReducer',
    initialState : [],
    reducers : {
        setAnimationList(state, action) {
            let animationMovie = [...state];
            animationMovie = action.payload;
            return animationMovie;
        }
    }
});

export let { setAnimationList } = animationReducer.actions;

export default animationReducer;