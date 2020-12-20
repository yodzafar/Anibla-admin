import {PRICE_ACTION_TYPES} from "../../Constants/action-types/price";
import price from "../../Service/price";

export const getPriceList = () => dispatch => {
    dispatch({type: PRICE_ACTION_TYPES.PRICE_LOADING, loading: true})
    price.getAllPriceList()
        .then((res) => {
            const data = res.data.map(item => ({
                ...item,
                key: item._id
            }))
            dispatch({type: PRICE_ACTION_TYPES.PRICE_LOADED, data})
        })
        .finally(() => dispatch({type: PRICE_ACTION_TYPES.PRICE_LOADING, loading: false}))
        .catch(() => {
            dispatch({type: PRICE_ACTION_TYPES.PRICE_LOADING, loading: false})
        })
}