import {COMMENTS_ACTION_TYPES} from "../../Constants/action-types/comments";


const defaultState = {
    loading: false,
    data: [],
    results: []
};

const map = {
    [COMMENTS_ACTION_TYPES.COMMENTS_LOADING]: (state, {loading}) => ({...state, loading}),
    [COMMENTS_ACTION_TYPES.COMMENTS_LOADED]: (state, {data}) => {
        const tableData = data.map(item => ({
            _id:item._id,
            key:item._id,
            username: item.user.name,
            role: item.user.role,
            message: item.message,
            date: item.date,
            status: item.status
        }))
        return {
            ...state,
            data: tableData,
            results: data
        }
    }
};

export default (state = defaultState, action) => {
    return (map[action.type] && map[action.type](state, action)) || state
};