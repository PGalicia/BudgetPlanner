/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant
import { TOGGLE_SETTINGS_MODAL } from "./../constant/actionTypes.js"; // Constant

const initialState = {
    items: ITEMS,
    totalMoney: 1417.48,
    percentage: 25,
    targetedItem: ITEMS[0],
    isDeleteConfirmationModalOpen: false,
    isSettingsModalOpen: true,
    isItemFormPopUpOpen: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_SETTINGS_MODAL:
            return { ...state, isSettingsModalOpen: action.payload }
        default:
            return state;
    }
}

export default rootReducer;