import {SOLD_ACTION_TYPES} from "../../Constants/action-types/sold";

const defaultState = {
    loading: false,
    data: []
};

const map = {
    [SOLD_ACTION_TYPES.SOLD_LOADING]: (state, { pending }) => ({ ...state, loading: pending }),
    [SOLD_ACTION_TYPES.SOLD_LOADED]: (state, { data }) => ({ ...state, data })
};

export default (state = defaultState, action) => {
    return (map[action.type] && map[action.type](state, action)) || state
};

