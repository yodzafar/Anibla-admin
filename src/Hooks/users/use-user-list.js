import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAllUserList} from "../../Models/users";
import users from "../../Service/users";
import {hideModal, showSnackbar} from "../../Models/app/actions";

export const useUserList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getAllUserList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        users.removeUser(id)
            .then(res => {
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
    }, [getList, dispatch])

    useEffect(() => {
        getList()
    }, [getList])

    return {removeItem}
}
