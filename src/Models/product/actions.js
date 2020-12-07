import product from '../../Service/product'
import { PRODUCT_ACTION_TYPES } from '../../Constants/action-types/product'

export const getProductList = (params) => (dispatch) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: true })
  product.getAllProduct(params)
    .then((res) => {
      if (res.success) {
        const data = res.data.map((item) => ({
          nameuz: item.name.uz,
          nameru: item.name.ru,
          category: item.category.map(item => item.nameuz).join(', '),
          image: item.image,
          key: item._id,
          _id: item._id
        }))

        dispatch(
          {
            type: PRODUCT_ACTION_TYPES.PRODUCT_LOADED,
            data
          }
        )
      }
    }).finally(() => dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false }))
    .catch((e) => {
      console.log(e);
    })
}

export const getProductInfo = (id, seasonId) => (dispatch) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: true })
  product.getProduct(id)
    .then((res) => {
      if (res.success) {
        dispatch(
          {
            type: PRODUCT_ACTION_TYPES.PRODUCT_INFO,
            data: { filmData: res.data, seasonId }
          }
        )
      }
    }).finally(() => dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false }))
    .catch((e) => {
      console.log(e);
    })
}

export const addSeason = (data) => ({
    type: PRODUCT_ACTION_TYPES.ADD_SEASON,
    data
})

export const updateSeason = (id, data) => ({
    type: PRODUCT_ACTION_TYPES.UPDATE_SEASON,
    payload: {
        id, data
    },
})

export const addSeriya = (data) => ({
    type: PRODUCT_ACTION_TYPES.ADD_SERIYA,
    data
})

export const updateSeriya = (id, data) => ({
    type: PRODUCT_ACTION_TYPES.UPDATE_SERIYA,
    payload: {
        id, data
    },
})
