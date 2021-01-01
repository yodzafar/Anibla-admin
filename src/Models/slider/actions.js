import slider from "../../Service/slider";
import {SLIDER_ACTION_TYPES} from "../../Constants/action-types/slider";
import {BASE_URL} from "../../Constants/url";

export const getSliderList = () => dispatch => {
    dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADING, pending: true})
    slider.getAllSlider()
        .then(res => {
            if (res.success) {
                const getData = (data) => {
                    if(data.kino) {
                        return data.kino
                    }

                    if(data.serial) {
                        return data.serial
                    }

                    return false
                }

                dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADED, data: res.data.map(item => ({
                        key: item._id,
                        _id: item._id,
                        nameuz: getData(item) ?  getData(item).name.uz : 'нет данных',
                        nameru: getData(item) ? getData(item).name.ru : 'нет данных',
                        image: getData(item) ? `${BASE_URL}/${getData(item).image}` : null
                    }))})
            }
        }).finally(() => dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADING, pending: false}))
        .catch(e => {
            console.log(e);
        })
}