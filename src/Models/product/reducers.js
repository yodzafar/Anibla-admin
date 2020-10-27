import { PRODUCT_ACTION_TYPES } from '../../Constants/action-types/product'

const defaultState = {
  loading: false,
  data: []
};

const map = {
  [PRODUCT_ACTION_TYPES.PRODUCT_LOADING]: (state, { pending }) => ({ ...state, loading: pending }),
  [PRODUCT_ACTION_TYPES.PRODUCT_LOADED]: (state, { data }) => ({ ...state, data })
};

export default (state = defaultState, action) => {
  return (map[action.type] && map[action.type](state, action)) || state
};
