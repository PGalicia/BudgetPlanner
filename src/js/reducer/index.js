/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant
import { 
    TOGGLE_SETTINGS_MODAL, 
    UPDATE_MONEY_INFORMATION, 
    UPDATE_CURRENT_PRICE_FOR_ITEMS, 
    UPDATE_TARGETED_ITEM, 
    TOGGLE_DELETE_MODAL, 
    DELETE_ITEM 
} from "./../constant/actionTypes.js"; // Constant

const initialState = {
    items: ITEMS,
    totalMoney: 1417.48,
    percentage: 25,
    targetedItem: null,
    isDeleteConfirmationModalOpen: false,
    isSettingsModalOpen: false,
    isItemFormPopUpOpen: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_SETTINGS_MODAL:
            return { ...state, isSettingsModalOpen: action.payload }
        case UPDATE_MONEY_INFORMATION:
            return { ...state, totalMoney: action.payload.totalMoney, percentage: action.payload.percentage }
        case DELETE_ITEM:
            const items = state.items;
            const index = items.indexOf(action.payload);
            items.splice(index, 1);
            return { ...state, targetedItem: null, isDeleteConfirmationModalOpen: false, items: [ ...items ] };
        case UPDATE_CURRENT_PRICE_FOR_ITEMS:
            return { ...state, items: action.payload }
        case UPDATE_TARGETED_ITEM:
            return { ...state, targetedItem: action.payload }
        case TOGGLE_DELETE_MODAL:
            return { ...state, isDeleteConfirmationModalOpen: action.payload }
        default:
            return state;
    }
}

export default rootReducer;