import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {hideModal} from '../../Models/app'
import product from '../../Service/product'
import {showSnackbar} from "../../Models/app/actions";
import {getSeasonInfo} from "../../Models/product";

export const useSeriesList = ({filmId}) => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        if(filmId) {
            dispatch(getSeasonInfo(filmId))
        }
    }, [dispatch, filmId])

    const removeItem = useCallback((id) => {
        product.removeSeries(id)
            .then((res) => {
                if (res.success) {
                    dispatch(hideModal())
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: 'Ma\'lumot muvvaffaqiyatli o\'chirildi'
                    }
                    dispatch(showSnackbar(payload))
                    getList()
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
    }, [dispatch, getList])

    useEffect(() => {
        getList()
    }, [getList])

    return {removeItem}
}
