import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {getSoldList} from "../../Models/sold";

export const useSoldList = () => {
    const dispatch = useDispatch()

    const getList = useCallback(() => {
        dispatch(getSoldList())
    }, [dispatch])

    useEffect(() => {
        getList()
    }, [getList])
}