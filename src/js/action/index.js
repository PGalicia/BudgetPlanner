import { TOGGLE_SETTINGS_MODAL } from "./../constant/actionTypes.js"; // Action Types Constant

export const toggleSettingsModal = bool => ({
    type: TOGGLE_SETTINGS_MODAL,
    payload: bool
});