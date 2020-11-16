import {ANNOTATION_ACTION_TYPES} from "../../Constants/action-types/annotation";
import annotation from "../../Service/annotation";

export const getAnnotationList = () => dispatch => {
    dispatch({type: ANNOTATION_ACTION_TYPES.ANNOTATION_LOADING, loading: true})

    annotation.getAllAnnotation()
        .then((res) => {
            if(res.success) {
                dispatch({type: ANNOTATION_ACTION_TYPES.ANNOTATION_LOADED, list: res.data})
            }
        })
        .finally(() => dispatch({type: ANNOTATION_ACTION_TYPES.ANNOTATION_LOADING, loading: false}))
        .catch(() => {
            dispatch({type: ANNOTATION_ACTION_TYPES.ANNOTATION_LOADING, loading: false})
        })
}