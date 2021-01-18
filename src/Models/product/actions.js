import product from '../../Service/product'
import {PRODUCT_ACTION_TYPES} from '../../Constants/action-types/product'

export const getProductList = () => dispatch => {
    dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: true})
    product.getAllProduct()
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
                dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADED, data}
                )
            }
        })
        .finally(() => dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false}))
        .catch((e) => {
            console.log(e);
        })
}

export const getSeasonList = () => dispatch => {
    dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: true})
    product.getAllSeason()
        .then(res => {
            if (res.success) {
                const data = res.data.map((item) => ({
                    nameuz: item.name.uz,
                    nameru: item.name.ru,
                    category: item.category.map(item => item.nameuz).join(', '),
                    image: item.image,
                    key: item._id,
                    _id: item._id
                }))
                dispatch({type: PRODUCT_ACTION_TYPES.SEASON_LOADED, data})
            }

        })
        .finally(() => dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false}))
        .catch(() => {
            dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false})
        })
}

export const getSeasonInfo = (id) => (dispatch) => {
    dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: true})
    product.getSeason(id)
        .then((res) => {
            if (res.success) {
                dispatch(
                    {
                        type: PRODUCT_ACTION_TYPES.SEASON_INFO,
                        data: res.data,
                        seria: res.seria
                    }
                )
            }
        }).finally(() => dispatch({type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false}))
        .catch((e) => {
            console.log(e);
        })
}

