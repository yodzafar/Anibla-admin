import {PAYMENT_ACTION_TYPES} from "../../Constants/action-types/payment";

const defaultState = {
    loading: false,
    data: []
};

const map = {
    [PAYMENT_ACTION_TYPES.PAYMENT_LOADING]: (state, { pending }) => ({ ...state, loading: pending }),
    [PAYMENT_ACTION_TYPES.PAYMENT_LOADED]: (state, { data }) => ({ ...state, data })
};

export default (state = defaultState, action) => {
    return (map[action.type] && map[action.type](state, action)) || state
};

