import {ANNOTATION_ACTION_TYPES} from "../../Constants/action-types/annotation";

const defaultState = {
    data: [],
    list: [],
    loading: false
}

const map = {
    [ANNOTATION_ACTION_TYPES.ANNOTATION_LOADING]: (state, {loading}) => ({...state, loading}),
    [ANNOTATION_ACTION_TYPES.ANNOTATION_LOADED]: (state, {list}) => {
        const data = list.map(item => ({
            _id: item._id,
            key: item._id,
            nameuz: item.name.uz,
            nameru: item.name.ru,
            date: item.date,
            status: item.status
        }))

        return {...state, data, list}
    }

}

export default (state = defaultState, action) => {
    return (map[action.type] && map[action.type](state, action)) || state
};