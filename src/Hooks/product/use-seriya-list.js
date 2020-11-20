import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getProductInfo} from '../../Models/product'
import {hideModal} from '../../Models/app'
import product from '../../Service/product'
import {showSnackbar} from "../../Models/app/actions";

export const useSeriyaList = ({filmId, seasonId}) => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        if (filmId) {
            dispatch(getProductInfo(filmId, seasonId))
        }
    }, [dispatch, filmId, seasonId])

    const removeItem = useCallback((id) => {
        product.removeSeriya(id)
            .then((res) => {
                if (res.success) {
                    getList()
                    dispatch(hideModal())
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: 'Ma\'lumot muvvaffaqiyatli o\'chirildi'
                    }
                    dispatch(showSnackbar(payload))
                }
            }).catch(() => {
            const payload = {
                open: true,
                variant: 'error',
                message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
            }
            dispatch(hideModal())
            dispatch(showSnackbar(payload))
        })
    }, [getList, dispatch])

    useEffect(() => {
        getList()
    }, [getList])

    return {removeItem}
}
