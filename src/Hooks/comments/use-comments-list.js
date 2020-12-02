import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal} from '../../Models/app';
import {showSnackbar} from "../../Models/app/actions";
import {getCommentsList} from "../../Models/comments";
import comments from "../../Service/comments";

export const useCommentsList = () => {
    const dispatch = useDispatch()
    const {results} = useSelector(({comments}) => comments)

    const getList = useCallback(() => {
        dispatch(getCommentsList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        comments.removeComment(id)
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

    const activeStatus = useCallback((id) => {
        const comment = results.find(item => item.id === id)
        const status = true
        comments.updateComment({id, data: {...comment, status}})
            .then((res) => {
                if (res.success) {
                    getList()
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: `Muhokama muvvaffaqiyatli aktivlashirildi`
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
    }, [results, getList, dispatch])

    useEffect(() => {
        getList()
    }, [getList])

    return {removeItem, activeStatus}
}
