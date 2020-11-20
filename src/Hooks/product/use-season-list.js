import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getProductInfo} from '../../Models/product'
import {hideModal} from '../../Models/app'
import product from '../../Service/product'
import {showSnackbar} from "../../Models/app/actions";

export const useSeasonList = ({filmId}) => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        if (filmId) {
            dispatch(getProductInfo(filmId))
        }
    }, [dispatch, filmId])

    const removeItem = useCallback((id) => {
        product.removeSeason(id)
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
