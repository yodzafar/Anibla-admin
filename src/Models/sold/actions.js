import {SOLD_ACTION_TYPES} from "../../Constants/action-types/sold";
import payment from "../../Service/payment";

export const getSoldList = () => (dispatch) => {
    dispatch({ type: SOLD_ACTION_TYPES.SOLD_LOADING, pending: true })
    payment.getAllSold()
        .then((res) => {
            if (res.success) {
                dispatch(
                    {
                        type: SOLD_ACTION_TYPES.SOLD_LOADED,
                        data: res.data.map((item) => ({ ...item, key: item._id }))
                    }
                )
            }
        }).finally(() => dispatch({ type: SOLD_ACTION_TYPES.SOLD_LOADING, pending: false }))
        .catch((e) => {
            console.log(e);
        })
}

