import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPaymentList} from "../../Models/payment";

export const usePaymentList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getPaymentList())
    }, [dispatch])

    useEffect(() => {
        getList()
    }, [getList])
}