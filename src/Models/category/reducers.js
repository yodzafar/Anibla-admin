import { CATEGORY_ACTION_TYPES } from '../../Constants/action-types/category';

const defaultState = {
  loading: false,
  data: []
};

const map = {
  [CATEGORY_ACTION_TYPES.CATEGORY_LOADING]: (state, { pending }) => ({ ...state, loading: pending }),
  [CATEGORY_ACTION_TYPES.CATEGORY_LOADED]: (state, { data }) => ({ ...state, data })
};

export default (state = defaultState, action) => {
  return (map[action.type] && map[action.type](state, action)) || state
};
