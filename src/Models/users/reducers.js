import {USER_ACTION_TYPES} from "../../Constants/action-types/users";

const defaultState = {
    loading: false,
    data: []
};

const map = {
    [USER_ACTION_TYPES.USER_LOADING]: (state, {loading}) => ({...state, loading}),
    [USER_ACTION_TYPES.USER_LOADED]: (state, {data}) => ({...state, data})
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;