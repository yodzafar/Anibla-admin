import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPriceList} from "../../Models/price";
import {hideModal, showSnackbar} from "../../Models/app/actions";
import price from "../../Service/price";

export const usePriceList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getPriceList())
    }, [dispatch])

    useEffect(() => {
        getList()
    }, [getList])

    const removeItem = useCallback((id) => {
        price.removePrice(id)
            .then((res) => {
                if (res.success) {
                    getList()
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: 'Ma\'lumot muvvaffaqiyatli o\'chirildi'
                    }
                    dispatch(showSnackbar(payload))
                    dispatch(hideModal())
                }
            }).catch(() => {
            const payload = {
                open: true,
                variant: 'error',
                message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
            }
            dispatch(showSnackbar(payload))
            dispatch(hideModal())
        })
    }, [getList, dispatch])

    return {
        removeItem
    }
}