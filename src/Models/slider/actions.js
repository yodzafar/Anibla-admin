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
                        nameuz: item.kino.name.uz,
                        nameru: item.kino.name.ru,
                        image: `${BASE_URL}/${item.kino.image}`
                    }))})
            }
        }).finally(() => dispatch({type: SLIDER_ACTION_TYPES.SLIDER_LOADING, pending: false}))
        .catch(e => {
            console.log(e);
        })
}