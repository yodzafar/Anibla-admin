import {PRICE_ACTION_TYPES} from "../../Constants/action-types/price";


const defaultState = {
    loading: false,
    data: [],
};

const map = {
    [PRICE_ACTION_TYPES.PRICE_LOADING]: (state, {loading}) => ({...state, loading}),
    [PRICE_ACTION_TYPES.PRICE_LOADED]: (state, {data}) => ({...state, data})
};

export default (state = defaultState, action) => {
    return (map[action.type] && map[action.type](state, action)) || state
};