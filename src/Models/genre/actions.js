import {GENRE_ACTION_TYPES} from "../../Constants/action-types/genre";
import genre from "../../Service/genre";

export const getGenreList = () => dispatch => {
  dispatch({type: GENRE_ACTION_TYPES.GENRE_LOADING, pending: true})
  genre.getAllGenre()
    .then(res => {
      if(res.success) {
        dispatch({type: GENRE_ACTION_TYPES.GENRE_LOADED, data: res.data.map(item => ({...item, key: item._id}))})
      }
    }).finally(() => dispatch({type: GENRE_ACTION_TYPES.GENRE_LOADING, pending: false}))
    .catch(e => {
      console.log(e);
    })
}