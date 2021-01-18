import {PRODUCT_ACTION_TYPES} from '../../Constants/action-types/product'

const defaultState = {
    loading: false,
    data: [],
    series: [],
    seasonInfo: {},
};

const map = {
    [PRODUCT_ACTION_TYPES.PRODUCT_LOADING]: (state, {pending}) => ({...state, loading: pending}),
    [PRODUCT_ACTION_TYPES.PRODUCT_LOADED]: (state, {data}) => {
        return {...state, data}
    },
    [PRODUCT_ACTION_TYPES.SEASON_LOADED]: (state, {data}) => ({...state, data}),
    [PRODUCT_ACTION_TYPES.SEASON_INFO]: (state, {data, seria}) => {
        const series = seria.map(item => ({
            key:item._id,
            nameuz: item.name.uz,
            nameru: item.name.ru,
            length: item.length,
            date: item.date,
            video: item.video,
            ...item
        })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        return {
            ...state,
            seasonInfo: data,
            series
        }
    }
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;
