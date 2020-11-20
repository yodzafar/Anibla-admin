import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getProductList} from '../../Models/product'
import {hideModal} from '../../Models/app'
import product from '../../Service/product'
import slider from "../../Service/slider";
import {showSnackbar} from "../../Models/app/actions";

export const useProductList = ({type}) => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getProductList({type}))
    }, [dispatch, type])

    useEffect(() => {
        getList()
    }, [getList])

    const removeItem = useCallback((id) => {
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
