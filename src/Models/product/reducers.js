import {PRODUCT_ACTION_TYPES} from '../../Constants/action-types/product'

const defaultState = {
    loading: false,
    data: [],
    productInfo: {},
    season: [],
    seriya: [],
    seasonInfo: {},
};

const map = {
    [PRODUCT_ACTION_TYPES.PRODUCT_LOADING]: (state, {pending}) => ({...state, loading: pending}),
    [PRODUCT_ACTION_TYPES.PRODUCT_LOADED]: (state, {data}) => ({...state, data}),
    [PRODUCT_ACTION_TYPES.PRODUCT_INFO]: (state, {data}) => {
        const {filmData, seasonId} = data
        return {
            ...state,
            productInfo: filmData,
            seriya: seasonId && filmData.season.find((item) => item._id === seasonId).seriya.map((item) => ({
                key: item._id,
                _id: item._id,
                nameuz: item.name.uz,
                nameru: item.name.ru,
                length: item.length,
            })),
            seasonInfo: filmData.season.find((item) => item._id === seasonId),
            season: filmData.season.map((item) => ({
                key: item._id,
                _id: item._id,
                nameuz: item.name.uz,
                nameru: item.name.ru,
                image: item.image,
                num: item.num
            }))
        }
    },
    [PRODUCT_ACTION_TYPES.ADD_SEASON]: (state, {data}) => {
        const newData = {
            key: data._id,
            _id: data._id,
            nameuz: data.name.uz,
            nameru: data.name.ru,
            image: data.image,
            num: data.num
        }

        return {
            ...state,
            season: [...state.season, newData]
        }
    },
    [PRODUCT_ACTION_TYPES.UPDATE_SEASON]: (state, {payload}) => {
        const {id, data} = payload
        const season = []
        const currentSeason = state.season

        for (let i = 0; i < currentSeason.length; i++) {
            if (id === currentSeason[i]._id) {
                season.push({
                    key: data._id,
                    _id: data._id,
                    nameuz: data.name.uz,
                    nameru: data.name.ru,
                    image: data.image,
                    num: data.num
                })
            } else {
                season.push(currentSeason[i])
            }
        }

        return {
            ...state,
            season
        }
    },
    [PRODUCT_ACTION_TYPES.ADD_SERIYA]: (state, {data}) => {
        const newData = {
            key: data._id,
            _id: data._id,
            nameuz: data.name.uz,
            nameru: data.name.ru,
            length: data.length,
        }
        return {
            ...state,
            seriya: [...state.seriya, newData]
        }
    },
    [PRODUCT_ACTION_TYPES.UPDATE_SERIYA]: (state, {payload}) => {

        const {id, data} = payload
        const seriya = []
        const currentSeriya = state.seriya

        for (let i = 0; i < currentSeriya.length; i++) {
            if (id === currentSeriya[i]._id) {
                seriya.push({
                    key: data._id,
                    _id: data._id,
                    nameuz: data.name.uz,
                    nameru: data.name.ru,
                    length: data.length,
                })
            } else {
                seriya.push(currentSeriya[i])
            }
        }

        return {
            ...state,
            seriya
        }
    }
}

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;
