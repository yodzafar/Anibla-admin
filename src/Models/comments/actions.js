import comments from "../../Service/comments";
import {COMMENTS_ACTION_TYPES} from "../../Constants/action-types/comments";

export const getCommentsList = () => dispatch => {
    dispatch({type: COMMENTS_ACTION_TYPES.COMMENTS_LOADING, loading: true})
    comments.getAllComments()
        .then((res) => {
            dispatch({type: COMMENTS_ACTION_TYPES.COMMENTS_LOADED, data: res.data})
        })
        .finally(() => dispatch({type: COMMENTS_ACTION_TYPES.COMMENTS_LOADING, loading: false}))
        .catch(() => {
            dispatch({type: COMMENTS_ACTION_TYPES.COMMENTS_LOADING, loading: false})
        })
}