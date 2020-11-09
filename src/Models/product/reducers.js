/* eslint-disable max-len */
import { PRODUCT_ACTION_TYPES } from '../../Constants/action-types/product'

const defaultState = {
  loading: false,
  data: [],
  productInfo: {},
  season: [],
  seriya: [],
  seasonInfo: {}
};

const map = {
  [PRODUCT_ACTION_TYPES.PRODUCT_LOADING]: (state, { pending }) => ({ ...state, loading: pending }),
  [PRODUCT_ACTION_TYPES.PRODUCT_LOADED]: (state, { data }) => ({ ...state, data }),
  [PRODUCT_ACTION_TYPES.PRODUCT_INFO]: (state, { data }) => {
    const { filmData, seasonId } = data
    return {
      ...state,
      productInfo: filmData,
      seriya: seasonId && filmData.season.find((item) => item._id === seasonId).seriya.map((item) => ({
        key: item._id,
        _id: item._id,
        nameuz: item.name.uz,
        nameru: item.name.ru,
        length: item.length,
        image: item.screens[0]
      })),
      seasonInfo: filmData.season.find((item) => item._id === seasonId),
      season: filmData.season.map((item) => ({
        key: item._id,
        _id: item._id,
        nameuz: item.name.uz,
        nameru: item.name.ru,
        image: item.image,
        num: item.num
      }))
    }
  }
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;
