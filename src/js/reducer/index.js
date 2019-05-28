/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant
import { UPDATE_SPENDING_MONEY } from "./../constant/actionTypes.js"; // Constant

const initialState = {
    items: ITEMS,
    totalMoney: 1417.48,
    percentage: 25,
    spendingMoney: 0
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_SPENDING_MONEY:
            return { ...state, spendingMoney: action.payload };
        default:
            return state;
    }
}

export default rootReducer;