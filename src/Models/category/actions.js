import category from '../../Service/category';
import { CATEGORY_ACTION_TYPES } from '../../Constants/action-types/category'

export const getCategoryList = () => (dispatch) => {
  dispatch({ type: CATEGORY_ACTION_TYPES.CATEGORY_LOADING, pending: true })
  category.getAllCategory()
    .then((res) => {
      if (res.success) {
        dispatch(
          {
            type: CATEGORY_ACTION_TYPES.CATEGORY_LOADED,
            data: res.data.map((item) => ({ ...item, key: item._id }))
          }
        )
      }
    }).finally(() => dispatch({ type: CATEGORY_ACTION_TYPES.CATEGORY_LOADING, pending: false }))
    .catch((e) => {
      console.log(e);
    })
}

