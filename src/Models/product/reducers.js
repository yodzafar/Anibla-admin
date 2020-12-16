import {PRODUCT_ACTION_TYPES} from '../../Constants/action-types/product'

const defaultState = {
    loading: false,
    data: [],
    series: [],
    seasonInfo: {},
};

const map = {
    [PRODUCT_ACTION_TYPES.PRODUCT_LOADING]: (state, {pending}) => ({...state, loading: pending}),
    [PRODUCT_ACTION_TYPES.PRODUCT_LOADED]: (state, {data}) => ({...state, data}),
    [PRODUCT_ACTION_TYPES.SEASON_LOADED]: (state, {season}) => ({...state, season}),
    [PRODUCT_ACTION_TYPES.SEASON_INFO]: (state, {data}) => {
        const series = data.seriya.map(item => ({
            _id: item._id,
            key:item._id,
            nameuz: item.name.uz,
            nameru: item.name.ru,
            length: item.length,
            date: item.date
        }))
        return {
            ...state,
            seasonInfo: data,
            series
        }
    }
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;
