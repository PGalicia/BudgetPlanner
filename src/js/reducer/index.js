/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant

const initialState = {
    items: ITEMS
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default rootReducer;