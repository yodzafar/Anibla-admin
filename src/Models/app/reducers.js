import {APP_ACTION_TYPES} from "../../Constants/action-types/app";

const defaultState = {
  modal: {},
  snackbar: {}
}

const map = {
  [APP_ACTION_TYPES.HIDE_MODAL]: (state) => ({...state, modal: {}}),
  [APP_ACTION_TYPES.SHOW_MODAL]: (state, {payload}) => ({...state, modal: {...payload}}),
  [APP_ACTION_TYPES.SHOW_SNACKBAR]: (state, {payload}) => ({...state, snackbar: {...payload}}),
  [APP_ACTION_TYPES.HIDE_SNACKBAR]: (state) => ({...state, snackbar: {}})
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;