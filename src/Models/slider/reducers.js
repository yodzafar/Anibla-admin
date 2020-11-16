import {SLIDER_ACTION_TYPES} from "../../Constants/action-types/slider";

const defaultState = {
    loading: false,
    data: []
};

const map = {
    [SLIDER_ACTION_TYPES.SLIDER_LOADING]: (state, {pending}) => ({...state, loading: pending}),
    [SLIDER_ACTION_TYPES.SLIDER_LOADED]: (state, {data}) => ({...state, data})
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;