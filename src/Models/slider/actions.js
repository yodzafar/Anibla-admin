import slider from "../../Service/slider";
import {SLIDER_ACTION_TYPES} from "../../Constants/action-types/slider";
import {BASE_URL} from "../../Constants/url";

export const getSliderList = () => dispatch => {
    dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADING, pending: true})
    slider.getAllSlider()
        .then(res => {
            if (res.success) {
                dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADED, data: res.data.map(item => ({
                        key: item._id,
                        _id: item._id,
                        nameuz: item.kino ?  item.kino.name.uz : 'нет данных',
                        nameru: item.kino ? item.kino.name.ru : 'нет данных',
                        image: item.kino ? `${BASE_URL}/${item.kino.image}` : null
                    }))})
            }
        }).finally(() => dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADING, pending: false}))
        .catch(e => {
            console.log(e);
        })
}