import {NEWS_ACTION_TYPES} from "../../Constants/action-types/news";
import news from "../../Service/news";

export const getNewsList = () => dispatch => {
    dispatch({type: NEWS_ACTION_TYPES.NEWS_LOADING, pending: true})
    news.getAllNews()
        .then(res => {
            if (res.success) {
                dispatch({
                    type: NEWS_ACTION_TYPES.NEWS_LOADED, data: res.data.map(item => ({
                        _id: item._id,
                        key: item._id,
                        nameuz: item.name.uz,
                        nameru: item.name.ru,
                        date: item.date
                    }))
                })
            }
        }).finally(() => dispatch({type: NEWS_ACTION_TYPES.NEWS_LOADING, pending: false}))
        .catch(e => {
            console.log(e);
        })
}