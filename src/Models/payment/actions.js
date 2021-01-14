import {PAYMENT_ACTION_TYPES} from "../../Constants/action-types/payment";
import payment from "../../Service/payment";

export const getPaymentList = () => (dispatch) => {
    dispatch({ type: PAYMENT_ACTION_TYPES.PAYMENT_LOADING, pending: true })
    payment.getAllPayment()
        .then((res) => {
            if (res.success) {
                dispatch(
                    {
                        type: PAYMENT_ACTION_TYPES.PAYMENT_LOADED,
                        data: res.data.map((item) => ({ ...item, key: item._id }))
                    }
                )
            }
        }).finally(() => dispatch({ type: PAYMENT_ACTION_TYPES.PAYMENT_LOADING, pending: false }))
        .catch((e) => {
            console.log(e);
        })
}

