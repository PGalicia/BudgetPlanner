import { TOGGLE_SETTINGS_MODAL, UPDATE_MONEY_INFORMATION, UPDATE_CURRENT_PRICE_FOR_ITEMS } from "./../constant/actionTypes.js"; // Action Types Constant

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