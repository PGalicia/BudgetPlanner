/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant
import { TOGGLE_SETTINGS_MODAL, UPDATE_MONEY_INFORMATION, UPDATE_CURRENT_PRICE_FOR_ITEMS } from "./../constant/actionTypes.js"; // Constant

const initialState = {
    items: ITEMS,
    totalMoney: 1417.48,
    percentage: 25,
    // targetedItem: ITEMS[0],
    isDeleteConfirmationModalOpen: false,
    isSettingsModalOpen: false,
    isItemFormPopUpOpen: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_SETTINGS_MODAL:
            return { ...state, isSettingsModalOpen: action.payload }
        case UPDATE_MONEY_INFORMATION:
            console.log("totalMoney", typeof action.payload.totalMoney)
            return { ...state, totalMoney: action.payload.totalMoney, percentage: action.payload.percentage }
        case UPDATE_CURRENT_PRICE_FOR_ITEMS:
            return { ...state, items: action.payload }
        default:
            return state;
    }
}

export default rootReducer;