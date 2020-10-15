import {SITE_ACTION_TYPES} from "../../Constants/action-types/site";

export const showModal = (payload) => ({type: SITE_ACTION_TYPES.SHOW_MODAL, payload})
export const hideModal = () => ({type: SITE_ACTION_TYPES.HIDE_MODAL})