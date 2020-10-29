import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductList } from '../../Models/product'
import product from '../../Service/product'

export const useProductList = ({ type }) => {
  const dispatch = useDispatch()

  const getList = useCallback(() => {
    dispatch(getProductList({ type }))
  }, [dispatch, type])

  useEffect(() => {
    getList()
  }, [getList])

  const removeItem = useCallback((id) => {
    product.removeProduct(id)
      .then((res) => {
        if (res.success) {
          getList()
        }
      }).catch((e) => {
        console.log(e);
      })
  }, [getList])

  return { removeItem }
}
