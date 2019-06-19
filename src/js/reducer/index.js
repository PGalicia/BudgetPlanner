/*
    Imports
*/
import { ITEMS } from "./../constant/items.js"; // Constant
import { 
    TOGGLE_SETTINGS_MODAL, 
    UPDATE_MONEY_INFORMATION, 
    UPDATE_CURRENT_PRICE_FOR_ITEMS, 
    UPDATE_TARGETED_ITEM, 
    UPDATE_ITEM_INFORMATION,
    TOGGLE_DELETE_MODAL, 
    TOGGLE_FORM_MODAL,
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
    const items = state.items;
    let index = null;
    switch(action.type) {
        case TOGGLE_SETTINGS_MODAL:
            return { ...state, isSettingsModalOpen: action.payload }
        case UPDATE_MONEY_INFORMATION:
            return { ...state, totalMoney: action.payload.totalMoney, percentage: action.payload.percentage }
        case DELETE_ITEM:
            index = items.indexOf(action.payload); // Find item index
            items.splice(index, 1); // Remove item @ 'index'
            return { ...state, targetedItem: null, isDeleteConfirmationModalOpen: false, items: [ ...items ] };
        case UPDATE_CURRENT_PRICE_FOR_ITEMS:
            return { ...state, items: action.payload }
        case UPDATE_TARGETED_ITEM:
            return { ...state, targetedItem: action.payload }
        case UPDATE_ITEM_INFORMATION:
            const targetItem = items.find(i => i.id === action.payload.id); // Find the targetItem
            index = items.indexOf(targetItem); // Find item index
            items.splice(index, 1, action.payload); // Replace item with action.payload @ 'index'
            return { ...state, items: [ ...items ], isItemFormPopUpOpen: false, targetedItem: null }
        case TOGGLE_DELETE_MODAL:
            return { ...state, isDeleteConfirmationModalOpen: action.payload }
        case TOGGLE_FORM_MODAL:
            return { ...state, isItemFormPopUpOpen: action.payload }
        default:
            return state;
    }
}

export default rootReducer;