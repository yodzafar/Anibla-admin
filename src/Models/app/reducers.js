import {APP_ACTION_TYPES} from "../../Constants/action-types/app";

const defaultState = {
    modal: {},
    snackbar: {},
    miniSidebar: localStorage.getItem('miniSidebar') || false
}

const map = {
    [APP_ACTION_TYPES.HIDE_MODAL]: (state) => ({...state, modal: {}}),
    [APP_ACTION_TYPES.SHOW_MODAL]: (state, {payload}) => ({...state, modal: {...payload}}),
    [APP_ACTION_TYPES.SHOW_SNACKBAR]: (state, {payload}) => ({...state, snackbar: {...payload}}),
    [APP_ACTION_TYPES.HIDE_SNACKBAR]: (state) => ({...state, snackbar: {}}),
    [APP_ACTION_TYPES.CHANGE_SIDEBAR_MINI_STATUS]: (state, {status}) => {
        if (status) {
            localStorage.setItem('miniSidebar', '1')
        }else {
            localStorage.removeItem('miniSidebar')
        }
        return {...state, miniSidebar: status}
    }
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;