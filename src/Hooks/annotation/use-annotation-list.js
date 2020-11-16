import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {getAnnotationList} from "../../Models/annotation";
import annotation from "../../Service/annotation";
import {hideModal, showSnackbar} from "../../Models/app/actions";

export const useAnnotationList = () => {
    const dispatch = useDispatch()
    const annotationList = useSelector(({annotation}) => annotation.list)

    const getList = useCallback(() => {
        dispatch(getAnnotationList())
    }, [dispatch])

    const removeItem = useCallback((id) => {
        annotation.removeAnnotation(id)
            .then((res) => {
                if (res.success) {
                    const payload = {
                        open: true,
                        variant: 'success',
                        message: 'Ma\'lumot muvvaffaqiyatli o\'chirildi'
                    }
                    dispatch(hideModal())
                    dispatch(showSnackbar(payload))
                    getList()
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }, [getList, dispatch])

    useEffect(() => {
        getList()
    }, [getList])

    const updateList = useCallback((params, activeOne, id) => {
        annotation.updateAnnotation(params)
            .then((res) => {
                if (res.success) {
                    if (id) {
                        const currentData = annotationList.find(item => item._id === id)
                        const params = {
                            id,
                            data: {
                                nameuz: currentData.name.uz,
                                nameru: currentData.name.ru,
                                descriptionuz: currentData.description.uz,
                                descriptionru: currentData.description.ru,
                                video: currentData.video,
                                status: true
                            }
                        }
                        updateList(params, true)
                    }
                    if (activeOne) {
                        const payload = {
                            open: true,
                            variant: 'success',
                            message: 'Ma\'lumot muvvaffaqiyatli tahrirlandi'
                        }
                        dispatch(showSnackbar(payload))
                        getList()
                    }
                }
            })
            .catch(() => {

            })
    }, [getList, annotationList, dispatch])

    const activeStatus = useCallback((id) => {
        if (annotationList.length === 1) {
            const currentData = annotationList.find(item => item._id === id)
            const params = {
                id,
                data: {
                    nameuz: currentData.name.uz,
                    nameru: currentData.name.ru,
                    descriptionuz: currentData.description.uz,
                    descriptionru: currentData.description.ru,
                    video: currentData.video,
                    status: true
                }
            }
            updateList(params, true)

        } else {
            for (let i = 0; i < annotationList.length; i++) {
                if (annotationList[i]._id !== id) {
                    const currentData = {
                        nameuz: annotationList[id].name.uz,
                        nameru: annotationList[id].name.ru,
                        descriptionuz: annotationList[id].description.uz,
                        descriptionru: annotationList[id].description.ru,
                        video: annotationList[id].video,
                        status: true
                    }
                    const params = {
                        id: annotationList[id]._id,
                        data: {
                            ...currentData,
                            ...annotationList[i],
                            status: false
                        }
                    }
                    updateList(params)
                }
            }
        }
    }, [annotationList, updateList])

    return {
        removeItem,
        activeStatus
    }
}