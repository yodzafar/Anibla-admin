import product from '../../Service/product'
import { PRODUCT_ACTION_TYPES } from '../../Constants/action-types/product'

export const getProductList = () => (dispatch) => {
  dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: true })
  product.getAllProduct()
    .then((res) => {
      if (res.success) {
        const data = res.data.map((item) => ({
          nameuz: item.name.uz,
          nameru: item.name.ru,
          category: item.category.nameuz,
          key: item._id
        }))

        dispatch(
          {
            type: PRODUCT_ACTION_TYPES.PRODUCT_LOADED,
            data
          }
        )
      }
    }).finally(() => dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_LOADING, pending: false }))
    .catch((e) => {
      console.log(e);
    })
}
