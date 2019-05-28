/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant

const initialState = {
    items: ITEMS,
    totalMoney: 1417.48,
    percentage: 25,
    isDeleteConfirmationModalOpen: false,
    targetedItemId: -1
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default rootReducer;