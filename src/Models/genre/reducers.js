import {GENRE_ACTION_TYPES} from "../../Constants/action-types/genre";

const defaultState = {
  loading: false,
  data: []
};

const map = {
  [GENRE_ACTION_TYPES.GENRE_LOADING]: (state, {pending}) => ({...state, loading: pending}),
  [GENRE_ACTION_TYPES.GENRE_LOADED]: (state, {data}) => ({...state, data})
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;