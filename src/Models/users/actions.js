import {USER_ACTION_TYPES} from "../../Constants/action-types/users";
import users from "../../Service/users";

export const getAllUserList = () => dispatch => {
    dispatch({type: USER_ACTION_TYPES.USER_LOADING, loading: true})
    users.getUsersList()
        .then(res => {
            dispatch({type: USER_ACTION_TYPES.USER_LOADED, data: res.data.map(item => ({...item, key: item._id}))})
        })
        .finally(() => dispatch({type: USER_ACTION_TYPES.USER_LOADING, loading: false}))
        .catch(() => {
            dispatch({type: USER_ACTION_TYPES.USER_LOADING, loading: false})
        })
}