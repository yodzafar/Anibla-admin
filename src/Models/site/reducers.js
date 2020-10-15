import {SITE_ACTION_TYPES} from "../../Constants/action-types/site";

const defaultState = {
  modal: {}
}

const map = {
  [SITE_ACTION_TYPES.HIDE_MODAL]: (state) => ({...state, modal: {}}),
  [SITE_ACTION_TYPES.SHOW_MODAL]: (state, {payload}) => {
    const {open, component, props} = payload
    return {
      ...state,
      modal: {
        open,
        component,
        props
      }
    }
  }
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;