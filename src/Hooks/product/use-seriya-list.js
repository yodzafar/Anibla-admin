import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProductInfo } from '../../Models/product'
import { hideModal } from '../../Models/site'
import product from '../../Service/product'

export const useSeriyaList = ({ filmId, seasonId }) => {
    const dispatch = useDispatch()

  const getList = useCallback(() => {
    if (filmId) {
      dispatch(getProductInfo(filmId, seasonId))
    }
  }, [dispatch, filmId, seasonId])

  const removeItem = useCallback((id) => {
    product.removeSeriya(id)
      .then((res) => {
        if (res.success) {
          getList()
          dispatch(hideModal())
        }
      }).catch((e) => {
        console.log(e);
      })
  }, [getList, dispatch])

  useEffect(() => {
    getList()
  }, [getList])

  return { removeItem }
}
