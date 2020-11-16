import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getGenreList} from '../../Models/genre';
import {hideModal} from '../../Models/app';
import genre from '../../Service/genre';
import {showSnackbar} from "../../Models/app/actions";

export const useGenreList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getGenreList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        genre.removeGenre(id)
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
