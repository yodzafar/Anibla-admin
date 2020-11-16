import {APP_ACTION_TYPES} from "../../Constants/action-types/app";

export const hideModal = () => ({type: APP_ACTION_TYPES.HIDE_MODAL})
export const hideSnackbar = () => ({type: APP_ACTION_TYPES.HIDE_SNACKBAR})
export const showModal = (payload) => ({type: APP_ACTION_TYPES.SHOW_MODAL, payload})
export const showSnackbar = (payload) => ({type: APP_ACTION_TYPES.SHOW_SNACKBAR, payload})
