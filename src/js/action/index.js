import { 
    TOGGLE_SETTINGS_MODAL, 
    UPDATE_MONEY_INFORMATION, 
    UPDATE_CURRENT_PRICE_FOR_ITEMS, 
    UPDATE_TARGETED_ITEM,
    UPDATE_ITEM_INFORMATION,
    TOGGLE_DELETE_MODAL,
    TOGGLE_FORM_MODAL,
    DELETE_ITEM
} from "./../constant/actionTypes.js"; // Action Types Constant

export const toggleSettingsModal = bool => ({
    type: TOGGLE_SETTINGS_MODAL,
    payload: bool
});

export const updateMoneyInformation = money => ({
    type: UPDATE_MONEY_INFORMATION,
    payload: money
});

export const updateCurrentPricesForItems = items => ({
    type: UPDATE_CURRENT_PRICE_FOR_ITEMS,
    payload: items
});

export const updateTargetItem = target => ({
    type: UPDATE_TARGETED_ITEM,
    payload: target
});

export const updateItemInformation = item => ({
    type: UPDATE_ITEM_INFORMATION,
    payload: item
});

export const toggleDeleteModal = bool => ({
    type: TOGGLE_DELETE_MODAL,
    payload: bool
});

export const toggleItemFormModal = bool => ({
    type: TOGGLE_FORM_MODAL,
    payload: bool
});

export const deleteItem = bool => ({
    type: DELETE_ITEM,
    payload: bool
});