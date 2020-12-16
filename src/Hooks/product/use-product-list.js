import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getProductList, getSeasonList} from '../../Models/product'
import {hideModal} from '../../Models/app'
import product from '../../Service/product'
import slider from "../../Service/slider";
import {showSnackbar} from "../../Models/app/actions";

export const useProductList = ({type}) => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        if (type === 'film') {
            dispatch(getProductList())
        }

        if (type === 'serial') {
            dispatch(getSeasonList())
        }

    }, [dispatch, type])

    useEffect(() => {
        getList()
    }, [getList])

    const removeFilm = useCallback((id) => {
        product.removeProduct(id)
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
            })
            .catch(() => {
                const payload = {
                    open: true,
                    variant: 'error',
                    message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                }
                dispatch(showSnackbar(payload))
                dispatch(hideModal())
            })
    }, [dispatch, getList])

    const removeSerial = useCallback((id) => {
        product.removeSeason(id)
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
            })
            .catch(() => {
                const payload = {
                    open: true,
                    variant: 'error',
                    message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                }
                dispatch(showSnackbar(payload))
                dispatch(hideModal())
            })
    }, [dispatch, getList])

    const removeItem = useCallback((id) => {
        if (type === 'serial') {
            removeSerial(id)
        } else {
            removeFilm(id)
        }
    }, [removeSerial, removeFilm, type])

    const addToSlider = useCallback((id) => {
        slider.createSlider({kino: id})
            .then((res) => {
                if (res.success) {
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: 'Film sliderga muvaffaqiyatli biriktirildi'
                    }
                    dispatch(showSnackbar(payload))
                }
            })
            .catch(() => {
                const payload = {
                    open: true,
                    variant: 'error',
                    message: 'Amaliyot vaqtida xatolik, iltimos qayta urunib ko\'ring!'
                }
                dispatch(showSnackbar(payload))
            })
    }, [dispatch])

    return {removeItem, addToSlider}
}
