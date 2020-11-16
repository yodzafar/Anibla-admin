import {NEWS_ACTION_TYPES} from "../../Constants/action-types/news";

const defaultState = {
    loading: false,
    data: []
};

const map = {
    [NEWS_ACTION_TYPES.NEWS_LOADING]: (state, {pending}) => ({...state, loading: pending}),
    [NEWS_ACTION_TYPES.NEWS_LOADED]: (state, {data}) => ({...state, data})
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;