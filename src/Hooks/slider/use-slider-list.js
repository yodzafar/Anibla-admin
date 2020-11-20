import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getSliderList} from "../../Models/slider";
import slider from "../../Service/slider";
import {hideModal} from "../../Models/app";
import {showSnackbar} from "../../Models/app/actions";

export const useSliderList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getSliderList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        slider.removeSlider(id)
            .then((res) => {
                if(res.success) {
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

    return {
        removeItem
    }
}