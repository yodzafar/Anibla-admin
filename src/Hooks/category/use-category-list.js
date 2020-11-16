import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getCategoryList} from '../../Models/category';
import {hideModal} from '../../Models/app';
import category from '../../Service/category';
import {showSnackbar} from "../../Models/app/actions";

export const useCategoryList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getCategoryList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        category.removeCategory(id)
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
        })
    }, [getList, dispatch])

    useEffect(() => {
        getList()
    }, [getList])

    return {removeItem}
}
