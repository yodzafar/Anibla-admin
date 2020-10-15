import {MEMBER_ACTION_TYPES} from "../../Constants/action-types/member";

const defaultState = {
  loading: false,
  data: []
};

const map = {
  [MEMBER_ACTION_TYPES.MEMBER_LOADING]: (state, {pending}) => ({...state, loading: pending}),
  [MEMBER_ACTION_TYPES.MEMBER_LOADED]: (state, {data}) => ({...state, data})
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;