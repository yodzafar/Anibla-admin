import {useDispatch} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {getMemberList} from '../../Models/member';
import member from '../../Service/member';
import {hideModal} from '../../Models/app';
import {showSnackbar} from "../../Models/app/actions";

export const useMemberList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getMemberList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        member.removeMember(id)
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

    return {removeItem, getList}
}
